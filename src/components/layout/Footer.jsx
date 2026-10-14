/**
 * CareerPulse AI - Footer Component
 * Highlights Tamil Nadu educational disclaimer, about statement, and official verification notes.
 */

import React from 'react';
import { OFFICIAL_DISCLAIMER, OFFICIAL_DISCLAIMER_TA } from '../../shared/constants.js';
import { GraduationCap, ShieldCheck, Info } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#eee8e2] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        
        {/* Official Statutory Disclaimer & About Card */}
        <div className="rounded-3xl bg-[#faf7f5] border border-[#eee8e2] p-5 sm:p-6 text-xs text-[#6b6475] space-y-3">
          <div className="flex items-center gap-2 font-bold text-[#2d2a32] text-sm">
            <ShieldCheck className="w-5 h-5 text-[#ffcd64] shrink-0" />
            <span>Important Statutory Notice / முக்கியமான அறிவிப்பு</span>
          </div>
          <p className="leading-relaxed">{OFFICIAL_DISCLAIMER}</p>
          <p className="leading-relaxed opacity-90 font-medium">{OFFICIAL_DISCLAIMER_TA}</p>

          <div className="pt-2 border-t border-[#eee8e2] flex items-center gap-2 text-[11px] font-bold text-[#123940]">
            <Info className="w-4 h-4 text-[#b1dfe4] shrink-0" />
            <span>Sample data for demonstration – verify with official sources (DGE, TNEA, DME, DoTE, TNPSC notifications).</span>
          </div>
        </div>

        {/* Footer Brand & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#6b6475]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#ffcd64] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-[#2d2a32]" />
            </div>
            <span>CareerPulse AI © {new Date().getFullYear()} — Built for Tamil Nadu Students (கல்வி வழிகாட்டி)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#a49ca8]">
            <span>MERN Stack + AI Pathways (Groq / Gemini)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
