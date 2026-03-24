import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { spells, getSpellsByBook, books } from '@/data/spells';
import { ArrowLeft, Wand2 } from 'lucide-react';

export default function SpellListScreen() {
  const { currentBook, selectSpell, goHome } = useGame();

  const filteredSpells = currentBook === -1
    ? spells
    : getSpellsByBook(currentBook!);

  const title = currentBook === -1
    ? 'All Spells'
    : books.find(b => b.index === currentBook)?.shortTitle ?? '';

  return (
    <div className="min-h-screen bg-gradient-night p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 pt-6"
        >
          <button onClick={goHome} className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-display text-gradient-gold font-bold">{title}</h1>
            <p className="text-muted-foreground text-sm font-body">{filteredSpells.length} spells to discover</p>
          </div>
        </motion.div>

        <div className="grid gap-3">
          {filteredSpells.map((spell, i) => (
            <motion.button
              key={spell.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectSpell(spell.id)}
              className="w-full p-4 rounded-xl bg-gradient-card border border-border shadow-card flex items-center gap-4 text-left hover:border-primary/40 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Wand2 className="text-primary" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-foreground font-semibold truncate">{spell.name}</h3>
                <p className="text-muted-foreground text-xs font-body">by {spell.character}</p>
                <p className="text-muted-foreground text-xs font-body mt-1 line-clamp-1">{spell.meaning}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
