# Quick Start: Image Upload Fix

## TL;DR - Do This Now

### In Supabase Dashboard:

1. **Create Bucket 1:**
   - Click Storage → Create bucket
   - Name: `pet-images`
   - Make it Public ✓
   - Create

2. **Create Bucket 2:**
   - Click Storage → Create bucket
   - Name: `pet-invoices`
   - Make it Public ✓
   - Create

3. **Set Permissions (for each bucket):**
   - Click Policies tab
   - New Policy → SQL Editor
   - Paste this SQL and run it:

```sql
CREATE POLICY "Allow public read" ON storage.objects
FOR SELECT USING (bucket_id = 'pet-images');

CREATE POLICY "Allow authenticated upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'pet-images');
```

4. **Repeat for pet-invoices** (replace bucket name in SQL)

### Test Your App:

1. Go to Admin Dashboard → Add New Case
2. Upload a pet photo
3. Fill in other fields
4. Click Publish
5. Go to Home page
6. **Your photo should appear!** ✓

## That's It!

Your images will now:
- Upload to Supabase Storage
- Display on all pages (Home, Pet Details, Admin)
- Be fast and efficient
- Work reliably

## If Something Doesn't Work:

### Photos not showing?
- Make sure buckets are set to "Public" (not private)
- Check the Storage → pet-images bucket exists

### Upload fails?
- Verify bucket names are exactly: `pet-images` and `pet-invoices`
- Check policies are created

### Still stuck?
- See full details in `STORAGE_SETUP.md`

---

**That's all you need to do!** The code is already updated. Just create the buckets in Supabase and you're good to go.
