'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiCalendar, FiUser } from 'react-icons/fi';
import { Score } from '../types';
import styles from '../styles/Leaderboard.module.scss';

interface LeaderboardProps {
  scores?: Score[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores: propScores }) => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    // Try to get scores from localStorage if not provided as props
    if (propScores) {
      setScores(propScores);
    } else {
      try {
        const storedScores = localStorage.getItem('leaderboard');
        if (storedScores) {
          setScores(JSON.parse(storedScores));
        }
      } catch (error) {
        console.error('Error loading scores from localStorage:', error);
      }
    }
  }, [propScores]);

  if (scores.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No scores yet. Be the first to play!</p>
      </div>
    );
  }

  // Sort scores from highest to lowest
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className={styles.leaderboard}>
      <div className={styles.header}>
        <div className={styles.rank}>#</div>
        <div className={styles.name}><FiUser size={14} /> Player</div>
        <div className={styles.score}>Score</div>
        <div className={styles.date}><FiCalendar size={14} /> Date</div>
      </div>
      
      <AnimatePresence>
        {sortedScores.map((score, index) => (
          <motion.div 
            key={score.id}
            className={`${styles.row} ${index < 3 ? styles.topThree : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className={styles.rank}>
              {index < 3 ? (
                <FiAward 
                  size={18} 
                  className={`${styles.medal} ${styles[`medal${index + 1}`]}`} 
                />
              ) : (
                index + 1
              )}
            </div>
            <div className={styles.name}>{score.name}</div>
            <div className={styles.score}>{score.score}</div>
            <div className={styles.date}>{score.date}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}; 