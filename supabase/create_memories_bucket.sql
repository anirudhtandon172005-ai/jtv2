-- ===================================================
-- Supabase Migration: 'memories' Storage Bucket & RLS
-- ===================================================
-- Run this script in the Supabase Dashboard SQL Editor:
-- https://supabase.com/dashboard/project/zqctadeszfnpnqopiamb/sql/new

-- 1. Create 'memories' Storage Bucket with Public Access
INSERT INTO storage.buckets (id, name, public) 
VALUES ('memories', 'memories', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow Public Read Access for 'memories' bucket
DROP POLICY IF EXISTS "Public Read Access for Memories Bucket" ON storage.objects;
CREATE POLICY "Public Read Access for Memories Bucket" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'memories');

-- 3. Allow Public Insert Access for 'memories' bucket
DROP POLICY IF EXISTS "Public Insert Access for Memories Bucket" ON storage.objects;
CREATE POLICY "Public Insert Access for Memories Bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'memories');

-- 4. Allow Public Update Access for 'memories' bucket
DROP POLICY IF EXISTS "Public Update Access for Memories Bucket" ON storage.objects;
CREATE POLICY "Public Update Access for Memories Bucket" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'memories');

