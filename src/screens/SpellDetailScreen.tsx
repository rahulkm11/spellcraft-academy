import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getSpellById, books } from '@/data/spells';
import { ArrowLeft, Sparkles, User, BookOpen } from 'lucide-react';

export default function SpellDetailScreen() {
  const { currentSpellId, goToBooks } = useGame();
  const spell = getSpellById(currentSpellId!);

  if (!spell) return null;

  const book = books.find(b => b.index === spell.bookIndex);

  return (
    <div className="min-h-screen bg-gradient-night p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6">
          <button onClick={goToBooks} className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card space-y-6"
        >
          <div className="text-center space-y-2">
            <motion.h1
              className="text-3xl md:text-4xl font-display text-gradient-gold font-bold"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              {spell.name}
            </motion.h1>
            <p className="text-primary font-body font-semibold text-lg">{spell.meaning}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <User size={18} className="text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-body">Cast by</p>
                <p className="text-foreground font-body font-semibold">{spell.character}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <BookOpen size={18} className="text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-body">From</p>
                <p className="text-foreground font-body font-semibold text-sm">{book?.title}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
              <p className="text-xs text-muted-foreground font-body mb-1">Story Context</p>
              <p className="text-foreground font-body leading-relaxed">{spell.context}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* We use a link-style approach: clicking navigates via context to game */}
          <TrySpellButton />
        </motion.div>
      </div>
    </div>
  );
}

function TrySpellButton() {
  // This component exists so clicking it transitions to the game screen
  // The parent Index page handles screen routing based on currentScenario
  const { completeScenario, currentScenario } = useGame();

  // We set scenario to 0 which signals "start game" when currentSpellId is set
  // Actually the game starts when we render GameScreen. We need a "startGame" flag.
  // Let's just use a simple state: the Index checks if we're "playing"
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        // Signal to start playing - we'll use a custom event approach
        // Actually simpler: we dispatch through context
        window.dispatchEvent(new CustomEvent('spellcraft:start-game'));
      }}
      className="w-full py-4 rounded-xl text-lg font-bold font-display shadow-magic bg-primary text-primary-foreground flex items-center justify-center gap-2"
    >
      <Sparkles size={20} />
      Try This Spell
      <Sparkles size={20} />
    </motion.button>
  );
}
