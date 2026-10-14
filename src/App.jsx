/**
 * CareerPulse AI - Root Application Component
 * Sets up global providers (ErrorBoundary, Auth, Router, Toaster) and consistent layout structure.
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col bg-[#faf7f5] text-[#2d2a32]">
              {/* Notification Toaster with pastel styling */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#ffffff',
                    color: '#2d2a32',
                    borderRadius: '16px',
                    border: '1px solid #eee8e2',
                    padding: '12px 18px',
                    fontSize: '13px',
                    fontWeight: '600',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                  },
                  success: {
                    iconTheme: {
                      primary: '#c3df96',
                      secondary: '#1e3a12'
                    }
                  },
                  error: {
                    iconTheme: {
                      primary: '#fcdde3',
                      secondary: '#78192a'
                    }
                  }
                }}
              />

              <Navbar />

              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
                <AppRoutes />
              </main>

              <Footer />
            </div>
          </FavoritesProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
