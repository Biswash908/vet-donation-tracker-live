# Supabase Storage Setup Guide

## Overview
This document explains how to set up Supabase Storage for file uploads and migrate your database from storing base64 images to storing file paths.

## Step 1: Create Storage Buckets

You need to create two public storage buckets in your Supabase project:

1. **pet-images** - For storing pet photos
2. **pet-invoices** - For storing invoice PDFs

### To Create Buckets:

1. Go to your Supabase project dashboard
2. Click on **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Name it `pet-images`
   - Set it as **Public** (so images can be viewed by anyone)
   - Click Create
5. Repeat for `pet-invoices` bucket

### Set Bucket Policies (Public Access)

For each bucket, you need to allow public read access:

1. Click on the bucket (e.g., `pet-images`)
2. Click the **Policies** tab
3. Click **New Policy** → **For full customization, use custom SQL**
4. Paste this SQL:

```sql
-- Allow public read access
create policy "Allow public read"
on storage.objects
for select
using (bucket_id = 'pet-images');

-- Allow authenticated uploads
create policy "Allow authenticated uploads"
on storage.objects
for insert
with check (bucket_id = 'pet-images' AND auth.role() = 'authenticated');
```

5. Repeat similar policies for `pet-invoices` bucket (replace bucket name in SQL)

## Step 2: Update Database Schema

Run the following SQL migration in your Supabase SQL editor:

```sql
-- These columns already exist, this just documents their new purpose:
-- pet_photo: VARCHAR(500) - Now stores public Storage URL instead of base64
-- invoice_file: VARCHAR(500) - Now stores public Storage URL instead of base64

-- If you have any existing base64 data and want to clear it:
UPDATE invoices 
SET pet_photo = NULL 
WHERE pet_photo IS NOT NULL AND pet_photo LIKE 'data:%';

UPDATE invoices 
SET invoice_file = NULL 
WHERE invoice_file IS NOT NULL AND invoice_file LIKE 'data:%';
```

## Step 3: How It Works Now

### Adding a New Case:
1. User uploads photo via the "Add New Case" form
2. Photo is uploaded to `pet-images` bucket in Supabase Storage
3. A public URL is generated and stored in the database
4. The URL looks like: `https://[project-id].supabase.co/storage/v1/object/public/pet-images/[timestamp]-[filename].jpg`

### Editing a Case:
1. User can optionally upload a new photo
2. New photo replaces the old URL in the database
3. Old files remain in storage (can be manually deleted if needed)

### Displaying Images:
1. Components fetch the `pet_photo` URL from the database
2. URLs are public, so images display without authentication
3. Images load much faster than base64 data

## Environment Variables

Your app already uses these from Vite:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

No additional environment variables are needed for file uploads.

## Code Changes

The following files have been updated:

1. **src/lib/supabase.ts** - Added `uploadFileToStorage()` function
2. **src/components/AddNewCase.tsx** - Now uploads to Storage instead of base64
3. **src/components/EditCase.tsx** - Added photo upload capability
4. **src/components/Home.tsx** - Already displays images from URLs correctly
5. **src/components/PetDetail.tsx** - Already displays images from URLs correctly

## Testing

1. Go to the Add New Case page
2. Fill in the form and upload a pet photo
3. Click Publish
4. Check the Home page - the photo should appear
5. Click on the pet to view details - the photo should appear there too

## Troubleshooting

### Images not showing:
- Check that the `pet-images` bucket is set to **Public**
- Verify the URL in the database starts with `https://`
- Check browser console for CORS errors

### Upload fails:
- Verify the bucket names are exactly `pet-images` and `pet-invoices`
- Ensure buckets have public read policies
- Check that your VITE_SUPABASE_ANON_KEY has storage permissions

### Old base64 images:
- They won't display anymore after migration
- You can either delete the old records or manually clear the `pet_photo` field
- New uploads will use the proper Storage system
