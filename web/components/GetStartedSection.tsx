"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings, SlidersHorizontal, Link2, Rocket, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const steps = [
  {
    title: '#1 Setup & Configuration',
    description: 'Initialize your AI Agent with custom settings to align with your specific needs.',
    icon: Settings,
  },
  {
    title: '#2 Training & Calibration',
    description: 'Provide initial data and guidance to refine the AI Agent’s skills and accuracy.',
    icon: SlidersHorizontal,
  },
  {
    title: '#3 Integration & Testing',
    description: 'Connect the AI Agent to your workflow and test its performance for seamless operation.',
    icon: Link2,
  },
  {
    title: '#4 Launch & Optimization',
    description: 'Deploy the AI Agent and continuously optimize its tasks for maximum efficiency.',
    icon: Rocket,
  },
];

export default function GetStartedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState(false);

  return (
    <div ref={ref} className="min-h-screen w-full flex items-center justify-center bg-[#2c2840] py-24 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-12 md:gap-0">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex flex-col justify-center md:items-start items-center mb-12 md:mb-0 md:pr-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-left md:text-left text-center">
            Get Started with AI SaaS
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-md text-left md:text-left text-center">
            Empower your workflow in just a few simple steps.
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className="px-8 py-3 rounded-full bg-white text-[#6d5dfc] font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                onClick={() => setOpen(true)}
              >
                Go Onboard
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-xs sm:max-w-sm bg-[#2c2840] backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
              <DialogHeader>
                <DialogTitle className="text-xl text-white">onboarding</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-4">
                <Button
                  variant="outline"
                  className="flex items-center justify-between w-full text-base font-semibold px-6 py-3 border-white/30 bg-white/5 hover:bg-white/10 text-white hover:text-white"
                  onClick={() => window.open('https://github.com/NonceGeek/tai-shang-micro-ai-saas/tree/main/agents', '_blank')}
                >
                  <span className="text-white">Template</span>
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-between w-full text-base font-semibold px-6 py-3 border-white/30 bg-white/5 hover:bg-white/10 text-white hover:text-white"
                  onClick={() => window.open('https://did.rootmud.xyz/', '_blank')}
                >
                  <span className="text-white">DID Manager</span>
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                className={
                  `w-72 h-78 flex flex-col items-center justify-between p-8 rounded-2xl ` +
                  `bg-white/10 backdrop-blur-md border border-white/20 shadow-xl ` +
                  `hover:shadow-[0_8px_32px_0_rgba(75,63,221,0.18)] hover:-translate-y-2 hover:scale-105 transition-all duration-300`
                }
              >
                <div className="mb-4 flex items-center justify-center">
                  <div className="rounded-full bg-white/10 w-14 h-14 flex items-center justify-center mb-2">
                    <Icon className="w-8 h-8 text-[#a5a1f7]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white text-center min-h-[48px] flex items-center justify-center">
                  {step.title}
                </h3>
                <p className="text-white/80 text-center text-base flex-1 flex items-center justify-center">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
} 