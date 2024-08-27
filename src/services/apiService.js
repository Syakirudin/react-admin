// src/services/apiService.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // Use your environment variable

// Create an axios instance with default settings
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Optional: set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('API GET request failed:', error);
    throw error;
  }
};

export const post = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API POST request failed:', error);
    throw error;
  }
};

// Add other methods (put, delete, etc.) as needed
