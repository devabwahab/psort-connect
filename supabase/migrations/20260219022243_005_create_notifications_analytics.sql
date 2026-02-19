/*
  # PSORT Notifications, Search & Analytics

  ## Overview
  Email notifications, search functionality, analytics tracking, and system logs.

  ## New Tables
  
  ### `email_notifications`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `type` (text) - welcome | event_confirmation | renewal_reminder | newsletter | election_announcement
  - `subject` (text)
  - `content` (text)
  - `status` (text) - pending | sent | failed
  - `sent_at` (timestamptz)
  - `error_message` (text)
  - `metadata` (jsonb)
  - `created_at` (timestamptz)

  ### `search_queries`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `query` (text, not null)
  - `results_count` (integer)
  - `clicked_result_id` (uuid)
  - `created_at` (timestamptz)

  ### `page_views`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `page_path` (text)
  - `referrer` (text)
  - `user_agent` (text)
  - `ip_address` (text)
  - `created_at` (timestamptz)

  ### `analytics_summary`
  - `id` (uuid, primary key)
  - `date` (date, unique)
  - `total_page_views` (integer, default 0)
  - `unique_visitors` (integer, default 0)
  - `new_members` (integer, default 0)
  - `event_registrations` (integer, default 0)
  - `created_at` (timestamptz)

  ### `system_settings`
  - `key` (text, primary key)
  - `value` (jsonb)
  - `description` (text)
  - `updated_at` (timestamptz)
  - `updated_by` (uuid, references profiles)

  ## Security
  - Enable RLS on all tables
  - Users can view their own notifications and activity
  - Admins can view all analytics and system settings
*/

-- Create email_notifications table
CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text CHECK (type IN ('welcome', 'event_confirmation', 'renewal_reminder', 'newsletter', 'election_announcement', 'password_reset')),
  subject text,
  content text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at timestamptz,
  error_message text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

-- Create search_queries table
CREATE TABLE IF NOT EXISTS search_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  query text NOT NULL,
  results_count integer DEFAULT 0,
  clicked_result_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  page_path text,
  referrer text,
  user_agent text,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create analytics_summary table
CREATE TABLE IF NOT EXISTS analytics_summary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  total_page_views integer DEFAULT 0,
  unique_visitors integer DEFAULT 0,
  new_members integer DEFAULT 0,
  event_registrations integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_summary ENABLE ROW LEVEL SECURITY;

-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
  key text PRIMARY KEY,
  value jsonb DEFAULT '{}'::jsonb,
  description text,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES profiles(id)
);

ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Function to aggregate daily analytics
CREATE OR REPLACE FUNCTION aggregate_daily_analytics(target_date date)
RETURNS void AS $$
BEGIN
  INSERT INTO analytics_summary (date, total_page_views, unique_visitors, new_members, event_registrations)
  SELECT 
    target_date,
    (SELECT COUNT(*) FROM page_views WHERE DATE(created_at) = target_date),
    (SELECT COUNT(DISTINCT user_id) FROM page_views WHERE DATE(created_at) = target_date),
    (SELECT COUNT(*) FROM memberships WHERE DATE(created_at) = target_date),
    (SELECT COUNT(*) FROM event_registrations WHERE DATE(created_at) = target_date)
  ON CONFLICT (date) 
  DO UPDATE SET
    total_page_views = EXCLUDED.total_page_views,
    unique_visitors = EXCLUDED.unique_visitors,
    new_members = EXCLUDED.new_members,
    event_registrations = EXCLUDED.event_registrations;
END;
$$ LANGUAGE plpgsql;

-- Function to track page view
CREATE OR REPLACE FUNCTION track_page_view(
  p_user_id uuid,
  p_page_path text,
  p_referrer text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  view_id uuid;
BEGIN
  INSERT INTO page_views (user_id, page_path, referrer, user_agent)
  VALUES (p_user_id, p_page_path, p_referrer, p_user_agent)
  RETURNING id INTO view_id;
  
  RETURN view_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to send email notification
CREATE OR REPLACE FUNCTION queue_email_notification(
  p_user_id uuid,
  p_type text,
  p_subject text,
  p_content text,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO email_notifications (user_id, type, subject, content, metadata)
  VALUES (p_user_id, p_type, p_subject, p_content, p_metadata)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for email_notifications
CREATE POLICY "Users can view own notifications"
  ON email_notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all notifications"
  ON email_notifications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can manage notifications"
  ON email_notifications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for search_queries
CREATE POLICY "Users can view own search history"
  ON search_queries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert search queries"
  ON search_queries FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all searches"
  ON search_queries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for page_views
CREATE POLICY "Admins can view all page views"
  ON page_views FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "System can insert page views"
  ON page_views FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for analytics_summary
CREATE POLICY "Admins can view analytics"
  ON analytics_summary FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can manage analytics"
  ON analytics_summary FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for system_settings
CREATE POLICY "Admins can view settings"
  ON system_settings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Super admins can manage settings"
  ON system_settings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'super_admin'
    )
  );

-- Insert default system settings
INSERT INTO system_settings (key, value, description) VALUES
  ('site_name', '"PSORT"'::jsonb, 'Website name'),
  ('site_description', '"Pakistan Society of Radiation Therapists"'::jsonb, 'Website description'),
  ('contact_email', '"info@psort.com.pk"'::jsonb, 'Primary contact email'),
  ('enable_registrations', 'true'::jsonb, 'Enable new member registrations'),
  ('enable_elections', 'false'::jsonb, 'Enable election system'),
  ('membership_renewal_days', '30'::jsonb, 'Days before expiry to send renewal reminders')
ON CONFLICT (key) DO NOTHING;
