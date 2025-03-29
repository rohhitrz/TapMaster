'use client';

import React, { ButtonHTMLAttributes, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import styles from '../styles/Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tap';
  tilt?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  tilt = false,
  size = 'medium',
  className,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (tilt && buttonRef.current) {
      VanillaTilt.init(buttonRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.4,
      });
    }
    
    return () => {
      if (buttonRef.current && tilt) {
        // @ts-ignore - vanilla-tilt adds this property to the element
        buttonRef.current.vanillaTilt?.destroy();
      }
    };
  }, [tilt]);

  return (
    <motion.button
      ref={buttonRef}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}; 