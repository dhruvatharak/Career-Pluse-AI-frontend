/**
 * CareerPulse AI - Schools API Service
 */

import axiosClient from './axiosClient.js';

export const fetchSchools = async ({
  district = '',
  search = '',
  sort = 'passPercentage',
  page = 1,
  limit = 12
} = {}) => {
  const params = new URLSearchParams();
  if (district && district !== 'All') params.append('district', district);
  if (search) params.append('search', search);
  if (sort) params.append('sort', sort);
  if (page) params.append('page', page);
  if (limit) params.append('limit', limit);

  return await axiosClient.get(`/schools?${params.toString()}`);
};

export const fetchSchoolById = async (schoolId) => {
  return await axiosClient.get(`/schools/${schoolId}`);
};
