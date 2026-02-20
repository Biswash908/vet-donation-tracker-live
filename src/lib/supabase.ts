import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions
export interface Invoice {
  id: string;
  animal_name: string;
  animal_type: string;
  medical_condition: string;
  estimated_cost: number;
  status: 'pending' | 'partially_funded' | 'funded' | 'active' | 'closed';
  created_at: string;
  updated_at?: string;
  payment_link?: string;
  phone?: string;
  email?: string;
  invoice_file?: string;
  pet_photo?: string;
  pet_story?: string;
  instagram_link?: string;
  donations?: Donation[];
}

export interface Donation {
  id: string;
  invoice_id: string;
  amount: number;
  donor_name?: string;
  created_at: string;
  stripe_transaction_id?: string;
}

// Helper functions
export async function fetchInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      donations (
        id,
        invoice_id,
        amount,
        donor_name,
        created_at,
        stripe_transaction_id
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }

  return data || [];
}

export async function fetchInvoiceById(id: string): Promise<Invoice | null> {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      donations (
        id,
        invoice_id,
        amount,
        donor_name,
        created_at,
        stripe_transaction_id
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching invoice:', error);
    return null;
  }

  console.log('[v0] Fetched invoice data:', data);
  if (data?.invoice_file) {
    console.log('[v0] Invoice file raw:', data.invoice_file);
  }

  return data;
}

export async function createInvoice(invoice: Omit<Invoice, 'id' | 'created_at'>): Promise<Invoice | null> {
  const { data, error } = await supabase
    .from('invoices')
    .insert([invoice])
    .select()
    .single();

  if (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }

  return data;
}

export async function updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | null> {
  console.log('[v0] Updating invoice with:', updates);
  if (updates.invoice_file) {
    console.log('[v0] Invoice file to save (length:', updates.invoice_file.length, '):', updates.invoice_file);
  }
  
  const { data, error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }

  console.log('[v0] Updated invoice returned from DB:', data);
  if (data?.invoice_file) {
    console.log('[v0] Returned invoice_file (length:', data.invoice_file.length, '):', data.invoice_file);
  }

  return data;
}

export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting invoice:', error);
    throw error;
  }
}

export async function addDonation(invoiceId: string, donation: Omit<Donation, 'id' | 'created_at' | 'invoice_id'>): Promise<Donation | null> {
  const { data, error } = await supabase
    .from('donations')
    .insert([{ invoice_id: invoiceId, ...donation }])
    .select()
    .single();

  if (error) {
    console.error('Error adding donation:', error);
    throw error;
  }

  return data;
}

export async function deleteDonation(donationId: string): Promise<void> {
  const { error } = await supabase
    .from('donations')
    .delete()
    .eq('id', donationId);

  if (error) {
    console.error('Error deleting donation:', error);
    throw error;
  }
}

// Helper function to upload file to Supabase Storage
export const uploadFileToStorage = async (
  file: File,
  bucket: string,
  path: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

    // Return the public URL
    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl.publicUrl;
  } catch (error) {
    console.error('Error in uploadFileToStorage:', error);
    return null;
  }
};
