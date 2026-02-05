-- Create cases table
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_name TEXT NOT NULL,
  animal_type TEXT NOT NULL,
  medical_condition TEXT NOT NULL,
  estimated_cost DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  payment_link TEXT,
  invoice_file TEXT,
  pet_photo TEXT,
  pet_story TEXT,
  instagram_link TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  contact_organization TEXT
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  donor_name TEXT,
  donor_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_donations_case_id ON donations(case_id);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at);

-- Insert sample data
INSERT INTO cases (animal_name, animal_type, medical_condition, estimated_cost, status, payment_link, pet_photo, pet_story, instagram_link, contact_email, contact_organization)
VALUES
  ('Max', 'Dog', 'Emergency surgery', 1500, 'partially_funded', 'https://example-vet.com/donate/max', 'max.jpg', 'Max is a 5-year-old golden retriever who was found abandoned with a severe injury. He needs emergency surgery to save his life.', 'https://www.instagram.com/max_the_golden/', 'rescue@animalshelter.org', 'Animal Shelter'),
  ('Luna', 'Cat', 'Dental cleaning and extractions', 800, 'pending', 'https://example-vet.com/donate/luna', 'luna.jpg', 'Luna is a 3-year-old tabby cat who has been suffering from dental issues. She needs a dental cleaning and extractions to relieve her pain.', 'https://www.instagram.com/luna_the_tabby/', 'rescue@animalshelter.org', 'Animal Shelter'),
  ('Charlie', 'Dog', 'X-rays and wound treatment', 600, 'pending', 'https://example-vet.com/donate/charlie', 'charlie.jpg', 'Charlie is a 4-year-old labrador retriever who was hit by a car and needs X-rays and wound treatment to recover.', 'https://www.instagram.com/charlie_the_labrador/', 'info@petrescue.org', 'Pet Rescue'),
  ('Bella', 'Cat', 'Blood work and medication', 450, 'pending', 'https://example-vet.com/donate/bella', 'bella.jpg', 'Bella is a 2-year-old siamese cat who needs blood work and medication to manage her health condition.', 'https://www.instagram.com/bella_the_siamese/', 'contact@animalcare.org', 'Animal Care'),
  ('Rocky', 'Dog', 'Spay/neuter surgery', 350, 'funded', 'https://example-vet.com/donate/rocky', 'rocky.jpg', 'Rocky is a 6-year-old golden retriever who needs spay/neuter surgery to improve his health and prevent future litters.', 'https://www.instagram.com/rocky_the_golden/', 'rescue@animalshelter.org', 'Animal Shelter'),
  ('Whiskers', 'Cat', 'Eye infection treatment', 300, 'partially_funded', 'https://example-vet.com/donate/whiskers', 'whiskers.jpg', 'Whiskers is a 1-year-old siamese cat who has an eye infection that needs treatment to prevent further complications.', 'https://www.instagram.com/whiskers_the_siamese/', 'help@strayanimalrescue.org', 'Stray Animal Rescue');

-- Insert sample donations
INSERT INTO donations (case_id, amount, donor_name, created_at)
SELECT c.id, 500, 'Anonymous', NOW() FROM cases c WHERE c.animal_name = 'Max'
UNION ALL
SELECT c.id, 250, 'Sarah Johnson', NOW() FROM cases c WHERE c.animal_name = 'Max'
UNION ALL
SELECT c.id, 100, 'Anonymous', NOW() FROM cases c WHERE c.animal_name = 'Luna'
UNION ALL
SELECT c.id, 350, 'Michael Chen', NOW() FROM cases c WHERE c.animal_name = 'Luna'
UNION ALL
SELECT c.id, 75, 'Emily Rodriguez', NOW() FROM cases c WHERE c.animal_name = 'Charlie'
UNION ALL
SELECT c.id, 200, 'Anonymous', NOW() FROM cases c WHERE c.animal_name = 'Charlie'
UNION ALL
SELECT c.id, 150, 'David Smith', NOW() FROM cases c WHERE c.animal_name = 'Bella'
UNION ALL
SELECT c.id, 375, 'Jessica Lee', NOW() FROM cases c WHERE c.animal_name = 'Bella'
UNION ALL
SELECT c.id, 350, 'Michael Chen', NOW() FROM cases c WHERE c.animal_name = 'Rocky'
UNION ALL
SELECT c.id, 100, 'Anonymous', NOW() FROM cases c WHERE c.animal_name = 'Whiskers';
