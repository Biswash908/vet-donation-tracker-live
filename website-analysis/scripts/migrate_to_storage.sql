-- Migration: Update pet_photo and invoice_file columns to store file paths instead of base64
-- This allows us to use Supabase Storage for file uploads
-- PostgreSQL syntax for Supabase

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
