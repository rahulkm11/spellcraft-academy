import { supabase } from '@/integrations/supabase/client';

async function hashName(name: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(name.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

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
    const hashedName = await hashName(params.player_name);
    await supabase.functions.invoke('track-event', {
      body: { ...params, player_name: hashedName },
    });
  } catch (err) {
    console.error('Analytics tracking error:', err);
  }
}
