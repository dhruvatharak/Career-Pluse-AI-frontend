/**
 * CareerPulse AI - Diploma API Client
 */

import axiosClient from './axiosClient.js';

export const fetchDiplomaCourses = async (search = '') => {
  const params = search ? { search } : {};
  return await axiosClient.get('/diploma/courses', { params });
};

export const fetchDiplomaColleges = async ({
  district = '',
  course = '',
  type = '',
  search = ''
} = {}) => {
  const params = {};
  if (district && district !== 'All') params.district = district;
  if (course && course !== 'All') params.course = course;
  if (type && type !== 'All') params.type = type;
  if (search) params.search = search;

  return await axiosClient.get('/diploma/colleges', { params });
};

export const recommendDiplomaAPI = async ({ interests, district = '' }) => {
  return await axiosClient.post('/diploma/recommend', { interests, district });
};

export default {
  fetchDiplomaCourses,
  fetchDiplomaColleges,
  recommendDiplomaAPI
};
