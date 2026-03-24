import { motion } from 'framer-motion';

interface MagicMascotProps {
  size?: 'sm' | 'md' | 'lg';
  mood?: 'happy' | 'excited' | 'wink';
}

export default function MagicMascot({ size = 'md', mood = 'happy' }: MagicMascotProps) {
  const s = size === 'sm' ? 48 : size === 'md' ? 80 : 120;

  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: s, height: s }}
    >
      <svg viewBox="0 0 100 100" width={s} height={s}>
        {/* Body */}
        <circle cx="50" cy="55" r="30" fill="hsl(43, 66%, 52%)" opacity="0.9" />
        {/* Hat */}
        <polygon points="50,5 35,40 65,40" fill="hsl(216, 55%, 20%)" />
        <rect x="30" y="38" width="40" height="6" rx="3" fill="hsl(216, 55%, 20%)" />
        {/* Hat band */}
        <rect x="30" y="39" width="40" height="3" rx="1.5" fill="hsl(43, 66%, 52%)" />
        {/* Eyes */}
        <circle cx="40" cy="52" r="4" fill="hsl(216, 55%, 14%)" />
        <circle cx="60" cy="52" r="4" fill="hsl(216, 55%, 14%)" />
        {/* Eye shine */}
        <circle cx="42" cy="50" r="1.5" fill="white" />
        <circle cx="62" cy="50" r="1.5" fill="white" />
        {/* Mouth */}
        {mood === 'happy' && <path d="M 42 62 Q 50 70 58 62" stroke="hsl(216, 55%, 14%)" strokeWidth="2" fill="none" />}
        {mood === 'excited' && <ellipse cx="50" cy="64" rx="6" ry="4" fill="hsl(216, 55%, 14%)" />}
        {mood === 'wink' && (
          <>
            <path d="M 42 62 Q 50 70 58 62" stroke="hsl(216, 55%, 14%)" strokeWidth="2" fill="none" />
            <line x1="56" y1="50" x2="64" y2="54" stroke="hsl(216, 55%, 14%)" strokeWidth="2" />
          </>
        )}
        {/* Wand */}
        <motion.line
          x1="75" y1="45" x2="90" y2="30"
          stroke="hsl(30, 50%, 40%)" strokeWidth="2.5" strokeLinecap="round"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: '75px 45px' }}
        />
        {/* Sparkle */}
        <motion.circle
          cx="92" cy="28" r="3"
          fill="hsl(43, 90%, 70%)"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}
