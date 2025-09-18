import { supabase } from '../supabaseClient';

// Get visit statistics from Supabase
export const getVisitStats = async () => {
  try {
    // Get visits count (this should work)
    const visitsResult = await supabase.from('visits').select('visit_count').single();
    
    // Try to get daily visits and locations (these might not exist yet)
    let dailyResult = { data: [] };
    let locationsResult = { data: [] };
    
    try {
      dailyResult = await supabase.from('daily_visits').select('*').order('date', { ascending: false }).limit(30);
    } catch (error) {
      console.log('Daily visits table not available:', error.message);
    }
    
    try {
      locationsResult = await supabase.from('visitor_locations').select('*').order('created_at', { ascending: false }).limit(20);
    } catch (error) {
      console.log('Visitor locations table not available:', error.message);
    }

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