/**
 * CareerPulse AI - Recommendation API Client
 */

import axiosClient from './axiosClient.js';

export const fetchRecommendations = async (type = '') => {
  const params = type ? { type } : {};
  return await axiosClient.get('/recommendations', { params });
};

export const fetchRecommendationById = async (id) => {
  return await axiosClient.get(`/recommendations/${id}`);
};

export default {
  fetchRecommendations,
  fetchRecommendationById
};
