# Supabase Setup Guide

## What Was Done

Your project has been configured to connect to Supabase and fetch real data from your database tables instead of using mock data.

## Files Updated

1. **src/lib/supabase.ts** (NEW)
   - Initializes Supabase client with your environment variables
   - Contains helper functions to fetch/create/update/delete invoices and donations
   - Defines TypeScript types for Invoice and Donation data

2. **package.json**
   - Added `@supabase/supabase-js` dependency for database connection

3. **src/components/Home.tsx**
   - Now fetches invoices from Supabase instead of mock data
   - Uses `useEffect` to load data when component mounts
   - Shows "Loading campaigns..." message while fetching

4. **src/App.tsx**
   - Manages invoice data at the app level
   - Refreshes data when you add or edit a case in admin

## Environment Variables

Your `.env` file already has the required variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## What You Need to Do

### 1. Install Dependencies
Run this command in your terminal:
```bash
npm install
```

or if using pnpm:
```bash
pnpm install
```

### 2. Make Sure Your Database Tables Exist
Follow the SQL setup scripts from the previous guide to create:
- `invoices` table
- `donations` table
- `users` table (for admin, optional)

### 3. Start the Development Server
```bash
npm run dev
```

or:
```bash
pnpm dev
```

### 4. Test the Connection
- Go to http://localhost:5173
- You should see your campaigns loading from Supabase
- If you see "Loading campaigns..." it's working
- If you get an error, check browser console for details

## Next Steps (Optional Enhancements)

### Add Admin Authentication
Update AdminDashboard to require login before allowing edits.

### Add Stripe Donations
Integrate Stripe to accept real donations instead of just tracking them.

### Update Other Components
The following components still use mock data and need updating:
- `AdminDashboard.tsx` - needs to fetch invoices from Supabase
- `PetDetail.tsx` - can use data passed from parent
- `AddNewCase.tsx` - needs to use `createInvoice()` function
- `EditCase.tsx` - needs to use `updateInvoice()` function

## Troubleshooting

### "Missing Supabase environment variables"
- Check that your `.env` file exists in the project root
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart your dev server after adding environment variables

### "Table 'invoices' does not exist"
- Make sure you ran all the SQL setup scripts in Supabase
- Check that you're connected to the correct Supabase project

### No campaigns showing up
- Check the browser console (F12 → Console tab) for error messages
- Verify that you have data in your `invoices` table in Supabase
- Make sure the donations are properly linked to invoices

## Database Structure

### invoices table columns:
- `id` (UUID) - Unique identifier
- `animal_name` (string) - Name of the animal
- `animal_type` (string) - Type (dog, cat, etc.)
- `medical_condition` (string) - What they need treatment for
- `estimated_cost` (decimal) - How much the treatment costs
- `status` (string) - pending, partially_funded, funded, active, closed
- `created_at` (timestamp) - When the case was created
- `email` (string) - Contact email
- `phone` (string) - Contact phone
- `pet_photo` (string) - URL to pet's photo
- `pet_story` (string) - Story about the pet
- `instagram_link` (string) - Instagram profile link

### donations table columns:
- `id` (UUID) - Unique identifier
- `invoice_id` (UUID) - Links to the invoices table
- `amount` (decimal) - Donation amount
- `donor_name` (string) - Name of person who donated
- `created_at` (timestamp) - When donation was made
- `stripe_transaction_id` (string) - For future Stripe integration
