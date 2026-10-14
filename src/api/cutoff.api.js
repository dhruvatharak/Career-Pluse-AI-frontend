/**
 * CareerPulse AI - Cutoff API Client
 */

import axiosClient from './axiosClient.js';

export const calculateCutoffAPI = async (payload) => {
  return await axiosClient.post('/cutoff/calculate', payload);
};

export const fetchMyCutoff = async () => {
  return await axiosClient.get('/cutoff/me');
};

export default {
  calculateCutoffAPI,
  fetchMyCutoff
};
