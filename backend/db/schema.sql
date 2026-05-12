-- JobAgent Database Schema
-- Migration: 20240101_initial_schema.sql
-- Run in Supabase SQL Editor

-- ============================================================
-- TABLE: job_applications
-- ============================================================
CREATE TABLE IF NOT EXISTS job_applications (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    source      TEXT NOT NULL CHECK (source IN ('indeed', 'france_travail', 'manual')),
    external_id TEXT,
    title       TEXT NOT NULL,
    company     TEXT,
    location    TEXT,
    contract_type TEXT,
    description TEXT,
    url         TEXT,
    date_posted TIMESTAMPTZ,
    score       INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    status      TEXT NOT NULL DEFAULT 'nouveau'
                CHECK (status IN ('nouveau', 'postule', 'relance', 'refus', 'accepte')),
    notes       TEXT,
    letter      TEXT,
    ats_keywords JSONB,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_score ON job_applications(score DESC);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_job_applications_updated_at ON job_applications;
CREATE TRIGGER trg_job_applications_updated_at
    BEFORE UPDATE ON job_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: candidate_profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS candidate_profiles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    email       TEXT,
    phone       TEXT,
    skills      TEXT,
    experience  TEXT,
    education   TEXT,
    preferences JSONB DEFAULT '{}',
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_candidate_profiles_updated_at ON candidate_profiles;
CREATE TRIGGER trg_candidate_profiles_updated_at
    BEFORE UPDATE ON candidate_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY — OBLIGATOIRE SUR CHAQUE TABLE
-- ============================================================

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_profiles ENABLE ROW LEVEL SECURITY;

-- job_applications : chaque utilisateur voit uniquement ses candidatures
DROP POLICY IF EXISTS "Users see own applications" ON job_applications;
CREATE POLICY "Users see own applications"
    ON job_applications FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- candidate_profiles : chaque utilisateur voit uniquement son profil
DROP POLICY IF EXISTS "Users see own profile" ON candidate_profiles;
CREATE POLICY "Users see own profile"
    ON candidate_profiles FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- GRANTS — obligatoires pour que RLS fonctionne
-- Sans ça : "permission denied for table" même avec anon key
-- ============================================================
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_applications TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.candidate_profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.candidate_profiles TO authenticated;

-- ============================================================
-- VÉRIFICATION (à exécuter après migration)
-- SELECT * FROM pg_policies WHERE tablename = 'job_applications';
-- SELECT * FROM pg_policies WHERE tablename = 'candidate_profiles';
-- SELECT grantee, privilege_type FROM information_schema.role_table_grants
--   WHERE table_name IN ('job_applications', 'candidate_profiles');
-- ============================================================
