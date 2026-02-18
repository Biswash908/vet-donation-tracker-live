# Troubleshooting Guide

## Issue 1: "Case not found" in Admin Dashboard

**Problem:** All cases show "Case not found" in the admin dashboard

**Solution:**
1. Make sure your Supabase tables are created with the correct schema
2. Run these SQL commands in Supabase SQL Editor to check if tables exist:
   ```sql
   SELECT * FROM information_schema.tables WHERE table_schema = 'public';
   ```
3. If tables don't exist, run the SQL scripts from SUPABASE_SETUP.md
4. Make sure your environment variables are correct in `.env`:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

## Issue 2: Photos won't upload

**Current Status:** Photo uploads are not implemented. The form accepts image URLs instead.

**To upload photos with URLs:**
1. Host your images somewhere (Imgur, Unsplash, etc.)
2. Copy the image URL
3. Paste it into the "Pet Photo URL" field

**To implement real file uploads (advanced):**
1. You would need to use Supabase Storage
2. Create a storage bucket in Supabase
3. Implement file upload handlers in AddNewCase.tsx and EditCase.tsx

## Issue 3: Invoices upload section missing

**Current Status:** Invoice/PDF uploads are not implemented

**To add PDFs/invoices:**
1. You can use the "Vet Payment Link" field to store the payment/invoice URL
2. Or implement Supabase Storage for actual file uploads

## Issue 4: "Follow our journey" scrolling with fund progress

**Status:** This requires custom CSS styling in the PetDetail component to create a sticky/scrolling effect

**To implement:**
Edit `src/components/PetDetail.tsx` and add:
```css
.fund-progress-container {
  position: sticky;
  top: 0;
}

.journey-section {
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}
```

## Issue 5: Test data not showing

1. Verify you ran all SQL scripts to create tables
2. Verify you inserted sample data
3. Check Supabase dashboard → SQL Editor → Run queries to see data:
   ```sql
   SELECT * FROM invoices;
   SELECT * FROM donations;
   ```
4. Refresh your browser (Cmd/Ctrl + Shift + R for hard refresh)

## Issue 6: Environment variables not working

1. Stop your dev server (npm run dev)
2. Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=your_url_here
   VITE_SUPABASE_ANON_KEY=your_key_here
   ```
3. Restart: `npm run dev`

## How to Check Supabase Connection

1. Open browser DevTools (F12)
2. Go to Console tab
3. You should NOT see "Missing Supabase environment variables" error
4. When you load a page, you should NOT see console errors about Supabase

## Common Errors and Fixes

| Error | Fix |
|-------|-----|
| "Missing Supabase environment variables" | Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env |
| "Case not found" | Verify tables exist and have data |
| "Failed to load invoices" | Check Supabase connection and RLS policies |
| Blank home page | Check browser console for errors |

## Next Steps

1. Verify all SQL scripts ran successfully in Supabase
2. Check that your environment variables are correct
3. Hard refresh browser (Cmd/Ctrl + Shift + R)
4. Check browser console (F12) for any errors
5. Test adding a new case from Admin Dashboard
