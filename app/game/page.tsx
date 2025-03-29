'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import useSound from 'use-sound';
import ReactConfetti from 'react-confetti';
import { v4 as uuidv4 } from 'uuid';
import { Score } from '../types';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Scoreboard } from '../components/Scoreboard';
import { mockLeaderboard } from '../data/leaderboard';
import styles from '../styles/Game.module.scss';

// Motivational messages
const messages = [
  'Keep tapping!',
  'Faster!',
  'You got this!',
  'Don\'t stop!',
  'Almost there!',
  'Wow, so fast!',
  'Keep going!',
  'You\'re on fire!',
];

// Game states
type GameState = 'ready' | 'playing' | 'finished';

export default function Game() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>('ready');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [message, setMessage] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [highScore, setHighScore] = useState(0);
  const [isTopScore, setIsTopScore] = useState(false);
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 800, 
    height: typeof window !== 'undefined' ? window.innerHeight : 600 
  });
  
  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messageTimerRef = useRef<NodeJS.Timeout | null>(null);
  const backgroundTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Sound effects - we'll mock these since we can't actually play sounds here
  const [playTap] = useSound('/tap.mp3', { volume: 0.5 });
  const [playGameStart] = useSound('/game-start.mp3', { volume: 0.5 });
  const [playGameOver] = useSound('/game-over.mp3', { volume: 0.5 });
  
  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Start game function
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(10);
    setMessage('Go!');
    playGameStart();
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Set random motivational messages
    messageTimerRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMessage(messages[randomIndex]);
    }, 2000);
    
    // Change background color
    backgroundTimerRef.current = setInterval(() => {
      const gameContainer = document.getElementById('game-container');
      if (gameContainer) {
        const hue = Math.floor(Math.random() * 360);
        gameContainer.style.backgroundColor = `hsla(${hue}, 80%, 60%, 0.1)`;
      }
    }, 2000);
  }, [playGameStart]);
  
  // End game function
  const endGame = useCallback(() => {
    clearInterval(timerRef.current!);
    clearInterval(messageTimerRef.current!);
    clearInterval(backgroundTimerRef.current!);
    setGameState('finished');
    playGameOver();
    
    // Check if it's a high score
    try {
      let leaderboard: Score[] = [];
      const storedLeaderboard = localStorage.getItem('leaderboard');
      
      if (storedLeaderboard) {
        leaderboard = JSON.parse(storedLeaderboard);
      } else {
        // Use mock data for first time
        leaderboard = [...mockLeaderboard];
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
      }
      
      const sortedScores = [...leaderboard].sort((a, b) => b.score - a.score);
      setHighScore(sortedScores[0]?.score || 0);
      
      // Check if current score is in top 3
      if (sortedScores.length < 3 || score > sortedScores[2].score) {
        setIsTopScore(true);
      }
    } catch (error) {
      console.error('Error checking high score:', error);
    }
  }, [score, playGameOver]);
  
  // Clean up function
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (messageTimerRef.current) clearInterval(messageTimerRef.current);
      if (backgroundTimerRef.current) clearInterval(backgroundTimerRef.current);
    };
  }, []);
  
  // Handle tap
  const handleTap = () => {
    if (gameState === 'playing') {
      setScore(prev => prev + 1);
      playTap();
    }
  };
  
  // Save score and return to home
  const saveScore = () => {
    if (playerName.trim()) {
      try {
        const newScore: Score = {
          id: uuidv4(),
          name: playerName.trim(),
          score,
          date: new Date().toISOString().split('T')[0],
        };
        
        let leaderboard: Score[] = [];
        const storedLeaderboard = localStorage.getItem('leaderboard');
        
        if (storedLeaderboard) {
          leaderboard = JSON.parse(storedLeaderboard);
        } else {
          leaderboard = [...mockLeaderboard];
        }
        
        leaderboard.push(newScore);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        
        // Navigate to leaderboard
        router.push('/leaderboard');
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };
  
  return (
    <main className={styles.main}>
      <Header />
      
      <div id="game-container" className={styles.gameContainer}>
        {gameState === 'ready' && (
          <motion.div 
            className={styles.readyScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Ready to tap?</h2>
            <p>You have 10 seconds to tap as many times as you can!</p>
            <Button 
              size="large"
              onClick={startGame}
              tilt={true}
            >
              Start Game
            </Button>
          </motion.div>
        )}
        
        {gameState === 'playing' && (
          <motion.div 
            className={styles.gameScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Scoreboard score={score} timeLeft={timeLeft} message={message} />
            
            <Button 
              variant="tap"
              onClick={handleTap}
              className={styles.tapButton}
            >
              TAP!
            </Button>
          </motion.div>
        )}
        
        {gameState === 'finished' && (
          <motion.div 
            className={styles.finishedScreen}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isTopScore && (
              <ReactConfetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={500}
                gravity={0.2}
              />
            )}
            
            <h2 className={styles.finalScore}>
              {score} <span>taps</span>
            </h2>
            
            {score > highScore && (
              <p className={styles.newHighScore}>New High Score! 🏆</p>
            )}
            
            <div className={styles.nameInput}>
              <label htmlFor="playerName">Enter your name:</label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={15}
                placeholder="Your name"
                className={styles.input}
              />
            </div>
            
            <div className={styles.actions}>
              <Button onClick={saveScore} disabled={!playerName.trim()}>
                Save Score
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={() => router.push('/')}
              >
                <FiX size={16} /> Cancel
              </Button>
            </div>
            
            <div className={styles.playAgain}>
              <Button 
                onClick={() => {
                  setGameState('ready');
                  setScore(0);
                  setTimeLeft(10);
                }}
              >
                Play Again
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
} 