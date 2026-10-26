import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { EVENTS_DATA } from '../data/events';

function mapEventRow(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    status: row.status,
    date: row.date,
    time: row.time,
    location: row.location,
    description: row.description,
    image: row.image_url || row.image,
    image_url: row.image_url || row.image,
    tags: Array.isArray(row.tags) ? row.tags : typeof row.tags === 'string' ? [row.tags] : [],
    featured: Boolean(row.featured),
    registrationUrl: row.registration_url || row.registrationUrl || null,
    registration_url: row.registration_url || row.registrationUrl || null,
  };
}

export async function fetchEvents({ category = 'All', status = 'All', searchQuery = '' } = {}) {
  let list = [];

  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('events').select('*').order('created_at', { ascending: false });

      if (category && category !== 'All') {
        query = query.ilike('category', category);
      }

      if (status && status !== 'All') {
        query = query.ilike('status', status);
      }

      const { data, error } = await query;
      if (!error && data) {
        list = data.map(mapEventRow);
      } else if (error) {
        console.warn('Error fetching events from Supabase, falling back to local data', error);
        list = EVENTS_DATA.map(mapEventRow);
      }
    } catch (err) {
      console.warn('Supabase fetchEvents exception', err);
      list = EVENTS_DATA.map(mapEventRow);
    }
  } else {
    list = EVENTS_DATA.map(mapEventRow);
  }

  // Fallback filtering if local fallback used
  if (category && category !== 'All') {
    list = list.filter(evt => (evt.category || '').toLowerCase() === category.toLowerCase());
  }
  if (status && status !== 'All') {
    list = list.filter(evt => (evt.status || '').toLowerCase() === status.toLowerCase());
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(evt => 
      (evt.title || '').toLowerCase().includes(q) ||
      (evt.description || '').toLowerCase().includes(q) ||
      (evt.location || '').toLowerCase().includes(q) ||
      (evt.tags || []).some(tag => (tag || '').toLowerCase().includes(q))
    );
  }

  return list;
}

export async function fetchFeaturedEvents() {
  const events = await fetchEvents();
  const featured = events.filter(evt => evt.featured);
  return featured.length > 0 ? featured : events.slice(0, 3);
}

export async function fetchEventById(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('events').select('*').eq('id', id).maybeSingle();
      if (!error && data) {
        return mapEventRow(data);
      }
    } catch (e) {
      console.warn('Error in fetchEventById', e);
    }
  }
  const fallback = EVENTS_DATA.find(evt => evt.id === id);
  return fallback ? mapEventRow(fallback) : null;
}
