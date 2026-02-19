/*
  # PSORT Events & Registration System

  ## Overview
  Complete event management system with multi-tier registration, payment tracking,
  abstract submissions, and certificate generation.

  ## New Tables
  
  ### `events`
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique)
  - `description` (text)
  - `event_type` (text) - conference | workshop | webinar | cpd
  - `start_date` (timestamptz)
  - `end_date` (timestamptz)
  - `location` (text)
  - `venue` (text)
  - `capacity` (integer)
  - `registered_count` (integer, default 0)
  - `abstract_submission_open` (boolean, default false)
  - `abstract_deadline` (timestamptz)
  - `registration_open` (boolean, default true)
  - `registration_deadline` (timestamptz)
  - `banner_image_url` (text)
  - `status` (text) - draft | published | cancelled | completed
  - `created_by` (uuid, references profiles)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `event_pricing`
  - `id` (uuid, primary key)
  - `event_id` (uuid, references events)
  - `tier_name` (text) - early_bird | standard | student | international
  - `price` (numeric)
  - `currency` (text, default PKR)
  - `valid_from` (timestamptz)
  - `valid_until` (timestamptz)
  - `description` (text)

  ### `event_registrations`
  - `id` (uuid, primary key)
  - `event_id` (uuid, references events)
  - `user_id` (uuid, references profiles)
  - `pricing_tier` (text)
  - `amount_paid` (numeric)
  - `payment_status` (text) - pending | completed | failed | refunded
  - `payment_method` (text) - jazzcash | easypaisa | bank_transfer | credit_card
  - `transaction_id` (text)
  - `qr_code` (text)
  - `check_in_status` (boolean, default false)
  - `check_in_time` (timestamptz)
  - `certificate_generated` (boolean, default false)
  - `certificate_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `event_abstracts`
  - `id` (uuid, primary key)
  - `event_id` (uuid, references events)
  - `user_id` (uuid, references profiles)
  - `title` (text, not null)
  - `category` (text) - oral | poster
  - `content` (text, not null)
  - `word_count` (integer)
  - `file_url` (text)
  - `status` (text) - submitted | under_review | accepted | rejected
  - `review_score` (numeric)
  - `reviewer_comments` (text)
  - `assigned_reviewer_id` (uuid, references profiles)
  - `submitted_at` (timestamptz)
  - `reviewed_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public can view published events
  - Authenticated users can register for events
  - Users can view their own registrations
  - Admins can manage all events and registrations
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE,
  description text,
  event_type text CHECK (event_type IN ('conference', 'workshop', 'webinar', 'cpd')),
  start_date timestamptz,
  end_date timestamptz,
  location text,
  venue text,
  capacity integer,
  registered_count integer DEFAULT 0,
  abstract_submission_open boolean DEFAULT false,
  abstract_deadline timestamptz,
  registration_open boolean DEFAULT true,
  registration_deadline timestamptz,
  banner_image_url text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create event_pricing table
CREATE TABLE IF NOT EXISTS event_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  tier_name text NOT NULL CHECK (tier_name IN ('early_bird', 'standard', 'student', 'international')),
  price numeric NOT NULL,
  currency text DEFAULT 'PKR',
  valid_from timestamptz,
  valid_until timestamptz,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_pricing ENABLE ROW LEVEL SECURITY;

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  pricing_tier text,
  amount_paid numeric,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text CHECK (payment_method IN ('jazzcash', 'easypaisa', 'bank_transfer', 'credit_card')),
  transaction_id text,
  qr_code text,
  check_in_status boolean DEFAULT false,
  check_in_time timestamptz,
  certificate_generated boolean DEFAULT false,
  certificate_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Create event_abstracts table
CREATE TABLE IF NOT EXISTS event_abstracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text CHECK (category IN ('oral', 'poster')),
  content text NOT NULL,
  word_count integer,
  file_url text,
  status text DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'accepted', 'rejected')),
  review_score numeric,
  reviewer_comments text,
  assigned_reviewer_id uuid REFERENCES profiles(id),
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz
);

ALTER TABLE event_abstracts ENABLE ROW LEVEL SECURITY;

-- Triggers for updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_registrations_updated_at
  BEFORE UPDATE ON event_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update registered count
CREATE OR REPLACE FUNCTION update_event_registered_count()
RETURNS trigger AS $$
BEGIN
  UPDATE events
  SET registered_count = (
    SELECT COUNT(*)
    FROM event_registrations
    WHERE event_id = NEW.event_id
    AND payment_status = 'completed'
  )
  WHERE id = NEW.event_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_event_registered_count
  AFTER INSERT OR UPDATE ON event_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_event_registered_count();

-- RLS Policies for events
CREATE POLICY "Public can view published events"
  ON events FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can view all events"
  ON events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for event_pricing
CREATE POLICY "Public can view event pricing"
  ON event_pricing FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_pricing.event_id
      AND events.status = 'published'
    )
  );

CREATE POLICY "Admins can manage event pricing"
  ON event_pricing FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for event_registrations
CREATE POLICY "Users can view own registrations"
  ON event_registrations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own registrations"
  ON event_registrations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own registrations"
  ON event_registrations FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all registrations"
  ON event_registrations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can update all registrations"
  ON event_registrations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for event_abstracts
CREATE POLICY "Users can view own abstracts"
  ON event_abstracts FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own abstracts"
  ON event_abstracts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own abstracts"
  ON event_abstracts FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() AND status = 'submitted')
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Reviewers can view assigned abstracts"
  ON event_abstracts FOR SELECT
  TO authenticated
  USING (assigned_reviewer_id = auth.uid());

CREATE POLICY "Reviewers can update assigned abstracts"
  ON event_abstracts FOR UPDATE
  TO authenticated
  USING (assigned_reviewer_id = auth.uid())
  WITH CHECK (assigned_reviewer_id = auth.uid());

CREATE POLICY "Admins can manage all abstracts"
  ON event_abstracts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );
