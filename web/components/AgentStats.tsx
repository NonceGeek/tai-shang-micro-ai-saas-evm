"use client";
import React, { useRef } from 'react';
import { useTaskCountStats, useOnlineAgentCount } from '@/hooks/useAgent';
import { motion, useInView } from 'framer-motion';
import { Users, Target, AlertCircle } from 'lucide-react';

export default function AgentStats() {
  const { data: taskStats, isLoading: isTaskStatsLoading, error: taskStatsError } = useTaskCountStats();
  const { data: onlineAgentData, isLoading: isOnlineAgentLoading, error: onlineAgentError } = useOnlineAgentCount();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const isLoading = isTaskStatsLoading || isOnlineAgentLoading;
  const error = taskStatsError || onlineAgentError;

  const cards = [
    {
      title: "Agent Alive",
      value: onlineAgentData?.count ?? 0,
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-300"
    },
    {
      title: "Total Tasks",
      value: taskStats?.total ?? 0,
      icon: Target,
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      textColor: "text-green-300"
    },
    {
      title: "Unsolved Tasks",
      value: taskStats?.unresolved ?? 0,
      icon: AlertCircle,
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-300"
    }
  ];

  return (
    <div ref={ref} className="flex justify-center items-center space-x-8 min-h-[140px]">
      {isLoading ? (
        [...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-48 h-32 bg-white/10 rounded-xl"></div>
          </div>
        ))
      ) : error ? (
        <div className="text-center text-white/60">
          <p>Failed to load agent statistics</p>
        </div>
      ) : (
        cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`w-48 h-32 bg-gradient-to-br ${card.color} backdrop-blur-sm rounded-xl border ${card.borderColor} p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white/80 text-sm font-medium">{card.title}</h3>
                <IconComponent className={`w-6 h-6 ${card.textColor}`} />
              </div>
              <div className="text-right">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={isInView ? { scale: 1 } : { scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className={`text-3xl font-bold ${card.textColor}`}
                >
                  {card.value.toLocaleString()}
                </motion.div>
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
} 