"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Users, Bot } from 'lucide-react';

export default function TargetAudienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      title: "Developers",
      subtitle: "Leverage AI Agents to streamline onboarding and boost earnings like a pro.",
      icon: Code,
    },
    {
      title: "Freelancers & Creators",
      subtitle: "Automate repetitive tasks with AI for enhanced efficiency.",
      icon: Users,
    },
    {
      title: "AI Agents",
      subtitle: "Partner with AI to enhance human collaboration and efficiently complete tasks.",
      icon: Bot,
    }
  ];

  return (
    <div ref={ref} className="min-h-screen relative w-full flex flex-col justify-center items-center bg-white">
      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#4b3fdd]">
            Who is AI SaaS for?
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            🎯 With the AI SaaS Market, you can always find the perfect solution to complete your tasks efficiently and on time.
          </p>
        </motion.div>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={
                  `bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition-all duration-300 cursor-pointer` +
                  " " +
                  "!shadow-[0_-2px_24px_0_rgba(75,63,221,0.10),0_8px_32px_0_rgba(0,0,0,0.10)]"
                }
              >
                {/* Icon */}
                <div className="mb-6">
                  <IconComponent className="w-16 h-16" color="#4b3fdd" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {card.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-gray-600 leading-relaxed">
                  {card.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 