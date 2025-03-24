'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean | undefined;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    let savedTheme;
    let defaultTheme;
    if (typeof window !== 'undefined') {
      savedTheme = window.localStorage.getItem('theme');
      defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return savedTheme === 'dark' || (!savedTheme && defaultTheme);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      console.log('document.documentElement.classList', document.documentElement.classList)
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('document.documentElement.classList', document.documentElement.classList)
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
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