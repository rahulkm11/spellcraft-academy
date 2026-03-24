import { supabase } from '@/integrations/supabase/client';

interface TrackEventParams {
  event_type: 'session_start' | 'spell_completed' | 'spell_rated';
  player_name: string;
  spell_id?: string;
  book_index?: number;
  rating?: number;
  scenarios_completed?: number;
  session_duration_seconds?: number;
}

export async function trackEvent(params: TrackEventParams) {
  try {
    await supabase.functions.invoke('track-event', {
      body: params,
    });
  } catch (err) {
    console.error('Analytics tracking error:', err);
  }
}
