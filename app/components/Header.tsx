'use client';

import React from 'react';
import Link from 'next/link';
import { FiHome, FiAward } from 'react-icons/fi';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';
import styles from '../styles/Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/">
          <motion.span 
            whileHover={{ scale: 1.1 }}
            className={styles.iconButton}
          >
            <FiHome size={20} />
          </motion.span>
        </Link>
      </div>
      
      <motion.h1 
        className={styles.title}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        TapMaster Arcade
      </motion.h1>
      
      <div className={styles.right}>
        <Link href="/leaderboard">
          <motion.span 
            whileHover={{ scale: 1.1 }}
            className={styles.iconButton}
          >
            <FiAward size={20} />
          </motion.span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}; 