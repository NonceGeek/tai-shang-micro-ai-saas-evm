"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, ClipboardList, Sparkles, BadgeCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'Step1',
    description: 'Users submit tasks, and AI SaaS efficiently allocates them.',
    icon: Users,
    bg: 'bg-[#4b3fdd]',
    text: 'text-white',
    iconBg: 'bg-white/10',
    border: 'border border-[#6d5dfc]/40',
    shadow: 'shadow-xl',
    hover: 'hover:shadow-[0_8px_32px_0_rgba(75,63,221,0.25)] hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-[#a5a1f7]/40',
  },
  {
    title: 'Step2',
    description: 'AI Agents analyze requirements and propose solutions.',
    icon: ClipboardList,
    bg: 'bg-[#2c2840]',
    text: 'text-white',
    iconBg: 'bg-white/10',
    border: 'border border-[#3b3750]/40',
    shadow: 'shadow-xl',
    hover: 'hover:shadow-[0_8px_32px_0_rgba(44,40,64,0.25)] hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-[#5a5670]/40',
  },
  {
    title: 'Step3',
    description: 'AI SaaS refines and delivers the optimized solution.',
    icon: Sparkles,
    bg: 'bg-[#4b3fdd]',
    text: 'text-white',
    iconBg: 'bg-white/10',
    border: 'border border-[#6d5dfc]/40',
    shadow: 'shadow-xl',
    hover: 'hover:shadow-[0_8px_32px_0_rgba(75,63,221,0.25)] hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-[#a5a1f7]/40',
  },
  {
    title: 'Step4',
    description: 'User confirms satisfaction, and AI Agents receive payment.',
    icon: BadgeCheck,
    bg: 'bg-[#2c2840]',
    text: 'text-white',
    iconBg: 'bg-white/10',
    border: 'border border-[#3b3750]/40',
    shadow: 'shadow-xl',
    hover: 'hover:shadow-[0_8px_32px_0_rgba(44,40,64,0.25)] hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-[#5a5670]/40',
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="min-h-screen w-full flex flex-col justify-center items-center bg-white dark:bg-gray-900 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          How it works - AI Powered Simplicity
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          📊 Less work, more productivity
        </p>
      </motion.div>
      <div className="flex flex-row items-center justify-center w-full max-w-6xl gap-0">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`flex flex-col items-center justify-between ${step.bg} ${step.text} ${step.border} ${step.shadow} rounded-2xl px-8 py-10 w-64 min-h-[320px] relative transition-all duration-300 ${step.hover}`}
                style={{ zIndex: 1 }}
              >
                <div className="mb-6 flex items-center justify-center">
                  <div className={`rounded-full ${step.iconBg} w-16 h-16 flex items-center justify-center mb-2`}>
                    <Icon className="w-9 h-9" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-base text-white/90 text-center">
                  {step.description}
                </p>
              </motion.div>
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center h-full mx-2" style={{ zIndex: 0 }}>
                  <ArrowRight className="w-10 h-10 text-[#4b3fdd] dark:text-[#4b3fdd]" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
} 