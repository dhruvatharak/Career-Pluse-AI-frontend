/**
 * CareerPulse AI - Authentication API Services
 * Direct API calls for registering, signing in, and fetching current student session.
 */

import axiosClient from './axiosClient.js';

export const registerUser = async (userData) => {
  return await axiosClient.post('/auth/register', userData);
};

export const loginUser = async (credentials) => {
  return await axiosClient.post('/auth/login', credentials);
};

export const getCurrentUser = async () => {
  return await axiosClient.get('/auth/me');
};

export const fetchUserProfile = async () => {
  return await axiosClient.get('/users/profile');
};
