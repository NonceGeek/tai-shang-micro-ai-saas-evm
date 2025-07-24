"use client"

import React from 'react';
import Hero from '@/components/Hero';
import AgentSection from '@/components/AgentSection';
import TargetAudienceSection from '@/components/TargetAudienceSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import GetStartedSection from '@/components/GetStartedSection';
import AllTaskSection from '@/components/AllTaskSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white dark:bg-black">
      {/* Hero Section */}
      <Hero 
        title="Leverage AI agents as your business workforce"
        subtitle="Assign each an on-chain identity </>"
        ctaText="Start to meet a specific AI agent --- Smarter, and easier than ever."
        ctaHref="#meet-agent"
      />
      
      {/* Agent Section */}
      <AgentSection />
      
      {/* Target Audience Section */}
      <TargetAudienceSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Get Started Section */}
      <GetStartedSection />
      
      {/* All Task Section */}
      <AllTaskSection />
    </div>
  );
}
