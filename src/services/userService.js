import { get, post } from './apiService';

export const getUser = async (id) => {
  return get(`users/${id}`);
};

export const createUser = async (userData) => {
  return post('users', userData);
};
