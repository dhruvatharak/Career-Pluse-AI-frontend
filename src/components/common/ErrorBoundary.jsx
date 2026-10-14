/**
 * CareerPulse AI - Global Error Boundary Component
 * Catches unhandled React component tree exceptions and renders a friendly recovery screen.
 */

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Global ErrorBoundary Caught Error]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#faf7f5] flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-white border border-[#eee8e2] shadow-sm p-6 sm:p-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-3xl bg-[#fcdde3] border border-[#f5b8c3] text-[#78192a] mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-extrabold text-[#2d2a32]">
                Something went wrong
              </h1>
              <p className="text-xs font-semibold text-[#6b6475]">
                எதிர்பாராத பிழை ஏற்பட்டது. பக்கத்தை மீண்டும் ஏற்றவும்.
              </p>
              <p className="text-xs text-[#6b6475] leading-relaxed">
                An unexpected interface error occurred. You can reload the page or navigate back to the home portal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-2xl bg-[#ffcd64] hover:bg-[#f5be4f] text-[#2d2a32] text-xs font-extrabold flex items-center justify-center gap-2 border border-[#ebb23e] transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-2xl bg-[#faf7f5] hover:bg-[#eee8e2] text-[#2d2a32] text-xs font-extrabold flex items-center justify-center gap-2 border border-[#eee8e2] transition-all cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home Portal</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
