import { createClient } from '@supabase/supabase-js';

// Provide fallback values for static build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Create client but don't throw error during build
const createSupabaseClient = () => {
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Supabase client creation failed:', error);
    // Return a mock client for build time
    return {
      from: () => ({ select: () => Promise.resolve({ data: [], error: null }), insert: () => Promise.resolve({ data: null, error: null }), order: () => ({ select: () => Promise.resolve({ data: [], error: null }) }) }),
    } as any;
  }
};

export const supabase = createSupabaseClient();
