/**
 * CareerPulse AI - Demo Data Badge Component
 * Renders a subtle badge on items marked with isSample=true.
 * Controlled globally by SHOW_DEMO_BADGE in shared/constants.js.
 */

import React from 'react';
import { SHOW_DEMO_BADGE } from '../../shared/constants.js';

export const DemoDataBadge = ({ isSample }) => {
  if (!SHOW_DEMO_BADGE || isSample === false) return null;

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#dec7e0]/60 text-[#361a3b] border border-[#c9accb]/60 uppercase tracking-wider select-none shrink-0"
      title="Sample data for demonstration – verify with official sources"
    >
      Demo Data
    </span>
  );
};

export default DemoDataBadge;
