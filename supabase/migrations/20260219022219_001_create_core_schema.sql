/*
  # PSORT Core Database Schema - Part 1: Authentication & Members

  ## Overview
  This migration creates the foundational schema for the PSORT website including:
  - User profiles with role-based access control
  - Membership management with tiers and renewal tracking
  - Authentication and session management

  ## New Tables
  
  ### `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, unique, not null)
  - `full_name` (text)
  - `phone` (text)
  - `role` (text, default 'member') - public | member | admin | super_admin
  - `avatar_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `memberships`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `membership_number` (text, unique, auto-generated)
  - `tier` (text) - student | associate | full
  - `status` (text) - pending | active | expired | rejected
  - `application_date` (timestamptz)
  - `approval_date` (timestamptz)
  - `expiry_date` (timestamptz)
  - `renewal_reminder_sent` (boolean, default false)
  - `photo_url` (text)
  - `id_document_url` (text)
  - `degree_certificate_url` (text)
  - `qualifications` (text)
  - `experience_years` (integer)
  - `institution` (text)
  - `city` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can read their own profile
  - Users can update their own profile
  - Admins can read/update all profiles
  - Public can view active members directory
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('public', 'member', 'admin', 'super_admin')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  membership_number text UNIQUE,
  tier text NOT NULL CHECK (tier IN ('student', 'associate', 'full')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'rejected')),
  application_date timestamptz DEFAULT now(),
  approval_date timestamptz,
  expiry_date timestamptz,
  renewal_reminder_sent boolean DEFAULT false,
  photo_url text,
  id_document_url text,
  degree_certificate_url text,
  qualifications text,
  experience_years integer DEFAULT 0,
  institution text,
  city text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Create function to generate membership number
CREATE OR REPLACE FUNCTION generate_membership_number()
RETURNS text AS $$
DECLARE
  year_code text;
  sequence_num text;
  new_number text;
BEGIN
  year_code := TO_CHAR(NOW(), 'YY');
  
  SELECT LPAD((COUNT(*) + 1)::text, 4, '0')
  INTO sequence_num
  FROM memberships
  WHERE membership_number LIKE 'PSORT-' || year_code || '%';
  
  new_number := 'PSORT-' || year_code || '-' || sequence_num;
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate membership number
CREATE OR REPLACE FUNCTION set_membership_number()
RETURNS trigger AS $$
BEGIN
  IF NEW.membership_number IS NULL THEN
    NEW.membership_number := generate_membership_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_membership_number
  BEFORE INSERT ON memberships
  FOR EACH ROW
  EXECUTE FUNCTION set_membership_number();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memberships_updated_at
  BEFORE UPDATE ON memberships
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
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

CREATE POLICY "Public can view active members"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.user_id = profiles.id
      AND memberships.status = 'active'
    )
  );

-- RLS Policies for memberships
CREATE POLICY "Users can view own membership"
  ON memberships FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own membership"
  ON memberships FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own membership"
  ON memberships FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all memberships"
  ON memberships FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can update all memberships"
  ON memberships FOR UPDATE
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

CREATE POLICY "Public can view active members directory"
  ON memberships FOR SELECT
  TO authenticated
  USING (status = 'active');

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
