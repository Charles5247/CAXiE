import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const key =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  '';

const looksValidUrl =
  typeof url === 'string' && /^https?:\/\//.test(url) && !/your_supabase_url_here/i.test(url);
const looksValidKey =
  typeof key === 'string' && key.length > 20 && !/your_supabase_anon_key_here/i.test(key);

/**
 * Returns a Supabase client for server-side use (RSC / route handlers),
 * or null if the environment is not configured.
 */
export function createServerClient() {
  if (!looksValidUrl || !looksValidKey) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export { looksValidUrl as isSupabaseConfigured };
