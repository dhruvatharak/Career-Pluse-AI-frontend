/**
 * CareerPulse AI - Loader Component
 * Friendly animated spinner & skeleton loading states.
 */

import React from 'react';
import { Sparkles } from 'lucide-react';

export const Loader = ({ message = 'Loading educational pathways...', size = 'md' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3 animate-fade-in">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#dec7e0] border-t-[#ffcd64] animate-spin" />
        <Sparkles className="w-5 h-5 text-[#ffcd64] absolute animate-pulse" />
      </div>
      <p className="text-xs sm:text-sm font-semibold text-[#6b6475]">{message}</p>
    </div>
  );
};

export const SkeletonCard = () => (
  <div className="rounded-3xl border border-[#eee8e2] bg-white p-6 space-y-4 animate-pulse">
    <div className="h-4 bg-[#dec7e0]/40 rounded-full w-2/5" />
    <div className="h-6 bg-[#eee8e2] rounded-xl w-4/5" />
    <div className="space-y-2 pt-2">
      <div className="h-3.5 bg-[#eee8e2] rounded-md w-full" />
      <div className="h-3.5 bg-[#eee8e2] rounded-md w-3/4" />
    </div>
  </div>
);

export default Loader;
