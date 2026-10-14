/**
 * CareerPulse AI - Modal Dialog Component
 * Reusable accessible modal dialog that supports Esc key and backdrop click to dismiss.
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl'
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2d2a32]/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Modal Dialog Window */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-3xl shadow-2xl border border-[#eee8e2] overflow-hidden flex flex-col max-h-[90vh] my-auto z-10 animate-fade-in`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#eee8e2] flex items-start justify-between gap-4 bg-[#faf7f5]">
          <div>
            <h2 className="text-xl font-extrabold text-[#2d2a32]">{title}</h2>
            {subtitle && (
              <p className="text-xs font-semibold text-[#6b6475] mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-2xl text-[#6b6475] hover:text-[#2d2a32] hover:bg-[#eee8e2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
