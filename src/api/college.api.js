/**
 * CareerPulse AI - Degree College API Client
 */

import axiosClient from './axiosClient.js';

export const fetchColleges = async ({
  exam = '',
  district = '',
  tier = '',
  type = '',
  course = '',
  search = '',
  sort = 'tier',
  page = 1,
  limit = 12
} = {}) => {
  const params = {};
  if (exam && exam !== 'All') params.exam = exam;
  if (district && district !== 'All') params.district = district;
  if (tier && tier !== 'All') params.tier = tier;
  if (type && type !== 'All') params.type = type;
  if (course && course !== 'All') params.course = course;
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (page) params.page = page;
  if (limit) params.limit = limit;

  return await axiosClient.get('/colleges', { params });
};

export const fetchCollegeById = async (collegeId) => {
  return await axiosClient.get(`/colleges/${collegeId}`);
};

export const fetchCollegesMatch = async () => {
  return await axiosClient.get('/colleges/match');
};

export default {
  fetchColleges,
  fetchCollegeById,
  fetchCollegesMatch
};
