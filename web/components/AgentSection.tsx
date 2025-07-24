"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AgentStats from './AgentStats';
import TaskMarquee from './TaskMarquee';

export default function AgentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} id="meet-agent" className="min-h-screen relative w-full flex flex-col justify-center items-center" style={{ background: 'rgb(44,40,64)' }}>
      {/* Top gradient mask */}
      <div
        className="absolute left-0 right-0 top-0 h-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, transparent, rgb(44,40,64) 90%)'
        }}
      />
      
      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
        {/* Agent Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <AgentStats />
        </motion.div>
        
        {/* Task Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          <TaskMarquee />
        </motion.div>
      </div>
    </div>
  );
} 