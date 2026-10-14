/**
 * CareerPulse AI - Empty State Component
 * Displayed when search queries, filters, or bookmark collections have no matching items.
 */

import React from 'react';
import { SearchX, Inbox } from 'lucide-react';
import Button from './Button.jsx';

export const EmptyState = ({
  title = 'No records found',
  description = 'Try adjusting your search keywords or district filter.',
  onReset,
  icon: Icon = SearchX
}) => {
  return (
    <div className="rounded-3xl border border-dashed border-[#eee8e2] bg-white/60 p-10 text-center space-y-3 max-w-md mx-auto my-6 animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-[#dec7e0]/30 flex items-center justify-center mx-auto text-[#361a3b]">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-[#2d2a32]">{title}</h3>
      <p className="text-xs text-[#6b6475] leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
      {onReset && (
        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
