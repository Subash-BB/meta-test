'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  if (typeof window === 'undefined') {
    return null;
  }
  const toggleDarkMode = ()=>{
    if(theme == 'dark'){
      setTheme('light')
    }else{
      setTheme('dark')
    }
  }
  return (
    <nav className="border-b bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="https://elevateresume-dev.netlify.app/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              elevateresume<span className="text-red-500">.ai</span>
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {theme =='dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}