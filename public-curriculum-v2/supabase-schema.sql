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

-- Admin dashboard reads (password-gated, uses anon key)
CREATE POLICY "Allow admin dashboard read on profiles"
  ON profiles FOR SELECT
  TO anon
  USING (true);

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

-- Authenticated users can join the waitlist
CREATE POLICY "Authenticated users can join waitlist"
  ON waitlist FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can read their own entry
CREATE POLICY "Users can read own waitlist entry"
  ON waitlist FOR SELECT
  TO authenticated
  USING (LOWER(email) = LOWER(auth.jwt() ->> 'email'));

-- Admin dashboard reads (password-gated, uses anon key)
CREATE POLICY "Allow admin dashboard read on waitlist"
  ON waitlist FOR SELECT
  TO anon
  USING (true);


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


-- ════════════════════════════════════════════════════════════
-- 5. ADMIN RPC FUNCTIONS
--    Called from the admin dashboard via supabase.rpc().
--    SECURITY DEFINER bypasses RLS; the function body checks
--    that the caller's role in profiles is 'admin'.
-- ════════════════════════════════════════════════════════════

-- Helper: raise a consistent permission denied error
CREATE OR REPLACE FUNCTION public.admin_denied()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'Permission denied — admin role required'
    USING HINT = 'Your account must have role = admin in the profiles table.';
END;
$$;

-- 5a. Get all profiles (admin only)
CREATE OR REPLACE FUNCTION public.get_admin_profiles()
RETURNS SETOF profiles
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    PERFORM public.admin_denied();
  END IF;

  RETURN QUERY SELECT * FROM public.profiles ORDER BY created_at DESC;
END;
$$;

-- 5b. Get all waitlist entries (admin only)
CREATE OR REPLACE FUNCTION public.get_admin_waitlist()
RETURNS SETOF waitlist
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    PERFORM public.admin_denied();
  END IF;

  RETURN QUERY SELECT * FROM public.waitlist ORDER BY created_at DESC;
END;
$$;


-- ════════════════════════════════════════════════════════════
-- 6. PLAN MANAGEMENT RPCs (SECURITY DEFINER — bypasses RLS)
--    Client-side plan changes go through these functions so
--    the database controls what transitions are allowed.
-- ════════════════════════════════════════════════════════════

-- 6a. Cancel subscription — downgrades to free (only allowed transition from client)
CREATE OR REPLACE FUNCTION public.cancel_subscription()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_plan TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN '{"ok": false, "error": "Not authenticated"}'::jsonb;
  END IF;

  SELECT plan INTO v_current_plan FROM public.profiles WHERE id = auth.uid();

  IF v_current_plan IS NULL OR v_current_plan = 'free' THEN
    RETURN '{"ok": false, "error": "No active subscription to cancel"}'::jsonb;
  END IF;

  UPDATE public.profiles
  SET plan = 'free', grades = '[]'::jsonb
  WHERE id = auth.uid();

  RETURN '{"ok": true}'::jsonb;
END;
$$;

-- 6b. Verify and update plan — placeholder for Stripe integration
--     Currently BLOCKS all upgrades from client-side.
--     When Stripe is integrated, this function (or a webhook handler)
--     will verify the payment session before updating the plan.
CREATE OR REPLACE FUNCTION public.verify_and_update_plan(
  new_plan TEXT,
  new_grades JSONB DEFAULT '[]'::jsonb
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_plan TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN '{"ok": false, "error": "Not authenticated"}'::jsonb;
  END IF;

  -- Only allow downgrade to free (cancel subscription)
  IF new_plan = 'free' THEN
    UPDATE public.profiles
    SET plan = 'free', grades = '[]'::jsonb
    WHERE id = auth.uid();
    RETURN '{"ok": true}'::jsonb;
  END IF;

  -- Block all upgrades from client-side — must go through Stripe
  RETURN jsonb_build_object(
    'ok', false,
    'error', 'Plan upgrades must be processed through the payment system'
  );
END;
$$;


-- ════════════════════════════════════════════════════════════
-- MIGRATION: Lock down anon access to PII
-- DEPLOY ATOMICALLY WITH ADMIN DASHBOARD REWORK
-- ════════════════════════════════════════════════════════════

-- Remove anon SELECT on profiles (admin now uses get_admin_profiles() RPC)
DROP POLICY IF EXISTS "Allow admin dashboard read on profiles" ON profiles;

-- Remove anon SELECT on waitlist (admin now uses get_admin_waitlist() RPC)
DROP POLICY IF EXISTS "Allow admin dashboard read on waitlist" ON waitlist;

-- Remove anon INSERT on waitlist (now requires authentication)
DROP POLICY IF EXISTS "Allow public to join waitlist" ON waitlist;
