# Database Migration Guide - Switch from BYTEA to Storage URLs

## What Needs to Change

Your database tables currently store images as `BYTEA` (binary data), which doesn't work with Supabase Storage. You need to change the columns to store URLs instead.

---

## Visual Comparison

### ❌ BEFORE (Current Schema - Broken)
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_name VARCHAR(255) NOT NULL,
  animal_type VARCHAR(100) NOT NULL DEFAULT 'Unknown',
  medical_condition TEXT NOT NULL,
  estimated_cost DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_link VARCHAR(500),
  pet_photo BYTEA,                    ← ❌ Stores binary data (huge & broken)
  pet_story TEXT,
  instagram_link VARCHAR(500),
  invoice_file BYTEA                  ← ❌ Stores binary data (huge & broken)
);
```

### ✅ AFTER (Fixed Schema - Works!)
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_name VARCHAR(255) NOT NULL,
  animal_type VARCHAR(100) NOT NULL DEFAULT 'Unknown',
  medical_condition TEXT NOT NULL,
  estimated_cost DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_link VARCHAR(500),
  pet_photo VARCHAR(500),             ← ✅ Stores URL string like "https://..."
  pet_story TEXT,
  instagram_link VARCHAR(500),
  invoice_file VARCHAR(500)           ← ✅ Stores URL string like "https://..."
);
```

---

## How to Migrate

### Option 1: Using Supabase SQL Editor (Recommended - Easiest)

1. Go to [Supabase Dashboard](https://supabase.com)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste this SQL:

```sql
-- Migration: Update pet_photo and invoice_file columns to store file paths instead of base64
-- This allows us to use Supabase Storage for file uploads

-- Step 1: Drop the old columns that contain BYTEA (binary) data
ALTER TABLE invoices 
DROP COLUMN IF EXISTS pet_photo CASCADE;

ALTER TABLE invoices 
DROP COLUMN IF EXISTS invoice_file CASCADE;

-- Step 2: Add new columns as VARCHAR to store Supabase Storage URLs
ALTER TABLE invoices 
ADD COLUMN pet_photo VARCHAR(500);

ALTER TABLE invoices 
ADD COLUMN invoice_file VARCHAR(500);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_invoices_pet_photo ON invoices(pet_photo);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_file ON invoices(invoice_file);
```

6. Click the **Run** button (▶ icon)
7. Wait for success message
8. ✅ Done!

---

### Option 2: Using Files from Your Project

If you prefer to execute the migration from your local files:

1. Open `/scripts/migrate_to_storage.sql` in your project
2. Copy all the SQL code
3. Paste it in Supabase SQL Editor
4. Click Run
5. ✅ Done!

---

## What This Migration Does

| Step | Action | Result |
|------|--------|--------|
| 1 | Drops old `pet_photo` column (BYTEA) | Removes broken binary data |
| 2 | Drops old `invoice_file` column (BYTEA) | Removes broken binary data |
| 3 | Creates new `pet_photo` column (VARCHAR) | Stores file URLs like `https://xyz.supabase.co/...` |
| 4 | Creates new `invoice_file` column (VARCHAR) | Stores file URLs like `https://xyz.supabase.co/...` |
| 5 | Creates performance indexes | Makes queries faster |

---

## Important Notes

⚠️ **Data Loss Warning:**
- Any existing photos stored as base64 will be deleted
- This is fine - they were broken anyway and wouldn't display
- New photos uploaded through the app will work perfectly

✅ **What's Safe:**
- All other data (names, costs, donations, etc.) remains intact
- Only the broken image columns are replaced

---

## After Migration - What Happens

### When You Upload a Photo Through the App

1. User selects a photo file
2. App uploads file to Supabase Storage bucket (`pet-images`)
3. Supabase returns a URL: `https://abc123.supabase.co/storage/v1/object/public/pet-images/photo.jpg`
4. App stores this URL string in `pet_photo` column
5. Photos display correctly on all pages! ✅

### Example Data After Migration

```
invoices table:
┌────────────┬──────────────────────────────────────────────────────────────┐
│ animal_name│ pet_photo                                                    │
├────────────┼──────────────────────────────────────────────────────────────┤
│ Whiskers   │ https://abc123.supabase.co/storage/v1/object/public/...     │
│ Fluffy     │ https://abc123.supabase.co/storage/v1/object/public/...     │
│ Shadow     │ NULL (no photo yet)                                          │
└────────────┴──────────────────────────────────────────────────────────────┘
```

---

## Code Changes Already Done

I've already updated these files to use Supabase Storage:

✅ `src/lib/supabase.ts` - Added `uploadFileToStorage()` function  
✅ `src/components/AddNewCase.tsx` - Changed to upload to Storage instead of base64  
✅ `src/components/EditCase.tsx` - Added photo upload capability  

---

## Step-by-Step Checklist

- [ ] Run the migration SQL in Supabase SQL Editor
- [ ] Verify tables have VARCHAR columns for photos (no more BYTEA)
- [ ] Create Storage buckets: `pet-images` and `pet-invoices`
- [ ] Set buckets to Public
- [ ] Test uploading a photo through the app
- [ ] Check that photo displays on Home page
- [ ] Check that photo displays in Pet Details
- [ ] ✅ Success! Photo system is working

---

## Troubleshooting

**Q: I get an error running the SQL**
A: Make sure you're logged into Supabase and in the correct project. Copy the SQL exactly as shown.

**Q: Photos still don't show after migration**
A: You also need to create the Storage buckets. See STORAGE_SETUP.md for those steps.

**Q: What if I already have existing photos?**
A: They will be deleted by the migration. This is fine - they were stored as broken base64 anyway and weren't displaying.

---

## Next Steps

After running this migration:

1. Follow **STORAGE_SETUP.md** to create Storage buckets
2. Test uploading a photo
3. Verify photos display on all pages
4. Done! 🎉

---

**Questions?** Check the other documentation files:
- SETUP_STEPS.txt - Complete setup walkthrough
- QUICK_START_IMAGES.md - TL;DR version
- STORAGE_SETUP.md - Storage bucket setup
