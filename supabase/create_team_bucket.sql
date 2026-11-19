-- ===================================================
-- Supabase Migration: 'team' Storage Bucket & Co-founders
-- ===================================================

-- 1. Create 'team' Storage Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team', 'team', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow Public Read Access for 'team' bucket images
DROP POLICY IF EXISTS "Public Read Access for Team Bucket" ON storage.objects;
CREATE POLICY "Public Read Access for Team Bucket" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'team');

-- 3. Allow Upload Access for 'team' bucket
DROP POLICY IF EXISTS "Public Insert Access for Team Bucket" ON storage.objects;
CREATE POLICY "Public Insert Access for Team Bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'team');

DROP POLICY IF EXISTS "Public Update Access for Team Bucket" ON storage.objects;
CREATE POLICY "Public Update Access for Team Bucket" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'team');

-- 4. Shift existing heads down so Renesha and Madhav take spots 1 and 2
UPDATE public.team SET display_order = 3 WHERE name = 'Adhira Sethi';
UPDATE public.team SET display_order = 4 WHERE name = 'Srishti Mehta';

-- 5. Insert Renesha Sagar and Madhav Gairola at the very top of leadership
INSERT INTO public.team (name, role, tier, department, photo_url, bio, display_order)
VALUES 
  (
    'Renesha Sagar', 
    'Co-Head and Co-founder', 
    'head', 
    'Technical', 
    'https://zqctadeszfnpnqopiamb.supabase.co/storage/v1/object/public/team/renesha_sagar.jpg', 
    'Technical approach and executive', 
    1
  ),
  (
    'Madhav Gairola', 
    'Co-Head and Co-founder', 
    'head', 
    'Technical', 
    'https://zqctadeszfnpnqopiamb.supabase.co/storage/v1/object/public/team/madhav_gairola.jpg', 
    'Technical operations and executive', 
    2
  );

