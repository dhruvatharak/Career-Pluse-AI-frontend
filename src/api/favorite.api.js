/**
 * CareerPulse AI - Favorites API Service
 */

import axiosClient from './axiosClient.js';

export const fetchFavorites = async () => {
  return await axiosClient.get('/favorites');
};

export const addFavoriteAPI = async (itemType, itemId) => {
  return await axiosClient.post('/favorites', { itemType, itemId });
};

export const removeFavoriteAPI = async (itemType, itemId) => {
  return await axiosClient.delete(`/favorites/${itemType}/${itemId}`);
};
