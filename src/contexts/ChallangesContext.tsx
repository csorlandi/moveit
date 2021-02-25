import { createContext, useState, ReactNode } from 'react';

import challanges from '../../challenges.json';

interface Challange {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallangesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challangesCompleted: number;
  activeChallange: Challange;
  levelUp: () => void;
  startNewChallange: () => void;
  resetChallange: () => void;
  completeChallange: () => void;
}

interface ChallangesProviderProps {
  children: ReactNode;
}

export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({ children }: ChallangesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challangesCompleted, setChallangesCompletes] = useState(0);

  const [activeChallange, setActiveChallange] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallange() {
    const randomChallangeIndex = Math.round(Math.random() * challanges.length);
    const selectedChallange = challanges[randomChallangeIndex];

    setActiveChallange(selectedChallange);
  }

  function resetChallange() {
    setActiveChallange(null);
  }

  function completeChallange() {
    if (!activeChallange) {
      return;
    }

    const { amount } = activeChallange;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallange(null);
    setChallangesCompletes(challangesCompleted + 1);
  }

  return (
    <ChallangesContext.Provider value={{
      level,
      currentExperience,
      experienceToNextLevel,
      challangesCompleted,
      activeChallange,
      levelUp,
      startNewChallange,
      resetChallange,
      completeChallange,
    }}>
      {children}
    </ChallangesContext.Provider>
  );
}