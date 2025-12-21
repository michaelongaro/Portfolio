import { createContext, useContext, useState, ReactNode } from "react";

interface ExplorationContextType {
  isExploring: boolean;
  setIsExploring: (isExploring: boolean) => void;
}

const ExplorationContext = createContext<ExplorationContextType | undefined>(
  undefined
);

export function ExplorationProvider({ children }: { children: ReactNode }) {
  const [isExploring, setIsExploring] = useState(false);

  return (
    <ExplorationContext.Provider value={{ isExploring, setIsExploring }}>
      {children}
    </ExplorationContext.Provider>
  );
}

export function useExploration() {
  const context = useContext(ExplorationContext);
  if (context === undefined) {
    throw new Error(
      "useExploration must be used within an ExplorationProvider"
    );
  }
  return context;
}
