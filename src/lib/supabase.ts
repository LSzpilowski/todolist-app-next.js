import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING');
  console.error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');
  throw new Error('Missing Supabase environment variables');
}



export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Test connection and table existence
export async function testSupabaseConnection() {
  try {

    
    // Try to query with the new 'status' column to verify schema is up to date
    const { data, error } = await supabase
      .from('tasks')
      .select('id, status')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test FAILED:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      if (error.code === '42P01') {
        console.error('❌ TABLE "tasks" DOES NOT EXIST!');
        console.error('👉 Please run supabase-setup.sql in your Supabase SQL Editor');
        console.error('👉 Instructions: See SUPABASE_SETUP_INSTRUCTIONS.md');
      } else if (error.code === '42703' || error.code === 'PGRST204') {
        console.error('❌ COLUMN MISSING! Table exists but is OUTDATED!');
        console.error('👉 Please run supabase-migration.sql in your Supabase SQL Editor');
        console.error('👉 This will add the new columns (status, is_template, etc.)');
      }
      
      return false;
    }
    

    return true;
  } catch (err) {
    console.error('Supabase connection test error:', err);
    return false;
  }
}
