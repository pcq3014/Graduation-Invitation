"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface AppStateContextValue {
  isLoading: boolean;
  isCardOpened: boolean;
  shouldAutoplayMusic: boolean;
  finishLoading: () => void;
  openCard: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isCardOpened, setIsCardOpened] = useState(false);
  const [shouldAutoplayMusic, setShouldAutoplayMusic] = useState(false);

  const finishLoading = useCallback(() => setIsLoading(false), []);

  const openCard = useCallback(() => {
    setIsCardOpened(true);
    setShouldAutoplayMusic(true);
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        isLoading,
        isCardOpened,
        shouldAutoplayMusic,
        finishLoading,
        openCard,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}
