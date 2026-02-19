/*
  # PSORT CMS - News, Blog & Content Management

  ## Overview
  Complete content management system for news articles, blog posts, 
  categories, tags, and comments with SEO optimization.

  ## New Tables
  
  ### `content_categories`
  - `id` (uuid, primary key)
  - `name` (text, not null, unique)
  - `slug` (text, unique)
  - `description` (text)
  - `created_at` (timestamptz)

  ### `content_tags`
  - `id` (uuid, primary key)
  - `name` (text, not null, unique)
  - `slug` (text, unique)
  - `created_at` (timestamptz)

  ### `content_posts`
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique)
  - `content` (text, not null)
  - `excerpt` (text)
  - `featured_image_url` (text)
  - `category_id` (uuid, references content_categories)
  - `author_id` (uuid, references profiles)
  - `status` (text) - draft | scheduled | published | archived
  - `published_at` (timestamptz)
  - `scheduled_for` (timestamptz)
  - `views_count` (integer, default 0)
  - `seo_title` (text)
  - `seo_description` (text)
  - `seo_image_url` (text)
  - `allow_comments` (boolean, default true)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `content_post_tags`
  - `post_id` (uuid, references content_posts)
  - `tag_id` (uuid, references content_tags)
  - Primary key (post_id, tag_id)

  ### `content_comments`
  - `id` (uuid, primary key)
  - `post_id` (uuid, references content_posts)
  - `user_id` (uuid, references profiles)
  - `parent_id` (uuid, references content_comments) - for nested replies
  - `content` (text, not null)
  - `status` (text) - pending | approved | rejected | spam
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public can view published posts and approved comments
  - Authenticated users can comment
  - Admins can manage all content
*/

-- Create content_categories table
CREATE TABLE IF NOT EXISTS content_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE content_categories ENABLE ROW LEVEL SECURITY;

-- Create content_tags table
CREATE TABLE IF NOT EXISTS content_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE content_tags ENABLE ROW LEVEL SECURITY;

-- Create content_posts table
CREATE TABLE IF NOT EXISTS content_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE,
  content text NOT NULL,
  excerpt text,
  featured_image_url text,
  category_id uuid REFERENCES content_categories(id),
  author_id uuid REFERENCES profiles(id),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
  published_at timestamptz,
  scheduled_for timestamptz,
  views_count integer DEFAULT 0,
  seo_title text,
  seo_description text,
  seo_image_url text,
  allow_comments boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_posts ENABLE ROW LEVEL SECURITY;

-- Create content_post_tags junction table
CREATE TABLE IF NOT EXISTS content_post_tags (
  post_id uuid REFERENCES content_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES content_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, tag_id)
);

ALTER TABLE content_post_tags ENABLE ROW LEVEL SECURITY;

-- Create content_comments table
CREATE TABLE IF NOT EXISTS content_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES content_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES content_comments(id) ON DELETE CASCADE,
  content text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_comments ENABLE ROW LEVEL SECURITY;

-- Trigger for content_posts updated_at
CREATE TRIGGER update_content_posts_updated_at
  BEFORE UPDATE ON content_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_comments_updated_at
  BEFORE UPDATE ON content_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-publish scheduled posts
CREATE OR REPLACE FUNCTION publish_scheduled_posts()
RETURNS void AS $$
BEGIN
  UPDATE content_posts
  SET status = 'published',
      published_at = now()
  WHERE status = 'scheduled'
  AND scheduled_for <= now();
END;
$$ LANGUAGE plpgsql;

-- RLS Policies for content_categories
CREATE POLICY "Public can view categories"
  ON content_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON content_categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for content_tags
CREATE POLICY "Public can view tags"
  ON content_tags FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tags"
  ON content_tags FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for content_posts
CREATE POLICY "Public can view published posts"
  ON content_posts FOR SELECT
  USING (status = 'published' AND published_at <= now());

CREATE POLICY "Authors can view own posts"
  ON content_posts FOR SELECT
  TO authenticated
  USING (author_id = auth.uid());

CREATE POLICY "Admins can view all posts"
  ON content_posts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Authors can insert posts"
  ON content_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    author_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('member', 'admin', 'super_admin')
    )
  );

CREATE POLICY "Authors can update own posts"
  ON content_posts FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Admins can manage all posts"
  ON content_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for content_post_tags
CREATE POLICY "Public can view post tags"
  ON content_post_tags FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM content_posts
      WHERE content_posts.id = content_post_tags.post_id
      AND content_posts.status = 'published'
    )
  );

CREATE POLICY "Authors can manage own post tags"
  ON content_post_tags FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM content_posts
      WHERE content_posts.id = content_post_tags.post_id
      AND content_posts.author_id = auth.uid()
    )
  );

-- RLS Policies for content_comments
CREATE POLICY "Public can view approved comments"
  ON content_comments FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Users can view own comments"
  ON content_comments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert comments"
  ON content_comments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own pending comments"
  ON content_comments FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() AND status = 'pending')
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all comments"
  ON content_comments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );
