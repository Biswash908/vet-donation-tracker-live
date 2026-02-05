import { supabase } from './supabase';

export type Case = {
  id: string;
  animal_name: string;
  animal_type: string;
  medical_condition: string;
  estimated_cost: number;
  status: 'pending' | 'partially_funded' | 'funded' | 'closed';
  created_at: string;
  payment_link: string;
  invoice_file?: string;
  pet_photo?: string;
  pet_story?: string;
  instagram_link?: string;
};

export type Donation = {
  id: string;
  case_id: string;
  amount: number;
  donor_name: string;
  date: string;
};

// Fetch all cases
export async function fetchCases() {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: (data || []) as Case[], error: null };
  } catch (error) {
    console.error('Error fetching cases:', error);
    return { data: [], error };
  }
}

// Fetch all cases with total donations calculated
export async function fetchCasesWithDonations() {
  try {
    const { data: cases, error: casesError } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (casesError) throw casesError;

    // For each case, fetch donations and calculate total
    const casesWithTotals = await Promise.all(
      (cases || []).map(async (c) => {
        const { data: donations } = await supabase
          .from('donations')
          .select('*')
          .eq('case_id', c.id);

        const total_paid = (donations || []).reduce((sum, d) => sum + d.amount, 0);
        return {
          ...c,
          total_paid,
          donations: donations || []
        };
      })
    );

    return { data: casesWithTotals, error: null };
  } catch (error) {
    console.error('Error fetching cases with donations:', error);
    return { data: [], error };
  }
}

// Fetch case with donations
export async function fetchCaseWithDonations(caseId: string) {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*, donations(*)')
      .eq('id', caseId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching case:', error);
    return { data: null, error };
  }
}

// Fetch all donations for a case
export async function fetchDonations(caseId: string) {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('case_id', caseId)
      .order('date', { ascending: false });

    if (error) throw error;
    return { data: (data || []) as Donation[], error: null };
  } catch (error) {
    console.error('Error fetching donations:', error);
    return { data: [], error };
  }
}

// Add new case
export async function addCase(caseData: Omit<Case, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('cases')
      .insert([{ ...caseData, created_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding case:', error);
    return { data: null, error };
  }
}

// Update case
export async function updateCase(caseId: string, updates: Partial<Case>) {
  try {
    const { data, error } = await supabase
      .from('cases')
      .update(updates)
      .eq('id', caseId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating case:', error);
    return { data: null, error };
  }
}

// Add donation
export async function addDonation(caseId: string, donation: Omit<Donation, 'id' | 'case_id'>) {
  try {
    const { data, error } = await supabase
      .from('donations')
      .insert([{ ...donation, case_id: caseId }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding donation:', error);
    return { data: null, error };
  }
}

// Get total donations for a case
export async function getTotalDonations(caseId: string) {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('amount')
      .eq('case_id', caseId);

    if (error) throw error;
    const total = (data || []).reduce((sum, d) => sum + d.amount, 0);
    return { total, error: null };
  } catch (error) {
    console.error('Error calculating total donations:', error);
    return { total: 0, error };
  }
}
