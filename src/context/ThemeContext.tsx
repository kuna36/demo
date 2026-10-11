import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

export type AccentColorId = 'sapphire' | 'emerald' | 'amber' | 'violet' | 'gold' | 'rose';

export interface AccentColorConfig {
  id: AccentColorId;
  name: string;
  tagline: string;
  primary: string;
  light: string;
  hover: string;
  contrastText: string;
  soft: string;
  hexNumber: number;
}

export const ACCENT_COLORS: Record<AccentColorId, AccentColorConfig> = {
  sapphire: {
    id: 'sapphire',
    name: 'Sapphire Cyan',
    tagline: 'Modern Digital & Laser Blue',
    primary: '#0284C7',
    light: '#38BDF8',
    hover: '#0369A1',
    contrastText: '#FFFFFF',
    soft: 'rgba(2, 132, 199, 0.15)',
    hexNumber: 0x0284C7,
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Teal',
    tagline: 'e-Sevai & Online Services',
    primary: '#059669',
    light: '#34D399',
    hover: '#047857',
    contrastText: '#FFFFFF',
    soft: 'rgba(5, 150, 105, 0.15)',
    hexNumber: 0x059669,
  },
  amber: {
    id: 'amber',
    name: 'Solar Amber',
    tagline: 'Warm Energy & Commerce',
    primary: '#D97706',
    light: '#FBBF24',
    hover: '#B45309',
    contrastText: '#FFFFFF',
    soft: 'rgba(217, 119, 6, 0.15)',
    hexNumber: 0xD97706,
  },
  violet: {
    id: 'violet',
    name: 'Royal Violet',
    tagline: 'Creative Studio & High Tech',
    primary: '#7C3AED',
    light: '#A78BFA',
    hover: '#6D28D9',
    contrastText: '#FFFFFF',
    soft: 'rgba(124, 58, 237, 0.15)',
    hexNumber: 0x7C3AED,
  },
  gold: {
    id: 'gold',
    name: 'Champagne Gold',
    tagline: 'Prestige Jewellery & Luxury',
    primary: '#D9B779',
    light: '#F3E5AB',
    hover: '#B38F4D',
    contrastText: '#101827',
    soft: 'rgba(217, 183, 121, 0.15)',
    hexNumber: 0xD9B779,
  },
  rose: {
    id: 'rose',
    name: 'Ruby Rose',
    tagline: 'Festive & Vibrant Retail',
    primary: '#E11D48',
    light: '#FB7185',
    hover: '#BE123C',
    contrastText: '#FFFFFF',
    soft: 'rgba(225, 29, 72, 0.15)',
    hexNumber: 0xE11D48,
  },
};

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  accentColor: AccentColorId;
  accentConfig: AccentColorConfig;
  setAccentColor: (color: AccentColorId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme_preference');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  const [accentColor, setAccentColorState] = useState<AccentColorId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme_accent_color');
      if (saved && saved in ACCENT_COLORS) return saved as AccentColorId;
    }
    // New default theme colour: Sapphire Cyan
    return 'sapphire';
  });

  const isDark = theme === 'dark';
  const accentConfig = ACCENT_COLORS[accentColor] || ACCENT_COLORS.sapphire;

  useEffect(() => {
    localStorage.setItem('theme_preference', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', accentConfig.primary);
    root.style.setProperty('--accent-light', accentConfig.light);
    root.style.setProperty('--accent-hover', accentConfig.hover);
    root.style.setProperty('--accent-contrast', accentConfig.contrastText);
    root.style.setProperty('--accent-soft', accentConfig.soft);
    localStorage.setItem('theme_accent_color', accentColor);
  }, [accentColor, accentConfig]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setAccentColor = (newColor: AccentColorId) => {
    setAccentColorState(newColor);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        toggleTheme,
        accentColor,
        accentConfig,
        setAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
