/**
 * CareerPulse AI - Groups API Service
 */

import axiosClient from './axiosClient.js';

export const fetchGroups = async (search = '') => {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return await axiosClient.get(`/groups${query}`);
};

export const fetchGroupById = async (groupId) => {
  return await axiosClient.get(`/groups/${groupId}`);
};
