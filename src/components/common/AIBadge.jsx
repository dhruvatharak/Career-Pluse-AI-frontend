/**
 * CareerPulse AI - AI / Fallback Status Badge
 * Renders standardized badges:
 *   - "AI-generated (Groq)"
 *   - "AI-generated (Gemini)"
 *   - "Rule-based (AI unavailable)"
 * In NODE_ENV=development only, displays the fallbackReason as a tooltip.
 */

import React from 'react';
import Badge from './Badge';

export const AIBadge = ({ generatedBy, fallbackReason, size = 'xs', className = '' }) => {
  const isDev = Boolean(import.meta.env?.DEV || import.meta.env?.MODE === 'development');
  const tooltip = isDev && fallbackReason ? `Fallback reason: ${fallbackReason}` : undefined;

  if (generatedBy === 'groq') {
    return (
      <Badge variant="green" size={size} title={tooltip} className={className}>
        AI-generated (Groq)
      </Badge>
    );
  }

  if (generatedBy === 'gemini') {
    return (
      <Badge variant="blue" size={size} title={tooltip} className={className}>
        AI-generated (Gemini)
      </Badge>
    );
  }

  return (
    <Badge variant="yellow" size={size} title={tooltip} className={className}>
      Rule-based (AI unavailable)
    </Badge>
  );
};

export default AIBadge;
