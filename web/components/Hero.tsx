"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function TypewriterText({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-block"
    >
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-gray-600 dark:bg-gray-300 ml-1"
        />
      )}
    </motion.span>
  );
}

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export default function Hero({ title, subtitle, ctaText, ctaHref }: HeroProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full px-4 pt-16 relative">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-6xl font-bold text-center mb-4 text-gray-900 dark:text-white"
      >
        {title}
      </motion.h1>
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-xl sm:text-2xl font-medium text-center text-gray-600 dark:text-gray-300 min-h-[2rem]"
      >
        <TypewriterText text={subtitle} speed={80} />
      </motion.h2>
      
      {/* Call to Action - Positioned at bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.a 
          href={ctaHref} 
          className="inline-block px-8 py-3 bg-black text-white rounded-full text-lg font-semibold shadow-lg hover:bg-gray-800 transition-colors relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="relative z-10">{ctaText}</span>
        </motion.a>
      </motion.div>
    </div>
  );
} 