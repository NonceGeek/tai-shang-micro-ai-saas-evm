"use client";
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AllTaskSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  return (
    <div ref={ref} className="min-h-screen w-full flex items-center justify-center bg-[#4b3fdd] px-4 py-24">
      <div className="flex flex-col md:flex-row w-full max-w-7xl h-full">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex flex-col justify-end md:justify-center items-start md:items-start mb-12 md:mb-0 md:pl-8"
          style={{ minHeight: '400px' }}
        >
          <div className="mb-8 mt-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Tap to <br />Check All Tasks
            </h2>
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#4b3fdd] font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
              onClick={() => router.push('/tasks')}
            >
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                className="inline-flex"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
              Learn more
            </button>
          </div>
        </motion.div>
        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex items-center justify-center"
          style={{ minHeight: '400px' }}
        >
          {/* Simplified, balanced SVG illustration */}
          <svg width="420" height="340" viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Layered circles */}
            <circle cx="210" cy="170" r="140" fill="#fff" fillOpacity="0.08" />
            <circle cx="290" cy="120" r="80" fill="#fff" fillOpacity="0.10" />
            <circle cx="140" cy="240" r="60" fill="#fff" fillOpacity="0.13" />
            {/* Main document */}
            <rect x="150" y="110" width="120" height="140" rx="22" fill="#fff" fillOpacity="0.18" />
            <rect x="175" y="145" width="70" height="16" rx="6" fill="#fff" fillOpacity="0.35" />
            <rect x="175" y="170" width="90" height="10" rx="5" fill="#fff" fillOpacity="0.25" />
            <rect x="175" y="190" width="50" height="10" rx="5" fill="#fff" fillOpacity="0.18" />
            {/* Checkmark */}
            <path d="M200 220 l18 18 l36 -36" stroke="#4b3fdd" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Sparkles */}
            <g>
              <circle cx="350" cy="90" r="5" fill="#fff" fillOpacity="0.7" />
              <circle cx="320" cy="70" r="3" fill="#fff" fillOpacity="0.5" />
              <circle cx="370" cy="170" r="4" fill="#fff" fillOpacity="0.6" />
              <circle cx="120" cy="300" r="4" fill="#fff" fillOpacity="0.4" />
            </g>
            {/* Techy lines/arcs */}
            <g stroke="#fff" strokeOpacity="0.18" strokeWidth="3" fill="none">
              <path d="M320 60 Q350 100 380 80" />
              <path d="M110 210 Q130 250 180 220" />
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
} 