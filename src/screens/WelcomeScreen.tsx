import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import MagicMascot from '@/components/MagicMascot';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const { setPlayerName } = useGame();

  const handleStart = () => {
    if (name.trim()) setPlayerName(name.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-night flex flex-col items-center justify-center p-6">
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/40"
          style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-8 max-w-md w-full"
      >
        <MagicMascot size="lg" mood="excited" />

        <div className="text-center space-y-3">
          <motion.h1
            className="text-4xl md:text-5xl font-display text-gradient-gold font-bold"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            SpellCraft
          </motion.h1>
          <p className="text-muted-foreground text-lg font-body">
            Learn, play, and master magical spells
          </p>
        </div>

        <motion.div
          className="w-full space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="Enter your name, young wizard..."
            className="w-full px-6 py-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-lg text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body"
            maxLength={20}
            autoFocus
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full py-4 rounded-xl text-lg font-bold font-display shadow-magic transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-primary text-primary-foreground flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            Start Your Magic Journey
            <Sparkles size={20} />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
