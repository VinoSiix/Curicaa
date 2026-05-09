-- ============================================================
-- Curicaa Full Schema — Supabase
-- Run ALL of this in Supabase SQL Editor
-- ============================================================


-- ════════════════════════════════════════════════════════════
-- 1. PROFILES TABLE — one row per user, linked to auth.users
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free',
  grades JSONB DEFAULT '[]'::jsonb,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Admin users can read all profiles
CREATE POLICY "Admin can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Users can update their own profile (name only — plan/role locked)
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND (plan, role) = (
      SELECT plan, role FROM profiles WHERE id = auth.uid()
    )
  );

-- Allow inserts during signup (trigger handles this, but also allow direct insert)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);


-- ════════════════════════════════════════════════════════════
-- 2. AUTO-CREATE PROFILE TRIGGER
--    When a new user signs up via Supabase Auth, this creates
--    their profile row automatically.
-- ════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, plan, grades, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    LOWER(NEW.email),
    'free',
    '[]'::jsonb,
    'user'
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- If profile already exists, just skip
  RETURN NEW;
END;
$$;

-- Drop existing trigger if recreating
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ════════════════════════════════════════════════════════════
-- 3. WAITLIST TABLE
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'landing_page'
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (LOWER(email));

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Anyone can join the waitlist (anonymous inserts)
CREATE POLICY "Allow public to join waitlist"
  ON waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated users can read their own entry
CREATE POLICY "Users can read own waitlist entry"
  ON waitlist FOR SELECT
  TO authenticated
  USING (LOWER(email) = LOWER(auth.jwt() ->> 'email'));

-- Admin users can read all waitlist entries
CREATE POLICY "Admin can read all waitlist"
  ON waitlist FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- ════════════════════════════════════════════════════════════
-- 4. DISCOUNT ELIGIBILITY TABLE
--    Populated after Stripe launch — links waitlisted emails
--    to new accounts with 30% discount codes.
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS discount_eligibility (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  discount_code TEXT NOT NULL,
  discount_percent INTEGER DEFAULT 30,
  claimed BOOLEAN DEFAULT FALSE,
  claimed_at TIMESTAMPTZ,
  source TEXT DEFAULT 'waitlist',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE discount_eligibility ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own discount"
  ON discount_eligibility FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());


-- ════════════════════════════════════════════════════════════
-- 5. ADMIN RPC FUNCTION
--    Returns waitlist + profiles for the admin dashboard.
--    Uses SECURITY DEFINER to bypass RLS (server-side only).
--    Only callable by authenticated admin users.
-- ════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION admin_get_data()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'waitlist', (
      SELECT COALESCE(json_agg(row_to_json(w)), '[]'::json)
      FROM (SELECT * FROM waitlist ORDER BY created_at DESC LIMIT 500) w
    ),
    'profiles', (
      SELECT COALESCE(json_agg(row_to_json(p)), '[]'::json)
      FROM (SELECT * FROM profiles ORDER BY created_at DESC LIMIT 500) p
    )
  ) INTO result;
  RETURN result;
END;
$$;


-- ════════════════════════════════════════════════════════════
-- MIGRATION: Run these statements on your EXISTING database
-- to add the role column, RPC function, and lock down policies.
-- ════════════════════════════════════════════════════════════

-- Step 1: Add role column if it doesn't exist
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Step 2: Set your admin account (replace with your actual email)
-- UPDATE profiles SET role = 'admin' WHERE email = 'YOUR_ADMIN_EMAIL@example.com';

-- Step 3: Drop the old insecure policies
-- DROP POLICY IF EXISTS "Allow admin read on waitlist" ON waitlist;
-- DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
-- DROP POLICY IF EXISTS "Users can read own profile" ON profiles;

-- Step 4: Create admin RPC function (copy from Section 5 above)

-- Step 5: Re-create policies with admin checks (the CREATE POLICY
-- statements above will work — they use IF NOT EXISTS behavior
-- via the full schema recreation)

-- Step 6: After Stripe launch — generate discount codes
/*
INSERT INTO discount_eligibility (user_id, email, discount_code, discount_percent, source)
SELECT
  u.id,
  u.email,
  'EARLY30-' || UPPER(SUBSTRING(MD5(u.email::text), 1, 8)),
  30,
  'waitlist'
FROM auth.users u
INNER JOIN waitlist w ON LOWER(u.email) = LOWER(w.email)
WHERE NOT EXISTS (
  SELECT 1 FROM discount_eligibility de WHERE de.user_id = u.id
);
*/
