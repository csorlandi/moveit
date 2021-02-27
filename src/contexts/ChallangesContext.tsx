import { createContext, useState, ReactNode, useEffect } from 'react';

import Cookies from 'js-cookie';

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
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}

export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({
  children,
  ...rest
}: ChallangesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challangesCompleted, setChallangesCompletes] = useState(rest.challangesCompleted ?? 0);

  const [activeChallange, setActiveChallange] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challangesCompleted', String(challangesCompleted));
  }, [level, currentExperience, challangesCompleted]);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallange() {
    const randomChallangeIndex = Math.round(Math.random() * challanges.length);
    const selectedChallange = challanges[randomChallangeIndex];

    setActiveChallange(selectedChallange);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${selectedChallange.amount}xp!`
      })
    }
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