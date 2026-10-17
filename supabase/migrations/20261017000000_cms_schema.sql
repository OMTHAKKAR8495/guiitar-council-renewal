-- GUIITAR Council CMS & Security Migration
-- Idempotent Supabase SQL Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Single-value content entries
CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'textarea', 'richtext', 'image', 'url', 'number', 'boolean', 'json')),
  value JSONB NOT NULL,
  draft_value JSONB,
  default_value JSONB NOT NULL,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT DEFAULT 'Admin'
);
CREATE INDEX IF NOT EXISTS idx_site_content_page ON site_content(page);
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section);

-- 2. Repeatable item lists
CREATE TABLE IF NOT EXISTS content_lists (
  id TEXT PRIMARY KEY,
  list_key TEXT NOT NULL,
  data JSONB NOT NULL,
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT DEFAULT 'Admin'
);
CREATE INDEX IF NOT EXISTS idx_content_lists_key ON content_lists(list_key, sort_order);

-- 3. Media Library Assets
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  path TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  width INT,
  height INT,
  size INT,
  mime TEXT NOT NULL,
  uploaded_by TEXT DEFAULT 'Admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Content Revision History (Rollback Support)
CREATE TABLE IF NOT EXISTS site_content_history (
  id BIGSERIAL PRIMARY KEY,
  content_key TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  changed_by TEXT,
  change_type TEXT DEFAULT 'publish',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_history_key ON site_content_history(content_key, created_at DESC);

-- 5. User Roles (RBAC)
CREATE TABLE IF NOT EXISTS user_roles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'Content Admin',
  assigned_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. News, Updates & Gallery Module
CREATE TABLE IF NOT EXISTS news_articles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  cover_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  show_on_home BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'Published' CHECK (status IN ('Draft', 'Published', 'Archived')),
  publish_at TIMESTAMPTZ,
  expire_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Ensure partners, resources, faqs tables exist
CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'Corporate',
  description TEXT DEFAULT '',
  badge TEXT,
  logo_url TEXT,
  website_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Policy Document',
  description TEXT DEFAULT '',
  format TEXT DEFAULT 'PDF',
  size TEXT DEFAULT '1.2 MB',
  link TEXT NOT NULL,
  updated_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'Getting Started',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure base entity tables exist
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT DEFAULT '10:00 AM – 04:00 PM IST',
  location TEXT DEFAULT 'GSFC University Campus',
  speaker TEXT DEFAULT 'GUIITAR Faculty & Experts',
  category TEXT DEFAULT 'Workshop',
  capacity INTEGER DEFAULT 50,
  registered INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Registration Open',
  is_upcoming BOOLEAN DEFAULT TRUE,
  seats TEXT DEFAULT '50 Seats Available',
  "desc" TEXT DEFAULT '',
  topics TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ideas (
  id TEXT PRIMARY KEY,
  ref_id TEXT UNIQUE,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  innovator TEXT NOT NULL,
  team_members TEXT[] DEFAULT '{}',
  email TEXT NOT NULL,
  phone TEXT,
  stage TEXT DEFAULT 'Ideation',
  category TEXT DEFAULT 'DeepTech',
  sector TEXT DEFAULT 'Engineering',
  "desc" TEXT NOT NULL,
  problem_statement TEXT,
  solution_desc TEXT,
  novelty TEXT,
  patent_status TEXT DEFAULT 'Not Filed',
  funding_required TEXT DEFAULT '₹2.5 Lakhs',
  trl_level TEXT DEFAULT 'TRL-3',
  status TEXT DEFAULT 'Published',
  pitch_deck_url TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS startups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  founders TEXT[] NOT NULL DEFAULT '{}',
  domain TEXT NOT NULL,
  batch TEXT DEFAULT 'Cohort 2026',
  funding_raised TEXT DEFAULT 'Bootstrapped',
  description TEXT,
  website_url TEXT,
  logo_url TEXT,
  status TEXT DEFAULT 'Incubated',
  patents INTEGER DEFAULT 0,
  valuation TEXT DEFAULT 'Pre-Seed',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  project_name TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  track TEXT DEFAULT 'SSIP 2.0 Grant',
  stage TEXT DEFAULT 'Prototype',
  status TEXT DEFAULT 'New',
  submitted_date TEXT NOT NULL,
  pitch_summary TEXT NOT NULL,
  team_size INTEGER DEFAULT 1,
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mentors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  domain TEXT NOT NULL,
  organization TEXT NOT NULL,
  experience TEXT DEFAULT '5+ Years',
  expertise TEXT[] DEFAULT '{}',
  avatar TEXT,
  email TEXT,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  duration TEXT DEFAULT '6 Months',
  grant_support TEXT DEFAULT 'Up to ₹2.5 Lakhs',
  target_cohort TEXT DEFAULT 'Students & Faculty',
  description TEXT,
  features TEXT[] DEFAULT '{}',
  eligibility TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  admin_name TEXT NOT NULL DEFAULT 'Admin',
  action TEXT NOT NULL,
  target_record TEXT NOT NULL,
  record_type TEXT NOT NULL,
  details TEXT DEFAULT '',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  ticket_id TEXT UNIQUE,
  student_name TEXT NOT NULL,
  enrollment_no TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  department TEXT NOT NULL,
  event_id TEXT,
  event_title TEXT NOT NULL,
  registration_date TEXT NOT NULL,
  status TEXT DEFAULT 'Registered',
  semester TEXT DEFAULT '6th Sem',
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS across all tables
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- 1. site_content
DROP POLICY IF EXISTS "Public can view site content" ON site_content;
CREATE POLICY "Public can view site content" ON site_content FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage site content" ON site_content;
CREATE POLICY "Admins can manage site content" ON site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. content_lists
DROP POLICY IF EXISTS "Public can view visible content lists" ON content_lists;
CREATE POLICY "Public can view visible content lists" ON content_lists FOR SELECT USING (is_visible = true);
DROP POLICY IF EXISTS "Admins can manage content lists" ON content_lists;
CREATE POLICY "Admins can manage content lists" ON content_lists FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. media
DROP POLICY IF EXISTS "Public can view media records" ON media;
CREATE POLICY "Public can view media records" ON media FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage media records" ON media;
CREATE POLICY "Admins can manage media records" ON media FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. site_content_history
DROP POLICY IF EXISTS "Admins can view and create history" ON site_content_history;
CREATE POLICY "Admins can view and create history" ON site_content_history FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. user_roles
DROP POLICY IF EXISTS "Admins can view roles" ON user_roles;
CREATE POLICY "Admins can view roles" ON user_roles FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Admins can manage roles" ON user_roles;
CREATE POLICY "Admins can manage roles" ON user_roles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. news_articles
DROP POLICY IF EXISTS "Public can view published news" ON news_articles;
CREATE POLICY "Public can view published news" ON news_articles FOR SELECT USING (
  status = 'Published' AND (publish_at IS NULL OR publish_at <= NOW()) AND (expire_at IS NULL OR expire_at >= NOW())
);
DROP POLICY IF EXISTS "Admins can manage news articles" ON news_articles;
CREATE POLICY "Admins can manage news articles" ON news_articles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. Business entities (Public SELECT, Admin ALL)
DROP POLICY IF EXISTS "Public access policy" ON events;
DROP POLICY IF EXISTS "Public can view events" ON events;
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage events" ON events;
CREATE POLICY "Admins can manage events" ON events FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access policy" ON mentors;
DROP POLICY IF EXISTS "Public can view mentors" ON mentors;
CREATE POLICY "Public can view mentors" ON mentors FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage mentors" ON mentors;
CREATE POLICY "Admins can manage mentors" ON mentors FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access policy" ON programs;
DROP POLICY IF EXISTS "Public can view programs" ON programs;
CREATE POLICY "Public can view programs" ON programs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage programs" ON programs;
CREATE POLICY "Admins can manage programs" ON programs FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access policy" ON startups;
DROP POLICY IF EXISTS "Public can view startups" ON startups;
CREATE POLICY "Public can view startups" ON startups FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage startups" ON startups;
CREATE POLICY "Admins can manage startups" ON startups FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view partners" ON partners;
CREATE POLICY "Public can view partners" ON partners FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage partners" ON partners;
CREATE POLICY "Admins can manage partners" ON partners FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view resources" ON resources;
CREATE POLICY "Public can view resources" ON resources FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage resources" ON resources;
CREATE POLICY "Admins can manage resources" ON resources FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view faqs" ON faqs;
CREATE POLICY "Public can view faqs" ON faqs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage faqs" ON faqs;
CREATE POLICY "Admins can manage faqs" ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. Ideas: Public can only view Published ideas. Public can submit.
DROP POLICY IF EXISTS "Public access policy" ON ideas;
DROP POLICY IF EXISTS "Public can view published ideas" ON ideas;
CREATE POLICY "Public can view published ideas" ON ideas FOR SELECT USING (status = 'Published');
DROP POLICY IF EXISTS "Public can submit ideas" ON ideas;
CREATE POLICY "Public can submit ideas" ON ideas FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can manage ideas" ON ideas;
CREATE POLICY "Admins can manage ideas" ON ideas FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 9. Applications: Strict anon INSERT only! Anon SELECT is strictly blocked.
DROP POLICY IF EXISTS "Public access policy" ON applications;
DROP POLICY IF EXISTS "Public can submit applications" ON applications;
CREATE POLICY "Public can submit applications" ON applications FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can manage applications" ON applications;
CREATE POLICY "Admins can manage applications" ON applications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 10. Registrations: Strict anon INSERT only! Anon SELECT is strictly blocked.
DROP POLICY IF EXISTS "Public access policy" ON registrations;
DROP POLICY IF EXISTS "Public can register for events" ON registrations;
CREATE POLICY "Public can register for events" ON registrations FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can manage registrations" ON registrations;
CREATE POLICY "Admins can manage registrations" ON registrations FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 11. Audit logs: Authenticated only
DROP POLICY IF EXISTS "Public access policy" ON audit_logs;
DROP POLICY IF EXISTS "Admins can view and create audit logs" ON audit_logs;
CREATE POLICY "Admins can view and create audit logs" ON audit_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket setup
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'site-media');

DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-media');

DROP POLICY IF EXISTS "Admin Update" ON storage.objects;
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-media');

DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-media');
