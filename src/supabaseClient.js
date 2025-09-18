import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;

const looksValidUrl = typeof url === 'string' && /^https?:\/\//.test(url) && !/your_supabase_url_here/i.test(url);
const looksValidKey = typeof key === 'string' && key.length > 20 && !/your_supabase_anon_key_here/i.test(key);

let supabase;

if (!looksValidUrl || !looksValidKey) {
	// eslint-disable-next-line no-console
	console.warn('[supabase] Missing/invalid env. Using mock client so UI can render.');

	const promise = (data) => Promise.resolve({ data, error: null });
	const single = () => promise(null);

	const makeThenable = (data) => ({
		// allow `await ...eq(...)` or `await ...order(...)`
		then: (resolve) => resolve({ data, error: null }),
		catch: () => {},
		finally: (f) => { try { f(); } catch {} },
		single,
		order: () => makeThenable([]),
		limit: () => promise([]),
	});

	const tableApi = {
		select: () => tableApi,
		insert: () => promise(null),
		upsert: () => promise(null),
		eq: () => makeThenable([]),
		single,
		order: () => makeThenable([]),
		limit: () => promise([]),
	};

	supabase = { from: () => tableApi };
} else {
	supabase = createClient(url, key);
	// eslint-disable-next-line no-console
	console.log('[supabase] Supabase client initialized.');
}

export { supabase };
export default supabase;
