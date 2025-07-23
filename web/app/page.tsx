"use client"

import React, { useState, useEffect } from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center w-full px-4 pt-16">
        <h1 className="text-4xl sm:text-6xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Leverage AI agents as your business workforce
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium text-center text-gray-600 dark:text-gray-300">
          Assign each an on-chain identity {'</>'}
        </h2>
        {/* Call to Action */}
        <div className="w-full flex flex-col items-center mt-8">
          <a href="#meet-agent" className="inline-block px-8 py-3 bg-black text-white rounded-full text-lg font-semibold shadow-lg hover:bg-gray-800 transition-colors">
            Start to meet a specific AI agent --- Smarter, and easier than ever.
          </a>
        </div>
      </div>
      {/* Anchor Section (for demonstration, can be replaced with real content) */}
      <div id="meet-agent" className="w-full flex flex-col items-center py-24 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Meet Your AI Agent</h3>
      </div>
    </div>
  );
}
