// Mock data for invoices and donations

export type InvoiceStatus = 'pending' | 'partially_funded' | 'funded' | 'closed';

export interface CaseDonation {
  id: string;
  amount: number;
  donor_name?: string;
  date: string;
}

export interface Invoice {
  id: string;
  animal_name: string;
  animal_type: string;
  medical_condition: string;
  estimated_cost: number;
  status: InvoiceStatus;
  created_at: string;
  payment_link?: string;
  contact_info?: {
    phone?: string;
    email?: string;
  };
  invoice_file?: string;
  pet_photo?: string;
  pet_story?: string;
  instagram_link?: string;
  donations: CaseDonation[];
}

export interface Donation {
  id: string;
  amount: number;
  donor_name?: string;
  created_at: string;
}

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    animal_name: 'Max',
    animal_type: 'Dog',
    medical_condition: 'Emergency surgery',
    estimated_cost: 1500,
    status: 'partially_funded',
    created_at: '2025-01-20T10:00:00Z',
    payment_link: 'https://example-vet.com/donate/max',
    contact_info: {
      phone: '(555) 123-4567',
      email: 'rescue@animalshelter.org'
    },
    invoice_file: 'max_invoice.pdf',
    pet_photo: 'https://images.unsplash.com/photo-1637852422069-81efc85e0a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzcwNjAzNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pet_story: 'Max is a 5-year-old golden retriever who was found abandoned with a severe injury. He needs emergency surgery to save his life. Max was discovered limping on the side of the road by a Good Samaritan who immediately brought him to our rescue. Our veterinarians examined him and found that he has a severe leg fracture that requires immediate surgical intervention.',
    instagram_link: 'https://www.instagram.com/max_the_golden/',
    donations: [
      {
        id: '1',
        amount: 500,
        donor_name: 'Anonymous',
        date: '2025-01-20T12:00:00Z'
      },
      {
        id: '2',
        amount: 250,
        donor_name: 'Sarah Johnson',
        date: '2025-01-21T15:30:00Z'
      }
    ]
  },
  {
    id: '2',
    animal_name: 'Luna',
    animal_type: 'Cat',
    medical_condition: 'Dental cleaning and extractions',
    estimated_cost: 800,
    status: 'pending',
    created_at: '2025-01-21T14:30:00Z',
    payment_link: 'https://example-vet.com/donate/luna',
    contact_info: {
      phone: '(555) 123-4567',
      email: 'rescue@animalshelter.org'
    },
    invoice_file: 'luna_invoice.pdf',
    pet_photo: 'https://images.unsplash.com/photo-1670739088209-64414249354b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDcyMjI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    pet_story: 'Luna is a 3-year-old tabby cat who has been suffering from dental issues. She needs a dental cleaning and extractions to relieve her pain. Luna was surrendered to us by her previous owner who could no longer afford her medical care. She has been in discomfort for weeks, unable to eat properly due to severe dental disease.',
    instagram_link: 'https://www.instagram.com/luna_the_tabby/',
    donations: [
      {
        id: '3',
        amount: 100,
        donor_name: 'Anonymous',
        date: '2025-01-22T10:00:00Z'
      },
      {
        id: '4',
        amount: 350,
        donor_name: 'Michael Chen',
        date: '2025-01-22T14:20:00Z'
      }
    ]
  },
  {
    id: '3',
    animal_name: 'Charlie',
    animal_type: 'Dog',
    medical_condition: 'X-rays and wound treatment',
    estimated_cost: 600,
    status: 'active',
    created_at: '2025-01-22T09:15:00Z',
    payment_link: 'https://example-vet.com/donate/charlie',
    contact_info: {
      phone: '(555) 987-6543',
      email: 'info@petrescue.org'
    },
    invoice_file: 'charlie_invoice.pdf',
    pet_photo: 'https://images.unsplash.com/photo-1692713456114-798f4e1ba740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMHJldHJpZXZlciUyMGRvZ3xlbnwxfHx8fDE3NzA3MTExODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    pet_story: 'Charlie is a 4-year-old labrador retriever who was hit by a car and needs X-rays and wound treatment to recover. Charlie was found injured on the roadside and brought to our emergency clinic. He has multiple wounds that need professional treatment and X-rays to ensure there are no internal injuries.',
    instagram_link: 'https://www.instagram.com/charlie_the_labrador/',
    donations: [
      {
        id: '5',
        amount: 75,
        donor_name: 'Emily Rodriguez',
        date: '2025-01-23T09:45:00Z'
      },
      {
        id: '6',
        amount: 200,
        donor_name: 'Anonymous',
        date: '2025-01-23T16:10:00Z'
      }
    ]
  },
  {
    id: '4',
    animal_name: 'Bella',
    animal_type: 'Cat',
    medical_condition: 'Blood work and medication',
    estimated_cost: 450,
    status: 'pending',
    created_at: '2025-01-23T11:45:00Z',
    payment_link: 'https://example-vet.com/donate/bella',
    contact_info: {
      email: 'contact@animalcare.org'
    },
    invoice_file: 'bella_invoice.pdf',
    pet_photo: 'https://images.unsplash.com/photo-1768543889439-3e8f39a8b57b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwNjI0MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pet_story: 'Bella is a 2-year-old siamese cat who needs blood work and medication to manage her health condition. She was brought to us showing signs of illness and lethargy. Our veterinarians need to run comprehensive blood tests to diagnose her condition and provide the necessary medication.',
    instagram_link: 'https://www.instagram.com/bella_the_siamese/',
    donations: [
      {
        id: '7',
        amount: 150,
        donor_name: 'David Smith',
        date: '2025-01-24T11:30:00Z'
      },
      {
        id: '8',
        amount: 375,
        donor_name: 'Jessica Lee',
        date: '2025-01-24T13:15:00Z'
      }
    ]
  },
  {
    id: '5',
    animal_name: 'Rocky',
    animal_type: 'Dog',
    medical_condition: 'Spay/neuter surgery',
    estimated_cost: 350,
    status: 'funded',
    created_at: '2025-01-18T08:00:00Z',
    payment_link: 'https://example-vet.com/donate/rocky',
    contact_info: {
      phone: '(555) 123-4567'
    },
    invoice_file: 'rocky_invoice.pdf',
    pet_photo: 'https://images.unsplash.com/photo-1615233500064-caa995e2f9dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBwdXBweXxlbnwxfHx8fDE3NzA3MTE3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    pet_story: 'Rocky is a 6-month-old golden retriever puppy who needs spay/neuter surgery to improve his health and prevent future litters. This procedure is essential for Rocky\'s long-term health and will help control the pet population in our community.',
    instagram_link: 'https://www.instagram.com/rocky_the_golden/',
    donations: [
      {
        id: '9',
        amount: 350,
        donor_name: 'Michael Chen',
        date: '2025-01-22T14:20:00Z'
      }
    ]
  },
  {
    id: '6',
    animal_name: 'Whiskers',
    animal_type: 'Cat',
    medical_condition: 'Eye infection treatment',
    estimated_cost: 300,
    status: 'partially_funded',
    created_at: '2025-01-24T16:20:00Z',
    payment_link: 'https://example-vet.com/donate/whiskers',
    contact_info: {
      phone: '(555) 987-6543',
      email: 'help@strayanimalrescue.org'
    },
    invoice_file: 'whiskers_invoice.pdf',
    pet_photo: 'https://images.unsplash.com/photo-1659432608171-9da638665a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwNjY2MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    pet_story: 'Whiskers is a 1-year-old gray cat who has an eye infection that needs treatment to prevent further complications. He was found as a stray with a severe eye infection that has worsened over time. Without treatment, Whiskers could lose his sight permanently.',
    instagram_link: 'https://www.instagram.com/whiskers_the_gray/',
    donations: [
      {
        id: '10',
        amount: 100,
        donor_name: 'Anonymous',
        date: '2025-01-22T10:00:00Z'
      }
    ]
  }
];

export const mockDonations: Donation[] = [
  {
    id: '1',
    amount: 500,
    donor_name: 'Anonymous',
    created_at: '2025-01-20T12:00:00Z'
  },
  {
    id: '2',
    amount: 250,
    donor_name: 'Sarah Johnson',
    created_at: '2025-01-21T15:30:00Z'
  },
  {
    id: '3',
    amount: 100,
    donor_name: 'Anonymous',
    created_at: '2025-01-22T10:00:00Z'
  },
  {
    id: '4',
    amount: 350,
    donor_name: 'Michael Chen',
    created_at: '2025-01-22T14:20:00Z'
  },
  {
    id: '5',
    amount: 75,
    donor_name: 'Emily Rodriguez',
    created_at: '2025-01-23T09:45:00Z'
  },
  {
    id: '6',
    amount: 200,
    donor_name: 'Anonymous',
    created_at: '2025-01-23T16:10:00Z'
  },
  {
    id: '7',
    amount: 150,
    donor_name: 'David Smith',
    created_at: '2025-01-24T11:30:00Z'
  },
  {
    id: '8',
    amount: 375,
    donor_name: 'Jessica Lee',
    created_at: '2025-01-24T13:15:00Z'
  }
];