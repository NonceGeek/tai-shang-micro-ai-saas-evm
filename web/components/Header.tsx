"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/60 dark:bg-black/60 backdrop-blur-md border-b border-gray-200/20' 
        : 'bg-transparent'
    }`}>
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-xl font-bold text-[#2c2840] dark:text-white">
          Tai Shang Micro AI
        </Link>
        <div className='rounded-full bg-[#2c2840]'>
          <appkit-button />
        </div>
      </div>
    </header>
  );
} 