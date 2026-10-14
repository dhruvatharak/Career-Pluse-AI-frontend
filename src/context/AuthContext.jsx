/**
 * CareerPulse AI - Authentication Context & Provider
 * Manages global user authentication state, tokens, and session persistence across page refreshes.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { registerUser, loginUser, getCurrentUser } from '../api/auth.api.js';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('careerpulse_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('careerpulse_token') || null);
  const [loading, setLoading] = useState(true);

  // Validate session with server on initial app load
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('careerpulse_token');
      if (storedToken) {
        try {
          const res = await getCurrentUser();
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('careerpulse_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('[Auth] Session expired or invalid:', err.message);
          logout(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleRegister = async (formData) => {
    try {
      const res = await registerUser(formData);
      const { user: registeredUser, token: authToken } = res.data;

      localStorage.setItem('careerpulse_token', authToken);
      localStorage.setItem('careerpulse_user', JSON.stringify(registeredUser));

      setToken(authToken);
      setUser(registeredUser);

      toast.success(`Welcome to CareerPulse, ${registeredUser.name}!`);
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Registration failed');
      return { success: false, error: err.message };
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      const { user: loggedInUser, token: authToken } = res.data;

      localStorage.setItem('careerpulse_token', authToken);
      localStorage.setItem('careerpulse_user', JSON.stringify(loggedInUser));

      setToken(authToken);
      setUser(loggedInUser);

      toast.success(`Welcome back, ${loggedInUser.name}!`);
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Login failed');
      return { success: false, error: err.message };
    }
  };

  const logout = (showToast = true) => {
    localStorage.removeItem('careerpulse_token');
    localStorage.removeItem('careerpulse_user');
    setToken(null);
    setUser(null);
    if (showToast) {
      toast.success('Signed out successfully');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        register: handleRegister,
        login: handleLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
