# Database Tables - What Changes

## The Core Change

Your original table definition had these columns storing **binary data** (broken for image display):

```sql
pet_photo BYTEA,
invoice_file BYTEA
```

**You need to change them to store URLs** (text strings):

```sql
pet_photo VARCHAR(500),
invoice_file VARCHAR(500)
```

---

## Original SQL (From Your Pasted Text)

```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_name VARCHAR(255) NOT NULL,
  animal_type VARCHAR(100) NOT NULL DEFAULT 'Unknown',
  medical_condition TEXT NOT NULL,
  estimated_cost DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'partially_funded', 'funded', 'active', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_link VARCHAR(500),
  pet_photo BYTEA,                    ← ❌ CHANGE THIS
  pet_story TEXT,
  instagram_link VARCHAR(500),
  invoice_file BYTEA                  ← ❌ CHANGE THIS
);

CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  donor_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_transaction_id VARCHAR(255)
);
```

---

## Updated SQL (What You Need Now)

```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_name VARCHAR(255) NOT NULL,
  animal_type VARCHAR(100) NOT NULL DEFAULT 'Unknown',
  medical_condition TEXT NOT NULL,
  estimated_cost DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'partially_funded', 'funded', 'active', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_link VARCHAR(500),
  pet_photo VARCHAR(500),             ← ✅ CHANGED
  pet_story TEXT,
  instagram_link VARCHAR(500),
  invoice_file VARCHAR(500)           ← ✅ CHANGED
);

CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  donor_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_transaction_id VARCHAR(255)
);
```

---

## The Differences Explained

| Column | Original | New | Why |
|--------|----------|-----|-----|
| `pet_photo` | `BYTEA` | `VARCHAR(500)` | BYTEA stores huge binary data. VARCHAR(500) stores a URL string like `https://abc.supabase.co/...photo.jpg` |
| `invoice_file` | `BYTEA` | `VARCHAR(500)` | Same as above - stores file URL instead of binary |
| Everything else | No change | No change | All other columns remain exactly the same |

---

## How to Apply This Change

### Quick: Run the migration SQL

Open `SQL_TO_RUN.txt` in your project and copy that SQL into Supabase SQL Editor. This does all the changes automatically.

### Manual: If you want to recreate from scratch

1. Delete the old `invoices` and `donations` tables
2. Run the updated CREATE TABLE statements shown above

---

## What Data Gets Affected

### Deleted (these were broken anyway):
- Any existing `pet_photo` BYTEA data → **Deleted** (it was base64 strings)
- Any existing `invoice_file` BYTEA data → **Deleted** (it was base64 strings)

### Preserved (stays the same):
- ✅ All animal names, types, conditions
- ✅ All estimated costs
- ✅ All donation amounts and donor names
- ✅ All timestamps
- ✅ All payment links
- ✅ All pet stories
- ✅ All Instagram links
- ✅ All Stripe transaction IDs

### Added (new capability):
- ✅ Can now store real Supabase Storage URLs for photos
- ✅ Photos will actually display!

---

## Example Data After Migration

### invoices table (before - broken):
```
animal_name  | pet_photo
─────────────┼──────────────────────────────────────────────────────
Whiskers     | data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA...
Fluffy       | NULL
Shadow       | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
```
(Huge binary strings - don't display)

### invoices table (after - works!):
```
animal_name  | pet_photo
─────────────┼──────────────────────────────────────────────────────
Whiskers     | https://abc123.supabase.co/storage/v1/object/public/pet-images/photo.jpg
Fluffy       | NULL
Shadow       | https://abc123.supabase.co/storage/v1/object/public/pet-images/shadow.png
```
(Clean URLs - display perfectly!)

---

## Files You Need to Know About

1. **SQL_TO_RUN.txt** ← Copy this SQL and run it in Supabase
2. **DATABASE_MIGRATION_GUIDE.md** ← Detailed step-by-step guide
3. **scripts/migrate_to_storage.sql** ← The migration file in your project

---

## Done? What's Next

After you run the SQL migration:

1. ✅ Database schema is updated
2. → Follow STORAGE_SETUP.md to create Storage buckets
3. → Test uploading a photo
4. → Photos display everywhere!

All your code is already updated. This SQL is the only database change needed.
