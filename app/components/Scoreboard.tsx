'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Scoreboard.module.scss';

interface ScoreboardProps {
  score: number;
  timeLeft: number;
  message?: string;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ score, timeLeft, message }) => {
  return (
    <div className={styles.scoreboard}>
      <motion.div 
        className={styles.scoreContainer}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.label}>Score</div>
        <motion.div 
          className={styles.value}
          key={score}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {score}
        </motion.div>
      </motion.div>
      
      <motion.div 
        className={styles.timeContainer}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className={styles.label}>Time</div>
        <motion.div 
          className={`${styles.value} ${timeLeft <= 3 ? styles.timeWarning : ''}`}
          key={timeLeft}
          animate={{ 
            scale: [1, timeLeft <= 3 ? 1.2 : 1, 1],
            color: timeLeft <= 3 ? ['#ff6b6b', '#ffffff', '#ff6b6b'] : undefined,
          }}
          transition={{ duration: 0.5 }}
        >
          {timeLeft}s
        </motion.div>
      </motion.div>
      
      {message && (
        <motion.div 
          className={styles.message}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
}; 