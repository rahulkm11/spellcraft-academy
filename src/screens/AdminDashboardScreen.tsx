import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, Wand2, Star, Clock, LogOut, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { books } from '@/data/spells';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  uniquePlayers: number;
  totalSpellsPlayed: number;
  avgRating: number;
  totalTimeSeconds: number;
  byBook: Record<string, number>;
  ratingDistribution: Record<string, number>;
  topPlayers: { name: string; spells: number; avgRating: number }[];
  topSpells: { spellId: string; count: number; avgRating: number }[];
  recentActivity: { eventType: string; playerName: string; spellId: string | null; rating: number | null; createdAt: string }[];
}

export default function AdminDashboardScreen({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('get-analytics', {
        method: 'GET',
        body: undefined,
        headers: {},
      });

      // Use query params via a direct fetch since supabase.functions.invoke doesn't support query params well
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/get-analytics?token=spellpassword123&startDate=${startDate}&endDate=${endDate}`,
        { headers: { 'apikey': anonKey } }
      );
      const json = await res.json();
      if (res.ok) setData(json);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  const bookChartData = data ? Object.entries(data.byBook).map(([idx, count]) => {
    const book = books.find(b => b.index === Number(idx));
    return { name: book ? `Book ${book.index}` : `Book ${idx}`, count };
  }).sort((a, b) => a.name.localeCompare(b.name)) : [];

  const ratingChartData = data ? Object.entries(data.ratingDistribution).map(([stars, count]) => ({
    name: `${stars}⭐`, count,
  })) : [];

  const metrics = data ? [
    { label: 'Total Players', value: data.uniquePlayers, icon: Users, color: 'text-blue-400' },
    { label: 'Spells Played', value: data.totalSpellsPlayed, icon: Wand2, color: 'text-purple-400' },
    { label: 'Avg Rating', value: `${data.avgRating}⭐`, icon: Star, color: 'text-yellow-400' },
    { label: 'Total Time', value: formatTime(data.totalTimeSeconds), icon: Clock, color: 'text-green-400' },
  ] : [];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">SpellCraft Analytics</h1>
          <Button variant="outline" size="sm" onClick={onLogout} className="gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        {/* Date Range */}
        <div className="flex flex-wrap gap-3 items-center">
          <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-auto" />
          <span className="text-muted-foreground">to</span>
          <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-auto" />
          <Button variant="outline" size="sm" onClick={fetchData} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading analytics...</div>
        ) : !data ? (
          <div className="text-center py-20 text-muted-foreground">No data available</div>
        ) : (
          <>
            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <m.icon className={`w-6 h-6 mx-auto mb-2 ${m.color}`} />
                      <div className="text-2xl font-bold text-foreground">{m.value}</div>
                      <div className="text-xs text-muted-foreground">{m.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-sm">Spells Played by Book</CardTitle></CardHeader>
                <CardContent>
                  {bookChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={bookChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <p className="text-muted-foreground text-sm text-center py-8">No data yet</p>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Rating Distribution</CardTitle></CardHeader>
                <CardContent>
                  {ratingChartData.some(d => d.count > 0) ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={ratingChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <p className="text-muted-foreground text-sm text-center py-8">No ratings yet</p>}
                </CardContent>
              </Card>
            </div>

            {/* Top Players */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Top Players</CardTitle></CardHeader>
              <CardContent>
                {data.topPlayers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="text-left py-2 px-2">Player</th>
                          <th className="text-right py-2 px-2">Spells</th>
                          <th className="text-right py-2 px-2">Avg Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.topPlayers.map(p => (
                          <tr key={p.name} className="border-b border-border/50">
                            <td className="py-2 px-2 text-foreground">{p.name}</td>
                            <td className="py-2 px-2 text-right text-foreground">{p.spells}</td>
                            <td className="py-2 px-2 text-right text-foreground">{p.avgRating > 0 ? `${Math.round(p.avgRating * 10) / 10}⭐` : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : <p className="text-muted-foreground text-sm text-center py-4">No players yet</p>}
              </CardContent>
            </Card>

            {/* Top Spells */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Top Spells</CardTitle></CardHeader>
              <CardContent>
                {data.topSpells.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="text-left py-2 px-2">Spell</th>
                          <th className="text-right py-2 px-2">Times Played</th>
                          <th className="text-right py-2 px-2">Avg Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.topSpells.map(s => (
                          <tr key={s.spellId} className="border-b border-border/50">
                            <td className="py-2 px-2 text-foreground">{s.spellId}</td>
                            <td className="py-2 px-2 text-right text-foreground">{s.count}</td>
                            <td className="py-2 px-2 text-right text-foreground">{s.avgRating > 0 ? `${Math.round(s.avgRating * 10) / 10}⭐` : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : <p className="text-muted-foreground text-sm text-center py-4">No spells played yet</p>}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader>
              <CardContent>
                {data.recentActivity.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {data.recentActivity.map((a, i) => (
                      <div key={i} className="flex items-center justify-between text-xs border-b border-border/30 py-1.5">
                        <span className="text-foreground font-medium">{a.playerName}</span>
                        <span className="text-muted-foreground">
                          {a.eventType === 'spell_rated' ? `Rated ${a.spellId} ${a.rating}⭐` :
                           a.eventType === 'spell_completed' ? `Completed ${a.spellId}` :
                           'Started session'}
                        </span>
                        <span className="text-muted-foreground">{new Date(a.createdAt).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-muted-foreground text-sm text-center py-4">No activity yet</p>}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
