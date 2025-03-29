import React from 'react';
import './styles/globals.scss';
import type { Metadata } from 'next';
import { ThemeProvider } from './components/ThemeProvider';

export const metadata: Metadata = {
  title: 'TapMaster Arcade',
  description: 'A fast-paced pixel-inspired reaction tap game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 