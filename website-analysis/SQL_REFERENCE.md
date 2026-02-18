# SQL Commands Reference

## 1. Clear Old Base64 Data (Optional)
If you have existing records with base64 image data, run this to clear them:

```sql
-- Remove base64 encoded images (they start with "data:")
UPDATE invoices 
SET pet_photo = NULL 
WHERE pet_photo IS NOT NULL AND pet_photo LIKE 'data:%';

UPDATE invoices 
SET invoice_file = NULL 
WHERE invoice_file IS NOT NULL AND invoice_file LIKE 'data:%';
```

## 2. Verify Database Structure
This query shows your current invoices table structure:

```sql
-- Check invoices table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'invoices'
ORDER BY ordinal_position;
```

Expected columns:
- pet_photo: VARCHAR(500)
- invoice_file: VARCHAR(500)

## 3. View Sample Data
Check what's currently in your database:

```sql
-- See all invoices with their photo URLs
SELECT 
  id,
  animal_name,
  pet_photo,
  invoice_file,
  created_at
FROM invoices
ORDER BY created_at DESC;
```

## 4. Check Storage Buckets (From Dashboard)
You can't create buckets with SQL, but you can query if files exist:

```sql
-- This won't work from here - use Supabase Storage dashboard instead
-- Create buckets in: Project → Storage → Create bucket
-- Bucket names needed:
-- - pet-images
-- - pet-invoices
```

## 5. Storage Policies SQL
Run these in the Supabase SQL Editor for each bucket:

### For pet-images bucket:
```sql
-- Allow public to read images
CREATE POLICY "Allow public read images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'pet-images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated upload images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'pet-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their own uploads
CREATE POLICY "Allow authenticated update images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'pet-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their own uploads
CREATE POLICY "Allow authenticated delete images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'pet-images' AND auth.role() = 'authenticated');
```

### For pet-invoices bucket:
```sql
-- Allow public to read invoices
CREATE POLICY "Allow public read invoices"
ON storage.objects
FOR SELECT
USING (bucket_id = 'pet-invoices');

-- Allow authenticated users to upload invoices
CREATE POLICY "Allow authenticated upload invoices"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'pet-invoices' AND auth.role() = 'authenticated');

-- Allow authenticated users to update invoices
CREATE POLICY "Allow authenticated update invoices"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'pet-invoices' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete invoices
CREATE POLICY "Allow authenticated delete invoices"
ON storage.objects
FOR DELETE
USING (bucket_id = 'pet-invoices' AND auth.role() = 'authenticated');
```

## 6. Query Photo URLs
View all photos currently stored in your database:

```sql
-- See all images and where they're stored
SELECT 
  animal_name,
  pet_photo,
  CASE 
    WHEN pet_photo LIKE 'data:%' THEN 'Base64 (Old Format)'
    WHEN pet_photo LIKE 'https://%supabase%' THEN 'Supabase Storage (New Format)'
    WHEN pet_photo LIKE 'https://%unsplash%' THEN 'External URL'
    ELSE 'Unknown'
  END AS storage_type,
  created_at
FROM invoices
WHERE pet_photo IS NOT NULL
ORDER BY created_at DESC;
```

## 7. Cleanup Orphaned Records
If needed, delete test records:

```sql
-- Delete test cases (be careful!)
DELETE FROM invoices 
WHERE animal_name LIKE '%test%' 
  OR animal_name LIKE '%Test%';

-- Check affected rows first:
SELECT COUNT(*) FROM invoices 
WHERE animal_name LIKE '%test%' 
  OR animal_name LIKE '%Test%';
```

## 8. Migration Data (If Needed)
Example if you want to manually update URLs:

```sql
-- This would update all Unsplash URLs to storage format
-- Only run this if you're manually migrating existing data
UPDATE invoices
SET pet_photo = 'https://[your-project].supabase.co/storage/v1/object/public/pet-images/unsplash-max.jpg'
WHERE animal_name = 'Max' 
  AND pet_photo LIKE 'https://images.unsplash%';
```

## Where to Run These Commands

1. Go to your Supabase project
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Paste one of the SQL commands above
5. Click **Run**

## Step-by-Step Execution Order

1. ✅ Verify database structure (Step 3)
2. ✅ Create buckets in Storage dashboard (NOT SQL)
3. ✅ Run storage policies SQL (Steps 5)
4. ✅ Optionally clear old data (Step 1)
5. ✅ Test your app

## Important Notes

- **Do NOT run Step 1** unless you have old base64 images
- **Step 4** - Buckets are created in the UI, not SQL
- **Steps 5** - These policies allow PUBLIC READ (anyone can see photos)
- **Authentications** - Uploads require authentication (your admin users)

## Troubleshooting

### Policy already exists error?
Drop the old one first:
```sql
DROP POLICY IF EXISTS "Allow public read images" ON storage.objects;
```

### Can't see buckets in Storage?
Refresh the page or create them again

### Images still not showing?
1. Check policies are created
2. Verify bucket name is exactly: `pet-images`
3. Make sure bucket is set to Public (in UI, not SQL)
