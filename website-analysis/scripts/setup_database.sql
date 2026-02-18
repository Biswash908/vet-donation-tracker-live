-- Drop existing tables (fresh start)
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;

-- Create invoices table
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
  pet_photo VARCHAR(500),
  pet_story TEXT,
  instagram_link VARCHAR(500),
  invoice_file VARCHAR(500)
);

-- Create indexes on invoices
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_created_at ON invoices(created_at DESC);

-- Create donations table
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  donor_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_transaction_id VARCHAR(255)
);

-- Create indexes on donations
CREATE INDEX idx_donations_invoice_id ON donations(invoice_id);
CREATE INDEX idx_donations_created_at ON donations(created_at DESC);

-- Insert seed data
INSERT INTO invoices (animal_name, animal_type, medical_condition, estimated_cost, status, pet_photo, pet_story, instagram_link) VALUES
('Max', 'Dog', 'Emergency surgery', 1500.00, 'partially_funded', 'https://images.unsplash.com/photo-1637852422069-81efc85e0a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzcwNjAzNjU4fDA&ixlib=rb-4.0.0&q=80&w=1080', 'Max is a 5-year-old golden retriever found with a severe injury', 'https://www.instagram.com/max_the_golden/'),
('Luna', 'Cat', 'Dental cleaning', 800.00, 'pending', 'https://images.unsplash.com/photo-1670739088209-64414249354b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDcyMjI3OHww&ixlib=rb-4.0.0&q=80&w=1080', 'Luna is a tabby cat with dental issues', 'https://www.instagram.com/luna_the_tabby/'),
('Charlie', 'Dog', 'X-rays and treatment', 600.00, 'active', 'https://images.unsplash.com/photo-1692713456114-798f4e1ba740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMHJldHJpZXZlciUyMGRvZ3xlbnwxfHx8fDE3NzA3MTExODN8MA&ixlib=rb-4.0.0&q=80&w=1080', 'Charlie was hit by a car and needs treatment', 'https://www.instagram.com/charlie_the_labrador/');

-- Insert seed donations
INSERT INTO donations (invoice_id, amount, donor_name) VALUES
((SELECT id FROM invoices WHERE animal_name = 'Max'), 500.00, 'Anonymous'),
((SELECT id FROM invoices WHERE animal_name = 'Max'), 250.00, 'Sarah Johnson'),
((SELECT id FROM invoices WHERE animal_name = 'Luna'), 100.00, 'Anonymous'),
((SELECT id FROM invoices WHERE animal_name = 'Charlie'), 200.00, 'Michael Chen');
