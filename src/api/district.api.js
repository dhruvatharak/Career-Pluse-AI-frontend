/**
 * CareerPulse AI - Districts API Service
 */

import axiosClient from './axiosClient.js';

export const fetchDistricts = async () => {
  return await axiosClient.get('/districts');
};
