import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// console.log('Supabase URL:', supabaseUrl); // Verify URL
// console.log('Supabase Anon Key:', supabaseAnonKey); // Verify Anon Key

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anonymous key');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// console.log('Supabase Client:', supabase); // Verify Supabase client instance

export default supabase;
