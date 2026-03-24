import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getSpellById } from '@/data/spells';
import StarRating from '@/components/StarRating';
import MagicMascot from '@/components/MagicMascot';
import { RotateCcw, Wand2 } from 'lucide-react';

export default function CompletionScreen() {
  const { currentSpellId, rateSpell, resetSpell, goToBooks } = useGame();
  const [rated, setRated] = useState(false);
  const spell = getSpellById(currentSpellId!);

  if (!spell) return null;

  const handleRate = (rating: number) => {
    rateSpell(rating);
    setRated(true);
  };

  return (
    <div className="min-h-screen bg-gradient-night flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring' }}
        className="max-w-md w-full space-y-8 text-center"
      >
        <MagicMascot size="lg" mood="excited" />

        <div className="space-y-2">
          <motion.h1
            className="text-3xl font-display text-gradient-gold font-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Spell Mastered! 🎉
          </motion.h1>
          <p className="text-foreground font-body text-lg">
            You experienced <span className="text-primary font-semibold">{spell.name}</span>!
          </p>
        </div>

        {!rated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <p className="text-muted-foreground font-body">How was this spell?</p>
            <StarRating onRate={handleRate} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-spell-green font-body font-semibold">Thanks for rating! ✨</p>

            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={resetSpell}
                className="w-full py-3 rounded-xl font-bold font-display bg-secondary text-foreground flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                Replay Spell
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={goToBooks}
                className="w-full py-3 rounded-xl font-bold font-display bg-primary text-primary-foreground flex items-center justify-center gap-2 shadow-magic"
              >
                <Wand2 size={18} />
                Choose Another Spell
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
