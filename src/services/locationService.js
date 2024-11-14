// src/services/busService.js
import axios from 'axios';

const BASE_URL = 'https://stagebusapi.onrender.com/api/';

export const fetchStops = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/stops`);
      return response.data.map((stop) => ({
        id: stop.id,
        location_name: stop.location_name,
        coordinate: stop.coordinates ? `${stop.coordinates.latitude}, ${stop.coordinates.longitude}` : 'N/A',
        city_name: stop.city_name,
      }));
    } catch (error) {
      console.error('Error fetching bus stops:', error);
      throw error;
    }
  };
  
  
  