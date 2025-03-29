'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiAward } from 'react-icons/fi';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { Leaderboard } from './components/Leaderboard';
import styles from './styles/Home.module.scss';

export default function Home() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <main className={styles.main}>
      <Header />

      <div className={styles.content}>
        <motion.div 
          className={styles.titleContainer}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.title}>TapMaster Arcade</h1>
          <p className={styles.subtitle}>How fast can you tap?</p>
        </motion.div>

        <motion.div 
          className={styles.actions}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/game">
            <Button 
              tilt={true} 
              size="large"
              className={styles.playButton}
            >
              <FiPlay size={20} /> Play Now
            </Button>
          </Link>
          
          <Button 
            variant="secondary" 
            onClick={() => setShowLeaderboard(!showLeaderboard)}
          >
            <FiAward size={16} /> 
            {showLeaderboard ? 'Hide Leaderboard' : 'View Leaderboard'}
          </Button>
        </motion.div>

        <AnimatePresence>
          {showLeaderboard && (
            <motion.div 
              className={styles.leaderboardContainer}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Leaderboard />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className={styles.instructions}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>How to Play</h3>
          <ol>
            <li>Click the BIG &ldquo;Tap!&rdquo; button as fast as you can</li>
            <li>You have 10 seconds to achieve your best score</li>
            <li>Each tap counts as one point</li>
            <li>Beat the high score to top the leaderboard!</li>
          </ol>
        </motion.div>
      </div>
    </main>
  );
} 