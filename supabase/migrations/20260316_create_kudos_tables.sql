-- ============================================================
-- Sun* Kudos - Live Board: Database Schema
-- Created: 2026-03-16
-- ============================================================

-- User profiles (extended from auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  department_code TEXT,
  department_name TEXT,
  star_count INT DEFAULT 0,
  hero_badge TEXT CHECK (hero_badge IN ('Legend Hero', 'Rising Hero', 'New Hero')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Departments reference
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Hashtags reference
CREATE TABLE IF NOT EXISTS hashtags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Kudos posts
CREATE TABLE IF NOT EXISTS kudos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  danh_hieu TEXT,
  hashtag_category TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Kudos hashtags (many-to-many)
CREATE TABLE IF NOT EXISTS kudos_hashtags (
  kudo_id UUID REFERENCES kudos(id) ON DELETE CASCADE,
  hashtag TEXT NOT NULL,
  PRIMARY KEY (kudo_id, hashtag)
);

-- Kudos images
CREATE TABLE IF NOT EXISTS kudos_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kudo_id UUID REFERENCES kudos(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Hearts (likes)
CREATE TABLE IF NOT EXISTS kudos_hearts (
  kudo_id UUID REFERENCES kudos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (kudo_id, user_id)
);

-- Secret boxes
CREATE TABLE IF NOT EXISTS secret_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_opened BOOLEAN DEFAULT false,
  gift_description TEXT,
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_kudos_created_at ON kudos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_kudos_sender ON kudos(sender_id);
CREATE INDEX IF NOT EXISTS idx_kudos_receiver ON kudos(receiver_id);
CREATE INDEX IF NOT EXISTS idx_kudos_hearts_kudo ON kudos_hearts(kudo_id);
CREATE INDEX IF NOT EXISTS idx_kudos_hearts_user ON kudos_hearts(user_id);
CREATE INDEX IF NOT EXISTS idx_secret_boxes_user ON secret_boxes(user_id);
CREATE INDEX IF NOT EXISTS idx_kudos_hashtags_hashtag ON kudos_hashtags(hashtag);
CREATE INDEX IF NOT EXISTS idx_kudos_images_kudo ON kudos_images(kudo_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_name ON user_profiles(full_name);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

-- kudos: authenticated users can read all, insert own
ALTER TABLE kudos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "kudos_read" ON kudos;
CREATE POLICY "kudos_read" ON kudos FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "kudos_insert" ON kudos;
CREATE POLICY "kudos_insert" ON kudos FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);

-- kudos_hearts: read all, insert/delete own
ALTER TABLE kudos_hearts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "hearts_read" ON kudos_hearts;
CREATE POLICY "hearts_read" ON kudos_hearts FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "hearts_insert" ON kudos_hearts;
CREATE POLICY "hearts_insert" ON kudos_hearts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "hearts_delete" ON kudos_hearts;
CREATE POLICY "hearts_delete" ON kudos_hearts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- kudos_hashtags: read all, insert for own kudos
ALTER TABLE kudos_hashtags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "kudos_hashtags_read" ON kudos_hashtags;
CREATE POLICY "kudos_hashtags_read" ON kudos_hashtags FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "kudos_hashtags_insert" ON kudos_hashtags;
CREATE POLICY "kudos_hashtags_insert" ON kudos_hashtags FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM kudos WHERE id = kudo_id AND sender_id = auth.uid()));

-- kudos_images: read all, insert for own kudos
ALTER TABLE kudos_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "kudos_images_read" ON kudos_images;
CREATE POLICY "kudos_images_read" ON kudos_images FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "kudos_images_insert" ON kudos_images;
CREATE POLICY "kudos_images_insert" ON kudos_images FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM kudos WHERE id = kudo_id AND sender_id = auth.uid()));

-- secret_boxes: users can only access own
ALTER TABLE secret_boxes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "boxes_own" ON secret_boxes;
CREATE POLICY "boxes_own" ON secret_boxes FOR ALL TO authenticated USING (auth.uid() = user_id);

-- user_profiles: read all, update own
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_read" ON user_profiles;
CREATE POLICY "profiles_read" ON user_profiles FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "profiles_update" ON user_profiles;
CREATE POLICY "profiles_update" ON user_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- hashtags: read all
ALTER TABLE hashtags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "ref_hashtags_read" ON hashtags;
CREATE POLICY "ref_hashtags_read" ON hashtags FOR SELECT TO authenticated USING (true);

-- departments: read all
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "ref_departments_read" ON departments;
CREATE POLICY "ref_departments_read" ON departments FOR SELECT TO authenticated USING (true);
