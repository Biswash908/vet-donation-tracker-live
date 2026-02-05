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
    pet_photo: 'max.jpg',
    pet_story: 'Max is a 5-year-old golden retriever who was found abandoned with a severe injury. He needs emergency surgery to save his life.',
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
    pet_photo: 'luna.jpg',
    pet_story: 'Luna is a 3-year-old tabby cat who has been suffering from dental issues. She needs a dental cleaning and extractions to relieve her pain.',
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
    pet_photo: 'charlie.jpg',
    pet_story: 'Charlie is a 4-year-old labrador retriever who was hit by a car and needs X-rays and wound treatment to recover.',
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
    pet_photo: 'bella.jpg',
    pet_story: 'Bella is a 2-year-old siamese cat who needs blood work and medication to manage her health condition.',
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
    pet_photo: 'rocky.jpg',
    pet_story: 'Rocky is a 6-year-old golden retriever who needs spay/neuter surgery to improve his health and prevent future litters.',
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
    pet_photo: 'whiskers.jpg',
    pet_story: 'Whiskers is a 1-year-old siamese cat who has an eye infection that needs treatment to prevent further complications.',
    instagram_link: 'https://www.instagram.com/whiskers_the_siamese/',
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
