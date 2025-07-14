import { supabase } from '../supabaseClient';

// Use the actual UUID for the visits table row
const VISIT_ROW_ID = '2df0056c-871d-451f-965a-338c6b030731';

// Get visitor IP (simplified version)
const getVisitorIP = () => {
  return 'unknown';
};

// Track a visit
export const trackVisit = async () => {
  try {
    // Check if Supabase is configured
    if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY) {
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const ip = getVisitorIP();

    // Update total visits count
    const { data: visitsData, error: visitsError } = await supabase
      .from('visits')
      .select('id, visit_count')
      .eq('id', VISIT_ROW_ID)
      .single();

    if (visitsError && visitsError.code !== 'PGRST116') {
      console.error('Error fetching visits:', visitsError);
      return;
    }

    const currentCount = visitsData?.visit_count || 0;
    const newCount = currentCount + 1;

    // Update or insert visits record (always use the UUID)
    const { error: updateError } = await supabase
      .from('visits')
      .upsert({ id: VISIT_ROW_ID, visit_count: newCount }, { onConflict: 'id' });

    if (updateError) {
      console.error('Error updating visits:', updateError);
      return;
    }

    // Update daily visits (if table exists)
    try {
      // First, try to get existing daily visit count for today
      const { data: existingDaily, error: fetchError } = await supabase
        .from('daily_visits')
        .select('count')
        .eq('date', today)
        .single();

      let dailyCount = 1; // Default to 1 if no existing record
      
      if (!fetchError && existingDaily) {
        dailyCount = (existingDaily.count || 0) + 1;
      }

      // Upsert daily visits with correct count
      const { error: dailyError } = await supabase
        .from('daily_visits')
        .upsert(
          { date: today, count: dailyCount },
          { onConflict: 'date' }
        );

      if (dailyError) {
        console.error('Error updating daily visits:', dailyError);
      }
    } catch (error) {
      // Silent fail for missing daily_visits table
    }

    // Add visitor location (if table exists)
    try {
      const { error: locationError } = await supabase
        .from('visitor_locations')
        .insert({
          ip,
          date: today,
          note: 'Local/Private IP'
        });

      if (locationError) {
        console.error('Error adding visitor location:', locationError);
      }
    } catch (error) {
      // Silent fail for missing visitor_locations table
    }
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
};

// Get visit statistics
export const getVisitStats = async () => {
  try {
    // Get visits count (this should work)
    const visitsResult = await supabase.from('visits').select('visit_count').eq('id', VISIT_ROW_ID).single();
    
    // Try to get daily visits and locations (these might not exist yet)
    let dailyResult = { data: [] };
    let locationsResult = { data: [] };
    
    try {
      dailyResult = await supabase.from('daily_visits').select('*').order('date', { ascending: false }).limit(30);
    } catch (error) {}
    
    try {
      locationsResult = await supabase.from('visitor_locations').select('*').order('created_at', { ascending: false }).limit(20);
    } catch (error) {}

    return {
      totalVisits: visitsResult.data?.visit_count || 0,
      dailyVisits: dailyResult.data || [],
      visitorLocations: locationsResult.data || []
    };
  } catch (error) {
    console.error('Error fetching visit stats:', error);
    return {
      totalVisits: 0,
      dailyVisits: [],
      visitorLocations: []
    };
  }
}; 