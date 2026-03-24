import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getSpellById } from '@/data/spells';
import { ArrowLeft, Clock, Wand2, Star, Trophy } from 'lucide-react';

export default function StatsScreen({ onBack }: { onBack: () => void }) {
  const { playerName, totalSpellsPlayed, averageRating, favoriteSpell, elapsedTime, spellRecords } = useGame();

  const fav = favoriteSpell ? getSpellById(favoriteSpell) : null;
  const mins = Math.floor(elapsedTime / 60);
  const secs = elapsedTime % 60;

  const stats = [
    { icon: <Wand2 size={24} />, label: 'Spells Played', value: totalSpellsPlayed.toString() },
    { icon: <Clock size={24} />, label: 'Time Spent', value: `${mins}m ${secs}s` },
    { icon: <Star size={24} />, label: 'Avg Rating', value: averageRating ? averageRating.toFixed(1) + ' ⭐' : '—' },
    { icon: <Trophy size={24} />, label: 'Favorite Spell', value: fav?.name ?? '—' },
  ];

  return (
    <div className="min-h-screen bg-gradient-night p-6">
      <div className="max-w-md mx-auto space-y-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 pt-6">
          <button onClick={onBack} className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-display text-gradient-gold font-bold">{playerName}'s Stats</h1>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-card border border-border rounded-xl p-5 shadow-card text-center space-y-2"
            >
              <div className="text-primary mx-auto">{s.icon}</div>
              <p className="text-2xl font-display text-foreground font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground font-body">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {spellRecords.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-card border border-border rounded-xl p-5 shadow-card space-y-3"
          >
            <h3 className="font-display text-foreground font-semibold">Recent Spells</h3>
            {spellRecords.slice(-5).reverse().map((r, i) => {
              const sp = getSpellById(r.spellId);
              return (
                <div key={i} className="flex items-center justify-between text-sm font-body">
                  <span className="text-foreground">{sp?.name}</span>
                  <span className="text-primary">{'⭐'.repeat(r.rating)}</span>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
