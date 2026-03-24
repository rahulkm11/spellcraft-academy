import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const token = url.searchParams.get('token')

    if (token !== 'spellpassword123') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const startDate = url.searchParams.get('startDate') || '2020-01-01'
    const endDate = url.searchParams.get('endDate') || '2099-12-31'

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Get all events in date range
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate + 'T23:59:59.999Z')
      .order('created_at', { ascending: false })
      .limit(10000)

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const allEvents = events || []

    // Aggregate metrics
    const uniquePlayers = new Set(allEvents.map(e => e.player_name)).size
    const spellCompletions = allEvents.filter(e => e.event_type === 'spell_completed')
    const ratings = allEvents.filter(e => e.event_type === 'spell_rated' && e.rating)
    const totalSpellsPlayed = spellCompletions.length
    const avgRating = ratings.length > 0 ? ratings.reduce((s, r) => s + (r.rating || 0), 0) / ratings.length : 0
    const totalTime = allEvents
      .filter(e => e.session_duration_seconds)
      .reduce((s, e) => s + (e.session_duration_seconds || 0), 0)

    // Spells by book
    const byBook: Record<number, number> = {}
    spellCompletions.forEach(e => {
      const b = e.book_index ?? 0
      byBook[b] = (byBook[b] || 0) + 1
    })

    // Rating distribution
    const ratingDist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    ratings.forEach(e => {
      const r = e.rating || 0
      if (r >= 1 && r <= 5) ratingDist[r]++
    })

    // Top players
    const playerMap: Record<string, { spells: number; totalRating: number; ratingCount: number }> = {}
    allEvents.forEach(e => {
      if (!playerMap[e.player_name]) playerMap[e.player_name] = { spells: 0, totalRating: 0, ratingCount: 0 }
      if (e.event_type === 'spell_completed') playerMap[e.player_name].spells++
      if (e.event_type === 'spell_rated' && e.rating) {
        playerMap[e.player_name].totalRating += e.rating
        playerMap[e.player_name].ratingCount++
      }
    })
    const topPlayers = Object.entries(playerMap)
      .map(([name, d]) => ({ name, spells: d.spells, avgRating: d.ratingCount > 0 ? d.totalRating / d.ratingCount : 0 }))
      .sort((a, b) => b.spells - a.spells)
      .slice(0, 10)

    // Top spells
    const spellMap: Record<string, { count: number; totalRating: number; ratingCount: number }> = {}
    allEvents.forEach(e => {
      if (!e.spell_id) return
      if (!spellMap[e.spell_id]) spellMap[e.spell_id] = { count: 0, totalRating: 0, ratingCount: 0 }
      if (e.event_type === 'spell_completed') spellMap[e.spell_id].count++
      if (e.event_type === 'spell_rated' && e.rating) {
        spellMap[e.spell_id].totalRating += e.rating
        spellMap[e.spell_id].ratingCount++
      }
    })
    const topSpells = Object.entries(spellMap)
      .map(([id, d]) => ({ spellId: id, count: d.count, avgRating: d.ratingCount > 0 ? d.totalRating / d.ratingCount : 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Recent activity
    const recentActivity = allEvents.slice(0, 20).map(e => ({
      eventType: e.event_type,
      playerName: e.player_name,
      spellId: e.spell_id,
      rating: e.rating,
      createdAt: e.created_at,
    }))

    return new Response(JSON.stringify({
      uniquePlayers,
      totalSpellsPlayed,
      avgRating: Math.round(avgRating * 10) / 10,
      totalTimeSeconds: totalTime,
      byBook,
      ratingDistribution: ratingDist,
      topPlayers,
      topSpells,
      recentActivity,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
