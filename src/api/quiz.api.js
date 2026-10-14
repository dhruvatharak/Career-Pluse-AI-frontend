/**
 * CareerPulse AI - Quiz API Client
 */

import axiosClient from './axiosClient.js';

export const fetchQuizQuestions = async () => {
  return await axiosClient.get('/quiz/questions');
};

export const submitQuizAPI = async ({ answers, tenthMarks = null }) => {
  return await axiosClient.post('/quiz/submit', { answers, tenthMarks });
};

export const fetchQuizAttempts = async () => {
  return await axiosClient.get('/quiz/attempts');
};

export default {
  fetchQuizQuestions,
  submitQuizAPI,
  fetchQuizAttempts
};
