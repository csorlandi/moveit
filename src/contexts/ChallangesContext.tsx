import { createContext, useState, ReactNode } from 'react';

interface ChallangesContextData {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
  levelUp: () => void;
  startNewChallange: () => void;
}

interface ChallangesProviderProps {
  children: ReactNode;
}

export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({ children }: ChallangesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challangesCompleted, setChallangesCompletes] = useState(0);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallange() {}

  return (
    <ChallangesContext.Provider value={{
      level,
      currentExperience,
      challangesCompleted,
      levelUp,
      startNewChallange
    }}>
      {children}
    </ChallangesContext.Provider>
  );
}