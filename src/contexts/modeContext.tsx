import { createContext, useContext, useState, type ReactNode } from "react";

export type UsingMode = "default" | "direction";

interface ModeContextValue {
  usingMode: UsingMode;
  setUsingMode: (mode: UsingMode) => void;
  showTourspots: boolean;
  setShowTourspots: (v: boolean) => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [usingMode, setUsingMode] = useState<UsingMode>("default");
  const [showTourspots, setShowTourspots] = useState<boolean>(false);

  return (
    <ModeContext.Provider
      value={{ usingMode, setUsingMode, showTourspots, setShowTourspots }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
