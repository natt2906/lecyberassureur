import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './theme-context';
const STORAGE_KEY = 'site-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return storedTheme === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => {
          setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
