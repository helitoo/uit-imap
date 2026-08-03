import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ScreenMode = "light" | "dark" | "system";

const STORAGE_KEY = "uit_imap_screen_mode";

interface ScreenModeContextValue {
  screenMode: ScreenMode;
  screenContext: ScreenMode;
  setScreenMode: (mode: ScreenMode) => void;
  setScreenContext: (mode: ScreenMode) => void;
  resolvedMode: "light" | "dark";
  toggleScreenMode: () => void;
}

const ScreenModeContext = createContext<ScreenModeContextValue | null>(null);

function getInitialScreenMode(): ScreenMode {
  if (typeof window === "undefined" || !window.localStorage) {
    return "system";
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ScreenMode | null;
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
  } catch (e) {
    console.error("Failed to read screenMode from localStorage:", e);
  }
  return "system";
}

export function ScreenModeProvider({ children }: { children: ReactNode }) {
  const [screenMode, setScreenModeState] = useState<ScreenMode>(getInitialScreenMode);
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light");

  const setScreenMode = (mode: ScreenMode) => {
    setScreenModeState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {
      console.error("Failed to save screenMode to localStorage:", e);
    }
  };

  const toggleScreenMode = () => {
    const nextMode: ScreenMode =
      screenMode === "system" ? "light" : screenMode === "light" ? "dark" : "system";
    setScreenMode(nextMode);
  };

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      let isDark = false;
      if (screenMode === "dark") {
        isDark = true;
      } else if (screenMode === "light") {
        isDark = false;
      } else {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      if (isDark) {
        root.classList.add("dark");
        setResolvedMode("dark");
      } else {
        root.classList.remove("dark");
        setResolvedMode("light");
      }
    };

    updateTheme();

    if (screenMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => updateTheme();
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [screenMode]);

  return (
    <ScreenModeContext.Provider
      value={{
        screenMode,
        screenContext: screenMode,
        setScreenMode,
        setScreenContext: setScreenMode,
        resolvedMode,
        toggleScreenMode,
      }}
    >
      {children}
    </ScreenModeContext.Provider>
  );
}

export function useScreenMode() {
  const ctx = useContext(ScreenModeContext);
  if (!ctx) {
    throw new Error("useScreenMode must be used within a ScreenModeProvider");
  }
  return ctx;
}

export function useScreenModeContext() {
  return useScreenMode();
}
