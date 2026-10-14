/**
 * CareerPulse AI - User & Profile API Client
 */

import axiosClient from './axiosClient.js';

export const fetchUserProfile = async () => {
  return await axiosClient.get('/users/profile');
};

export const updateUserProfile = async (payload) => {
  return await axiosClient.patch('/users/profile', payload);
};

export const updateUserPassword = async (payload) => {
  return await axiosClient.patch('/users/password', payload);
};

export const deleteRecommendationAPI = async (id) => {
  return await axiosClient.delete(`/recommendations/${id}`);
};

export default {
  fetchUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteRecommendationAPI
};
