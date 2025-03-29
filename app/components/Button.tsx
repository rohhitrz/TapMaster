'use client';

import React, { ButtonHTMLAttributes, useRef, useEffect } from 'react';
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
      if (tilt) {
        const element = buttonRef.current;
        if (element) {
          // @ts-expect-error - vanilla-tilt adds this property to the element
          element.vanillaTilt?.destroy();
        }
      }
    };
  }, [tilt]);

  return (
    <button
      ref={buttonRef}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}; 