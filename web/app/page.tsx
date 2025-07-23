"use client"

import React from 'react';
import Hero from '@/components/Hero';

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
      
      {/* Anchor Section (for demonstration, can be replaced with real content) */}
      <div id="meet-agent" className="w-full flex flex-col items-center py-24 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Meet Your AI Agent</h3>
      </div>
    </div>
  );
}
