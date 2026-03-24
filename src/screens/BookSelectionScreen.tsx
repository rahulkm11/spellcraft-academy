import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { books, getSpellsByBook } from '@/data/spells';
import { BookOpen, Layers } from 'lucide-react';

export default function BookSelectionScreen() {
  const { selectBook, playerName } = useGame();

  return (
    <div className="min-h-screen bg-gradient-night p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 pt-8"
        >
          <p className="text-muted-foreground font-body">Welcome, <span className="text-primary font-semibold">{playerName}</span>!</p>
          <h1 className="text-3xl md:text-4xl font-display text-gradient-gold font-bold">Choose Your Book</h1>
        </motion.div>

        {/* Explore All */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => selectBook(-1)}
          className="w-full p-5 rounded-xl bg-primary/15 border border-primary/30 flex items-center gap-4 text-left hover:bg-primary/25 transition-colors"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Layers className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-display text-lg text-primary font-semibold">Explore All Books</h3>
            <p className="text-muted-foreground text-sm font-body">Browse every spell from the entire series</p>
          </div>
        </motion.button>

        <div className="grid gap-3">
          {books.map((book, i) => {
            const spellCount = getSpellsByBook(book.index).length;
            return (
              <motion.button
                key={book.index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectBook(book.index)}
                className="w-full p-4 rounded-xl bg-gradient-card border border-border shadow-card flex items-center gap-4 text-left hover:border-primary/40 transition-all"
              >
                <span className="text-3xl">{book.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-foreground font-semibold text-sm md:text-base truncate">{book.title}</h3>
                  <p className="text-muted-foreground text-xs font-body flex items-center gap-1">
                    <BookOpen size={12} /> {spellCount} spell{spellCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
