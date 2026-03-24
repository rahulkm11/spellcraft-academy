import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Simple in-memory rate limiter (per-instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 30 // max requests per window
const RATE_WINDOW_MS = 60_000 // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

// Allowed event types
const ALLOWED_EVENTS = new Set(['session_start', 'spell_completed', 'spell_rated'])

function validateInput(body: Record<string, unknown>): string | null {
  const { event_type, player_name, spell_id, book_index, rating, scenarios_completed, session_duration_seconds } = body

  if (!event_type || !player_name) return 'event_type and player_name required'
  if (typeof event_type !== 'string' || !ALLOWED_EVENTS.has(event_type)) return 'Invalid event_type'
  if (typeof player_name !== 'string' || player_name.length > 128) return 'Invalid player_name'
  if (spell_id !== undefined && spell_id !== null && (typeof spell_id !== 'string' || spell_id.length > 100)) return 'Invalid spell_id'
  if (book_index !== undefined && book_index !== null && (typeof book_index !== 'number' || book_index < 0 || book_index > 20)) return 'Invalid book_index'
  if (rating !== undefined && rating !== null && (typeof rating !== 'number' || rating < 1 || rating > 5)) return 'Invalid rating'
  if (scenarios_completed !== undefined && scenarios_completed !== null && (typeof scenarios_completed !== 'number' || scenarios_completed < 0 || scenarios_completed > 10)) return 'Invalid scenarios_completed'
  if (session_duration_seconds !== undefined && session_duration_seconds !== null && (typeof session_duration_seconds !== 'number' || session_duration_seconds < 0 || session_duration_seconds > 86400)) return 'Invalid session_duration_seconds'

  return null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Rate limiting by IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }), {
        status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const body = await req.json()

    // Validate input
    const validationError = validateInput(body)
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { event_type, player_name, spell_id, book_index, rating, scenarios_completed, session_duration_seconds } = body

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { error } = await supabase.from('analytics_events').insert({
      event_type,
      player_name,
      spell_id: spell_id || null,
      book_index: book_index ?? null,
      rating: rating ?? null,
      scenarios_completed: scenarios_completed ?? null,
      session_duration_seconds: session_duration_seconds ?? null,
    })

    if (error) {
      console.error('Insert error:', error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
