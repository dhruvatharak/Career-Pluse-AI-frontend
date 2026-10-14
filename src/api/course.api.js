/**
 * CareerPulse AI - Course API Client
 */

import axiosClient from './axiosClient.js';

export const fetchTopCourses = async ({ stream = '', limit = 12 } = {}) => {
  const params = {};
  if (stream && stream !== 'All') params.stream = stream;
  if (limit) params.limit = limit;

  return await axiosClient.get('/courses/top', { params });
};

export const fetchCourses = async ({ stream = '', search = '' } = {}) => {
  const params = {};
  if (stream && stream !== 'All') params.stream = stream;
  if (search) params.search = search;

  return await axiosClient.get('/courses', { params });
};

export const fetchCourseById = async (courseId) => {
  return await axiosClient.get(`/courses/${courseId}`);
};

export default {
  fetchTopCourses,
  fetchCourses,
  fetchCourseById
};
