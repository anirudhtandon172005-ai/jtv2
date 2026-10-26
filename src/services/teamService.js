import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { team as fallbackTeam } from '../data/team';

export async function fetchTeam() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('team')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          ...item,
          photo: item.photo_url || item.photo,
        }));
      }
      if (error) {
        console.warn('Supabase fetchTeam failed, falling back to local data', error);
      }
    } catch (err) {
      console.warn('Supabase connection error in fetchTeam', err);
    }
  }

  return fallbackTeam;
}
