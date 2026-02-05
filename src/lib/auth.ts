import { supabase } from './supabase';

export async function loginAdmin(email: string, password: string) {
  try {
    console.log("[v0] Attempting login with email:", email);
    
    // Query the admin_users table
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    console.log("[v0] Query result - Error:", error);
    console.log("[v0] Query result - Data:", data);

    if (error || !data) {
      console.log("[v0] User not found or query error");
      return { success: false, message: 'Invalid email or password' };
    }

    console.log("[v0] User found. Checking password...");
    console.log("[v0] Stored password_hash:", data.password_hash);
    console.log("[v0] Provided password:", password);

    // Simple password comparison (in production, use bcrypt)
    if (data.password_hash !== password) {
      console.log("[v0] Password mismatch");
      return { success: false, message: 'Invalid email or password' };
    }

    console.log("[v0] Login successful!");

    // Store session in localStorage
    localStorage.setItem('adminSession', JSON.stringify({
      id: data.id,
      email: data.email,
      loginTime: new Date().toISOString()
    }));

    return { success: true, message: 'Login successful' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred during login' };
  }
}

export function logoutAdmin() {
  localStorage.removeItem('adminSession');
}

export function getAdminSession() {
  const session = localStorage.getItem('adminSession');
  return session ? JSON.parse(session) : null;
}

export function isAdminLoggedIn() {
  return !!getAdminSession();
}
