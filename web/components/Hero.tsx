"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Neon gradients for a more tech/futuristic look
    function getNeonGradient(y: number, color1: string, color2: string) {
      if (!ctx) return undefined as unknown as CanvasGradient;
      const grad = ctx.createLinearGradient(0, y, width, y);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      return grad;
    }

    // Draw subtle grid lines for a tech feel
    function drawGrid() {
      if (!ctx) return;
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawWave(offset: number, amplitude: number, frequency: number, color: CanvasGradient | string, speed: number, verticalShift: number, phase: number, alpha: number) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, verticalShift);
      for (let x = 0; x <= width; x += 2) {
        const y = verticalShift + Math.sin((x + offset) * frequency + offset * speed + phase) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    let t = 0;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      // Parallax: waves move at different speeds
      drawWave(t * 1.1, 90 + 20 * Math.sin(t * 0.01), 0.008 + 0.002 * Math.sin(t * 0.008), getNeonGradient(height * 0.38, '#00fff7', '#3b82f6'), 0.002, height * 0.38, 0, 0.18);
      drawWave(t * 1.4, 60 + 10 * Math.cos(t * 0.012), 0.012 + 0.001 * Math.cos(t * 0.01), getNeonGradient(height * 0.52, '#a855f7', '#06b6d4'), 0.003, height * 0.52, Math.PI / 2, 0.22);
      drawWave(t * 1.7, 40 + 15 * Math.sin(t * 0.008 + 1), 0.018 + 0.001 * Math.sin(t * 0.012), getNeonGradient(height * 0.68, '#f472b6', '#818cf8'), 0.004, height * 0.68, Math.PI, 0.25);
      // Add a thin, bright, sharp wave for extra tech feel
      drawWave(t * 2.2, 18, 0.022, getNeonGradient(height * 0.60, '#fff', '#60a5fa'), 0.006, height * 0.60, Math.PI / 3, 0.5);
      t += 1;
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ display: 'block' }}
    />
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
    <div className="min-h-screen flex flex-col justify-center items-center w-full px-4 pt-16 relative overflow-hidden">
      <WaveBackground />
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-6xl font-bold text-center mb-4 text-gray-900 dark:text-white z-10"
      >
        {title}
      </motion.h1>
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-xl sm:text-2xl font-medium text-center text-gray-600 dark:text-gray-300 min-h-[2rem] z-10"
      >
        <TypewriterText text={subtitle} speed={80} />
      </motion.h2>
      {/* Call to Action - Positioned at bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.a 
          href={ctaHref} 
          className="inline-block px-8 py-3 bg-gray-100 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-200 transition-colors relative overflow-hidden flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Shine effect over the entire button */}
          <motion.span
            className="absolute left-0 top-0 h-full w-full pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)',
            }}
            animate={{ x: ['-110%', '110%'] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
          />
          {/* Glowing background sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="relative z-10 flex items-center gap-2 text-black">
            <motion.span
              animate={{
                x: [0, 4, 0],
                transition: { duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }
              }}
              whileHover={{ x: 8, filter: 'drop-shadow(0 0 6px #3b82f6)' }}
              // transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="flex items-center"
            >
              <ArrowRight size={22} strokeWidth={2.2} />
            </motion.span>
            {ctaText}
          </span>
        </motion.a>
      </motion.div>
    </div>
  );
} 