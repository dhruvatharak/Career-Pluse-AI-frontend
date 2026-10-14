/**
 * CareerPulse AI - Navigation Bar Component
 * Displays Tamil Nadu branding, navigation tabs, user district & category badges, and session controls.
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  GraduationCap,
  Sparkles,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Compass,
  BookOpen,
  Menu,
  X
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return 'S';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#eee8e2] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tamil Nadu Branding */}
          <Link
            to="/"
            className="flex items-center gap-3 group select-none text-decoration-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#ffcd64] flex items-center justify-center shadow-xs border border-[#eab134] group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7 text-[#2d2a32]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#2d2a32]">
                  CareerPulse
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-[#dec7e0] text-[#361a3b]">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#6b6475]">
                TN Student Pathway <span className="text-[#a49ca8]">|</span> கல்வி வழிகாட்டி
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                isActive('/')
                  ? 'bg-[#b1dfe4]/40 text-[#123940]'
                  : 'text-[#4f4a56] hover:bg-[#faf7f5]'
              }`}
            >
              Home <span className="text-xs font-normal opacity-70">(முகப்பு)</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  isActive('/profile')
                    ? 'bg-[#b1dfe4]/40 text-[#123940]'
                    : 'text-[#4f4a56] hover:bg-[#faf7f5]'
                }`}
              >
                Profile <span className="text-xs font-normal opacity-70">(சுயவிவரம்)</span>
              </Link>
            )}
          </nav>

          {/* Desktop Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Student Info Chip */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#faf7f5] border border-[#eee8e2] hover:border-[#dec7e0] transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#c3df96] flex items-center justify-center font-black text-xs text-[#1e3a12]">
                    {getInitials(user?.name)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#2d2a32] truncate max-w-[120px]">
                      {user?.name || 'Student'}
                    </p>
                    <p className="text-[10px] font-semibold text-[#6b6475]">
                      {user?.category || 'General'} • {user?.district || 'TN'}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl text-[#6b6475] hover:text-[#78192a] hover:bg-[#fcdde3]/50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-bold text-[#2d2a32] hover:bg-[#faf7f5] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-2xl text-sm font-bold bg-[#ffcd64] text-[#2d2a32] hover:bg-[#f5be4f] shadow-xs border border-[#ebb23e] transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Register Free</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#2d2a32] hover:bg-[#faf7f5]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#eee8e2] bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-bold text-[#2d2a32] hover:bg-[#faf7f5]"
          >
            Home / முகப்பு
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-bold text-[#2d2a32] hover:bg-[#faf7f5]"
              >
                Profile / சுயவிவரம் ({user?.name})
              </Link>
              <div className="pt-2 border-t border-[#eee8e2]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-xl text-base font-bold text-[#78192a] hover:bg-[#fcdde3]/40 flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 border-t border-[#eee8e2] space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-bold bg-[#faf7f5] text-[#2d2a32]"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-2xl text-sm font-bold bg-[#ffcd64] text-[#2d2a32]"
              >
                Register Free
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
