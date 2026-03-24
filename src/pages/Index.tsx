import { useState, useEffect } from 'react';
import { GameProvider, useGame } from '@/context/GameContext';
import WelcomeScreen from '@/screens/WelcomeScreen';
import BookSelectionScreen from '@/screens/BookSelectionScreen';
import SpellListScreen from '@/screens/SpellListScreen';
import SpellDetailScreen from '@/screens/SpellDetailScreen';
import GameScreen from '@/screens/GameScreen';
import CompletionScreen from '@/screens/CompletionScreen';
import StatsScreen from '@/screens/StatsScreen';
import { BarChart3 } from 'lucide-react';

function AppContent() {
  const { playerName, currentBook, currentSpellId, currentScenario } = useGame();
  const [playing, setPlaying] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const handler = () => setPlaying(true);
    window.addEventListener('spellcraft:start-game', handler);
    return () => window.removeEventListener('spellcraft:start-game', handler);
  }, []);

  // Reset playing when spell changes
  useEffect(() => {
    if (!currentSpellId) setPlaying(false);
  }, [currentSpellId]);

  if (showStats) {
    return <StatsScreen onBack={() => setShowStats(false)} />;
  }

  // Determine which screen to show
  let screen: React.ReactNode;

  if (!playerName) {
    screen = <WelcomeScreen />;
  } else if (currentSpellId && playing && currentScenario >= 3) {
    screen = <CompletionScreen />;
  } else if (currentSpellId && playing) {
    screen = <GameScreen />;
  } else if (currentSpellId) {
    screen = <SpellDetailScreen />;
  } else if (currentBook !== null) {
    screen = <SpellListScreen />;
  } else {
    screen = <BookSelectionScreen />;
  }

  // Stats button (visible when logged in)
  const statsButton = playerName ? (
    <button
      onClick={() => setShowStats(true)}
      className="fixed top-4 right-4 z-50 p-3 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors shadow-card"
      title="View Stats"
    >
      <BarChart3 size={20} />
    </button>
  ) : null;

  return (
    <>
      {statsButton}
      {screen}
    </>
  );
}

export default function Index() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
