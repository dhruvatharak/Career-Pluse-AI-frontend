/**
 * CareerPulse AI - 12th Career Guide API Client
 */

import axiosClient from './axiosClient.js';

export const getCareerGuideRecommendations = async ({
  options = [],
  district = '',
  preferredCourse = ''
} = {}) => {
  return await axiosClient.post('/career-guide/recommend', {
    options,
    district,
    preferredCourse
  });
};

export const fetchCareerGuideHistory = async () => {
  return await axiosClient.get('/career-guide/history');
};

export default {
  getCareerGuideRecommendations,
  fetchCareerGuideHistory
};
