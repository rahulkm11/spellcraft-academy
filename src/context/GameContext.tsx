import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { spells } from '@/data/spells';

interface SpellRecord {
  spellId: string;
  scenariosCompleted: number;
  rating: number;
  playedAt: number;
}

interface GameState {
  playerName: string;
  currentBook: number | null; // null = all books
  currentSpellId: string | null;
  currentScenario: number;
  spellRecords: SpellRecord[];
  sessionStartTime: number;
  totalTimeSpent: number;
}

interface GameContextType extends GameState {
  setPlayerName: (name: string) => void;
  selectBook: (bookIndex: number | null) => void;
  selectSpell: (spellId: string) => void;
  completeScenario: () => void;
  rateSpell: (rating: number) => void;
  resetSpell: () => void;
  goHome: () => void;
  goToBooks: () => void;
  totalSpellsPlayed: number;
  averageRating: number;
  favoriteSpell: string | null;
  elapsedTime: number;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>({
    playerName: '',
    currentBook: null,
    currentSpellId: null,
    currentScenario: 0,
    spellRecords: [],
    sessionStartTime: Date.now(),
    totalTimeSpent: 0,
  });

  const timerRef = useRef<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - state.sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [state.sessionStartTime]);

  const setPlayerName = useCallback((name: string) => {
    setState(s => ({ ...s, playerName: name, sessionStartTime: Date.now() }));
  }, []);

  const selectBook = useCallback((bookIndex: number | null) => {
    setState(s => ({ ...s, currentBook: bookIndex }));
  }, []);

  const selectSpell = useCallback((spellId: string) => {
    setState(s => ({ ...s, currentSpellId: spellId, currentScenario: 0 }));
  }, []);

  const completeScenario = useCallback(() => {
    setState(s => ({ ...s, currentScenario: s.currentScenario + 1 }));
  }, []);

  const rateSpell = useCallback((rating: number) => {
    setState(s => {
      const record: SpellRecord = {
        spellId: s.currentSpellId!,
        scenariosCompleted: 3,
        rating,
        playedAt: Date.now(),
      };
      return { ...s, spellRecords: [...s.spellRecords, record] };
    });
  }, []);

  const resetSpell = useCallback(() => {
    setState(s => ({ ...s, currentScenario: 0 }));
  }, []);

  const goHome = useCallback(() => {
    setState(s => ({ ...s, currentBook: null, currentSpellId: null, currentScenario: 0 }));
  }, []);

  const goToBooks = useCallback(() => {
    setState(s => ({ ...s, currentSpellId: null, currentScenario: 0 }));
  }, []);

  const totalSpellsPlayed = state.spellRecords.length;
  const averageRating = totalSpellsPlayed > 0
    ? state.spellRecords.reduce((sum, r) => sum + r.rating, 0) / totalSpellsPlayed
    : 0;

  const favoriteSpell = totalSpellsPlayed > 0
    ? state.spellRecords.reduce((best, r) => r.rating > (best?.rating ?? 0) ? r : best, state.spellRecords[0]).spellId
    : null;

  return (
    <GameContext.Provider value={{
      ...state,
      setPlayerName,
      selectBook,
      selectSpell,
      completeScenario,
      rateSpell,
      resetSpell,
      goHome,
      goToBooks,
      totalSpellsPlayed,
      averageRating,
      favoriteSpell,
      elapsedTime,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
