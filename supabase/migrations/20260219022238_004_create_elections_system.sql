/*
  # PSORT Elections System

  ## Overview
  Complete online voting system for PSORT executive committee elections
  with nomination management, secure voting, and results tracking.

  ## New Tables
  
  ### `elections`
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `description` (text)
  - `nomination_start` (timestamptz)
  - `nomination_end` (timestamptz)
  - `voting_start` (timestamptz)
  - `voting_end` (timestamptz)
  - `status` (text) - upcoming | nomination_open | voting_open | completed | cancelled
  - `results_announced` (boolean, default false)
  - `results_announced_at` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `election_positions`
  - `id` (uuid, primary key)
  - `election_id` (uuid, references elections)
  - `title` (text, not null) - President, Vice President, etc.
  - `description` (text)
  - `display_order` (integer)
  - `max_candidates` (integer)

  ### `election_nominations`
  - `id` (uuid, primary key)
  - `election_id` (uuid, references elections)
  - `position_id` (uuid, references election_positions)
  - `candidate_id` (uuid, references profiles)
  - `nominator_id` (uuid, references profiles)
  - `statement` (text)
  - `cv_url` (text)
  - `photo_url` (text)
  - `status` (text) - pending | approved | rejected
  - `submitted_at` (timestamptz)
  - `reviewed_at` (timestamptz)
  - `reviewer_notes` (text)

  ### `election_votes`
  - `id` (uuid, primary key)
  - `election_id` (uuid, references elections)
  - `position_id` (uuid, references election_positions)
  - `voter_id` (uuid, references profiles)
  - `candidate_id` (uuid, references profiles)
  - `voted_at` (timestamptz)
  - UNIQUE(election_id, position_id, voter_id)

  ### `election_results`
  - `id` (uuid, primary key)
  - `election_id` (uuid, references elections)
  - `position_id` (uuid, references election_positions)
  - `candidate_id` (uuid, references profiles)
  - `vote_count` (integer, default 0)
  - `is_winner` (boolean, default false)

  ## Security
  - Enable RLS on all tables
  - Only eligible members can vote (active paid membership)
  - One vote per position per member
  - Anonymous voting (votes are recorded but voter identity is protected)
  - Only admins can view individual votes
  - Results visible after announcement
*/

-- Create elections table
CREATE TABLE IF NOT EXISTS elections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  nomination_start timestamptz,
  nomination_end timestamptz,
  voting_start timestamptz,
  voting_end timestamptz,
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'nomination_open', 'voting_open', 'completed', 'cancelled')),
  results_announced boolean DEFAULT false,
  results_announced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE elections ENABLE ROW LEVEL SECURITY;

-- Create election_positions table
CREATE TABLE IF NOT EXISTS election_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id uuid REFERENCES elections(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  max_candidates integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE election_positions ENABLE ROW LEVEL SECURITY;

-- Create election_nominations table
CREATE TABLE IF NOT EXISTS election_nominations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id uuid REFERENCES elections(id) ON DELETE CASCADE,
  position_id uuid REFERENCES election_positions(id) ON DELETE CASCADE,
  candidate_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  nominator_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  statement text,
  cv_url text,
  photo_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewer_notes text,
  UNIQUE(election_id, position_id, candidate_id)
);

ALTER TABLE election_nominations ENABLE ROW LEVEL SECURITY;

-- Create election_votes table
CREATE TABLE IF NOT EXISTS election_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id uuid REFERENCES elections(id) ON DELETE CASCADE,
  position_id uuid REFERENCES election_positions(id) ON DELETE CASCADE,
  voter_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  candidate_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  voted_at timestamptz DEFAULT now(),
  UNIQUE(election_id, position_id, voter_id)
);

ALTER TABLE election_votes ENABLE ROW LEVEL SECURITY;

-- Create election_results table
CREATE TABLE IF NOT EXISTS election_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id uuid REFERENCES elections(id) ON DELETE CASCADE,
  position_id uuid REFERENCES election_positions(id) ON DELETE CASCADE,
  candidate_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  vote_count integer DEFAULT 0,
  is_winner boolean DEFAULT false,
  UNIQUE(election_id, position_id, candidate_id)
);

ALTER TABLE election_results ENABLE ROW LEVEL SECURITY;

-- Trigger for elections updated_at
CREATE TRIGGER update_elections_updated_at
  BEFORE UPDATE ON elections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to check if user is eligible to vote
CREATE OR REPLACE FUNCTION is_eligible_voter(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM memberships
    WHERE user_id = user_uuid
    AND status = 'active'
    AND expiry_date > now()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate election results
CREATE OR REPLACE FUNCTION calculate_election_results(election_uuid uuid)
RETURNS void AS $$
BEGIN
  DELETE FROM election_results WHERE election_id = election_uuid;
  
  INSERT INTO election_results (election_id, position_id, candidate_id, vote_count)
  SELECT 
    election_id,
    position_id,
    candidate_id,
    COUNT(*) as vote_count
  FROM election_votes
  WHERE election_id = election_uuid
  GROUP BY election_id, position_id, candidate_id;
  
  -- Mark winners (candidate with most votes in each position)
  UPDATE election_results er
  SET is_winner = true
  WHERE (election_id, position_id, vote_count) IN (
    SELECT election_id, position_id, MAX(vote_count)
    FROM election_results
    WHERE election_id = election_uuid
    GROUP BY election_id, position_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for elections
CREATE POLICY "Public can view elections"
  ON elections FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage elections"
  ON elections FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for election_positions
CREATE POLICY "Public can view positions"
  ON election_positions FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage positions"
  ON election_positions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for election_nominations
CREATE POLICY "Public can view approved nominations"
  ON election_nominations FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Users can view own nominations"
  ON election_nominations FOR SELECT
  TO authenticated
  USING (candidate_id = auth.uid() OR nominator_id = auth.uid());

CREATE POLICY "Eligible members can submit nominations"
  ON election_nominations FOR INSERT
  TO authenticated
  WITH CHECK (
    nominator_id = auth.uid() AND
    is_eligible_voter(auth.uid()) AND
    EXISTS (
      SELECT 1 FROM elections
      WHERE id = election_id
      AND status = 'nomination_open'
    )
  );

CREATE POLICY "Admins can manage nominations"
  ON election_nominations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for election_votes
CREATE POLICY "Users cannot view individual votes"
  ON election_votes FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "Admins can view all votes"
  ON election_votes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Eligible members can vote"
  ON election_votes FOR INSERT
  TO authenticated
  WITH CHECK (
    voter_id = auth.uid() AND
    is_eligible_voter(auth.uid()) AND
    EXISTS (
      SELECT 1 FROM elections
      WHERE id = election_id
      AND status = 'voting_open'
    )
  );

-- RLS Policies for election_results
CREATE POLICY "Public can view announced results"
  ON election_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM elections
      WHERE elections.id = election_results.election_id
      AND elections.results_announced = true
    )
  );

CREATE POLICY "Admins can manage results"
  ON election_results FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );
