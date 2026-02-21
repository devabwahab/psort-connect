
-- =====================================================
-- PSORT Full Database Schema
-- =====================================================

-- 1. ROLE SYSTEM
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_mod(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin', 'moderator')
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 2. PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  phone TEXT,
  bio TEXT,
  avatar_url TEXT,
  membership_status TEXT DEFAULT 'none',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins delete profiles" ON public.profiles FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. MEMBERSHIP TIERS
CREATE TABLE public.membership_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  benefits TEXT[],
  fee NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.membership_tiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tiers readable by all" ON public.membership_tiers FOR SELECT USING (true);
CREATE POLICY "Admins manage tiers" ON public.membership_tiers FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Seed default tiers
INSERT INTO public.membership_tiers (name, description, benefits, fee) VALUES
  ('Student', 'For students enrolled in radiation therapy programs', ARRAY['Access to educational resources', 'Discounted event rates', 'Student mentorship program'], 500),
  ('Associate', 'For early-career radiation therapists', ARRAY['Full resource access', 'Voting rights', 'CPD tracking', 'Networking events'], 2000),
  ('Full', 'For experienced radiation therapists with 3+ years', ARRAY['All Associate benefits', 'Leadership opportunities', 'Conference speaker slots', 'Journal access'], 5000);

-- 4. MEMBERSHIPS
CREATE TABLE public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_id UUID NOT NULL REFERENCES public.membership_tiers(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'cancelled')),
  membership_number TEXT UNIQUE,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own membership" ON public.memberships FOR SELECT USING (auth.uid() = user_id OR public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Users apply for membership" ON public.memberships FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins manage memberships" ON public.memberships FOR UPDATE USING (public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins delete memberships" ON public.memberships FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_memberships_updated_at BEFORE UPDATE ON public.memberships FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. EVENTS
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT DEFAULT 'general',
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  image_url TEXT,
  max_attendees INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published events public" ON public.events FOR SELECT USING (is_published = true OR public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins manage events" ON public.events FOR INSERT WITH CHECK (public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins update events" ON public.events FOR UPDATE USING (public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins delete events" ON public.events FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. EVENT REGISTRATIONS
CREATE TABLE public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'cancelled', 'attended')),
  registered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (event_id, user_id)
);
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own registrations" ON public.event_registrations FOR SELECT USING (auth.uid() = user_id OR public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Users register for events" ON public.event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users cancel own registration" ON public.event_registrations FOR UPDATE USING (auth.uid() = user_id OR public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins delete registrations" ON public.event_registrations FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 7. NEWS ARTICLES
CREATE TABLE public.news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  content TEXT,
  excerpt TEXT,
  category TEXT DEFAULT 'general',
  image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published news public" ON public.news_articles FOR SELECT USING (is_published = true OR public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins create news" ON public.news_articles FOR INSERT WITH CHECK (public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins update news" ON public.news_articles FOR UPDATE USING (public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins delete news" ON public.news_articles FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news_articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. ELECTIONS
CREATE TABLE public.elections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'nominations_open', 'voting_open', 'completed', 'cancelled')),
  nominations_start TIMESTAMPTZ,
  nominations_end TIMESTAMPTZ,
  voting_start TIMESTAMPTZ,
  voting_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.elections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Elections public read" ON public.elections FOR SELECT USING (true);
CREATE POLICY "Admins manage elections" ON public.elections FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 9. NOMINATIONS
CREATE TABLE public.nominations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  nominee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nominator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  position TEXT NOT NULL,
  statement TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (election_id, nominee_id, position)
);
ALTER TABLE public.nominations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View approved nominations" ON public.nominations FOR SELECT USING (status = 'approved' OR auth.uid() = nominator_id OR auth.uid() = nominee_id OR public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Authenticated users nominate" ON public.nominations FOR INSERT WITH CHECK (auth.uid() = nominator_id);
CREATE POLICY "Admins manage nominations" ON public.nominations FOR UPDATE USING (public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins delete nominations" ON public.nominations FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 10. VOTES
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  nomination_id UUID NOT NULL REFERENCES public.nominations(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  voted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (election_id, voter_id)
);
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own votes" ON public.votes FOR SELECT USING (auth.uid() = voter_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users vote" ON public.votes FOR INSERT WITH CHECK (auth.uid() = voter_id);
CREATE POLICY "No vote updates" ON public.votes FOR UPDATE USING (false);
CREATE POLICY "Admins delete votes" ON public.votes FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 11. CONTACT SUBMISSIONS
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_resolved BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view submissions" ON public.contact_submissions FOR SELECT USING (public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins manage submissions" ON public.contact_submissions FOR UPDATE USING (public.is_admin_or_mod(auth.uid()));
CREATE POLICY "Admins delete submissions" ON public.contact_submissions FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 12. GALLERY
CREATE TABLE public.gallery_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories public read" ON public.gallery_categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.gallery_categories FOR ALL USING (public.is_admin_or_mod(auth.uid()));

CREATE TABLE public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.gallery_categories(id) ON DELETE SET NULL,
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gallery public read" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Admins manage gallery" ON public.gallery_items FOR ALL USING (public.is_admin_or_mod(auth.uid()));

-- Seed gallery categories
INSERT INTO public.gallery_categories (name) VALUES ('RTCON'), ('Workshops'), ('Community'), ('Awards');

-- 13. STORAGE BUCKET for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);
CREATE POLICY "Users upload own docs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users view own docs" ON storage.objects FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Admins view all docs" ON storage.objects FOR SELECT USING (bucket_id = 'documents' AND public.is_admin_or_mod(auth.uid()));
