import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getSpellById } from '@/data/spells';
import type { Scenario } from '@/data/spells';
import ScenarioProgress from '@/components/ScenarioProgress';
import { CheckCircle, RotateCcw } from 'lucide-react';

export default function GameScreen() {
  const { currentSpellId, currentScenario, completeScenario } = useGame();
  const spell = getSpellById(currentSpellId!);

  if (!spell) return null;

  const scenario = spell.scenarios[currentScenario];
  if (!scenario) return null;

  return (
    <div className="min-h-screen bg-gradient-night p-6 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6 text-center space-y-2">
          <h2 className="text-xl font-display text-gradient-gold font-semibold">{spell.name}</h2>
          <ScenarioProgress current={currentScenario} total={3} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col"
          >
            <ScenarioCard scenario={scenario} onComplete={completeScenario} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScenarioCard({ scenario, onComplete }: { scenario: Scenario; onComplete: () => void }) {
  const [completed, setCompleted] = useState(false);

  const handleSuccess = useCallback(() => {
    setCompleted(true);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="bg-gradient-card border border-border rounded-2xl p-6 shadow-card space-y-4">
        <p className="text-foreground font-body text-lg leading-relaxed">{scenario.narrative}</p>
        <p className="text-primary font-body font-semibold">{scenario.instruction}</p>
      </div>

      {!completed ? (
        <InteractionArea scenario={scenario} onSuccess={handleSuccess} />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-card border border-spell-green/30 rounded-2xl p-6 shadow-card text-center space-y-4"
        >
          <CheckCircle className="mx-auto text-spell-green" size={48} />
          <p className="text-foreground font-body text-lg">{scenario.successMessage}</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onComplete}
            className="px-8 py-3 rounded-xl font-bold font-display bg-primary text-primary-foreground shadow-magic"
          >
            Continue ✨
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

function InteractionArea({ scenario, onSuccess }: { scenario: Scenario; onSuccess: () => void }) {
  if (scenario.interactionType === 'tap') return <TapInteraction tapCount={scenario.tapCount!} onSuccess={onSuccess} />;
  if (scenario.interactionType === 'drag') return <DragInteraction onSuccess={onSuccess} />;
  if (scenario.interactionType === 'choice') return <ChoiceInteraction scenario={scenario} onSuccess={onSuccess} />;
  return null;
}

function TapInteraction({ tapCount, onSuccess }: { tapCount: number; onSuccess: () => void }) {
  const [taps, setTaps] = useState(0);

  const handleTap = () => {
    const next = taps + 1;
    setTaps(next);
    if (next >= tapCount) onSuccess();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground font-body text-sm">{taps} / {tapCount} taps</p>
      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${(taps / tapCount) * 100}%` }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.85 }}
        onClick={handleTap}
        className="w-32 h-32 rounded-full bg-primary/20 border-4 border-primary text-primary font-display text-xl shadow-glow flex items-center justify-center"
      >
        <motion.span
          key={taps}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          ✨ TAP
        </motion.span>
      </motion.button>
    </div>
  );
}

function DragInteraction({ onSuccess }: { onSuccess: () => void }) {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrag = (_: any, info: { offset: { y: number } }) => {
    const p = Math.min(100, Math.abs(info.offset.y) / 1.5);
    setProgress(p);
    if (p >= 100) onSuccess();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground font-body text-sm">Drag the magic orb!</p>
      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="relative h-48 w-full flex items-center justify-center">
        <motion.div
          drag
          dragConstraints={{ top: -80, bottom: 80, left: -80, right: 80 }}
          onDrag={handleDrag}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          whileDrag={{ scale: 1.2 }}
          className="w-20 h-20 rounded-full bg-primary/30 border-4 border-primary shadow-glow flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <motion.span
            className="text-3xl"
            animate={{ rotate: dragging ? [0, 360] : 0 }}
            transition={{ duration: 1, repeat: dragging ? Infinity : 0 }}
          >
            ✦
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

function ChoiceInteraction({ scenario, onSuccess }: { scenario: Scenario; onSuccess: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);

  const handleChoice = (index: number) => {
    setSelected(index);
    if (index === scenario.correctOption) {
      onSuccess();
    } else {
      setWrong(true);
      setTimeout(() => { setSelected(null); setWrong(false); }, 800);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {scenario.options!.map((opt, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => selected === null || wrong ? handleChoice(i) : undefined}
          className={`p-4 rounded-xl border text-left font-body font-semibold transition-all ${
            selected === i && wrong
              ? 'border-destructive bg-destructive/20 text-destructive'
              : selected === i
              ? 'border-spell-green bg-spell-green/20 text-spell-green'
              : 'border-border bg-gradient-card text-foreground hover:border-primary/40'
          }`}
        >
          {opt}
        </motion.button>
      ))}
      {wrong && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-destructive font-body text-sm flex items-center justify-center gap-1"
        >
          <RotateCcw size={14} /> Not quite — try again!
        </motion.p>
      )}
    </div>
  );
}
