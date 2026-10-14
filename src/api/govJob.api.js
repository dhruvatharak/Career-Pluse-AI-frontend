/**
 * CareerPulse AI - Government Jobs API Service
 */

import axiosClient from './axiosClient.js';

export const fetchGovJobs = async ({ level = '10th', search = '' } = {}) => {
  const params = new URLSearchParams();
  if (level && level !== 'All') params.append('level', level);
  if (search) params.append('search', search);

  return await axiosClient.get(`/gov-jobs?${params.toString()}`);
};
