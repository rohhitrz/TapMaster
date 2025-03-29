'use client';

import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';
import styles from '../styles/ThemeToggle.module.scss';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className={styles.themeToggle} 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
}; 