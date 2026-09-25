import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'guiitar_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Load stored theme on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeState(stored);
      } else {
        setThemeState('system');
      }
    } catch {
      setThemeState('system');
    }
  }, []);

  // Sync class on <html> and update resolvedTheme
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let isDark = false;
      if (theme === 'dark') {
        isDark = true;
      } else if (theme === 'light') {
        isDark = false;
      } else {
        isDark = mediaQuery.matches;
      }

      if (isDark) {
        root.classList.add('dark');
        setResolvedTheme('dark');
      } else {
        root.classList.remove('dark');
        setResolvedTheme('light');
      }
    };

    applyTheme();

    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      window.dispatchEvent(new Event('guiitar_theme_change'));
    } catch (e) {
      console.warn('Unable to persist theme:', e);
    }
  };

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      theme: 'light' as Theme,
      resolvedTheme: 'light' as const,
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}

export function ThemeToggle({
  className = '',
  showLabel = false,
  variant = 'icon',
}: {
  className?: string;
  showLabel?: boolean;
  variant?: 'icon' | 'dropdown' | 'segmented';
}) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={`theme-toggle-btn ${className}`}
        aria-label="Toggle theme"
        title="Toggle dark/light mode"
        disabled
      >
        <span className="theme-toggle-icon">
          <Sun className="w-4 h-4 opacity-50" />
        </span>
      </button>
    );
  }

  if (variant === 'segmented') {
    return (
      <div className={`theme-segmented-control ${className}`} role="radiogroup" aria-label="Theme selection">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`theme-seg-btn ${theme === 'light' ? 'active' : ''}`}
          title="Light Theme"
          aria-label="Light Theme"
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`theme-seg-btn ${theme === 'dark' ? 'active' : ''}`}
          title="Dark Theme"
          aria-label="Dark Theme"
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Dark</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('system')}
          className={`theme-seg-btn ${theme === 'system' ? 'active' : ''}`}
          title="System Preference"
          aria-label="System Theme"
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>System</span>
        </button>
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`theme-toggle-btn ${className}`}
          aria-label="Select theme"
          title={`Current theme: ${theme} (${resolvedTheme})`}
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="w-4 h-4 text-amber-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
          {showLabel && (
            <span className="text-xs font-semibold capitalize ml-1.5 text-foreground">
              {theme}
            </span>
          )}
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <div className="theme-dropdown-menu">
              <button
                type="button"
                onClick={() => {
                  setTheme('light');
                  setOpen(false);
                }}
                className={`theme-dropdown-item ${theme === 'light' ? 'active' : ''}`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTheme('dark');
                  setOpen(false);
                }}
                className={`theme-dropdown-item ${theme === 'dark' ? 'active' : ''}`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTheme('system');
                  setOpen(false);
                }}
                className={`theme-dropdown-item ${theme === 'system' ? 'active' : ''}`}
              >
                <Laptop className="w-4 h-4 text-slate-400" />
                <span>System</span>
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Default Quick Toggle Button (Sun <-> Moon)
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode (current: ${theme})`}
    >
      <div className="theme-toggle-icon-wrap">
        {resolvedTheme === 'dark' ? (
          <Moon className="w-4 h-4 theme-icon-moon" />
        ) : (
          <Sun className="w-4 h-4 theme-icon-sun" />
        )}
      </div>
      {showLabel && (
        <span className="theme-toggle-label">
          {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}
