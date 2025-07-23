"use client"

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/20' 
        : 'bg-transparent'
    }`}>
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          Tai Shang Micro AI
        </div>
        <div>
          <appkit-button />
        </div>
      </div>
    </header>
  );
} 