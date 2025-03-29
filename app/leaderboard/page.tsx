'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { Header } from '../components/Header';
import { Leaderboard } from '../components/Leaderboard';
import { Button } from '../components/Button';
import { Score } from '../types';
import { mockLeaderboard } from '../data/leaderboard';
import styles from '../styles/LeaderboardPage.module.scss';

export default function LeaderboardPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load scores from localStorage or use mock data
    try {
      const storedScores = localStorage.getItem('leaderboard');
      if (storedScores) {
        setScores(JSON.parse(storedScores));
      } else {
        // Use mock data for first time
        setScores(mockLeaderboard);
        localStorage.setItem('leaderboard', JSON.stringify(mockLeaderboard));
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      setScores(mockLeaderboard);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/">
            <Button variant="secondary" className={styles.backButton}>
              <FiArrowLeft size={16} /> Back to Home
            </Button>
          </Link>
          
          <h1 className={styles.title}>Leaderboard</h1>
        </motion.div>
        
        {loading ? (
          <div className={styles.loading}>Loading scores...</div>
        ) : (
          <motion.div 
            className={styles.leaderboardContainer}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Leaderboard scores={scores} />
          </motion.div>
        )}
      </div>
    </main>
  );
} 