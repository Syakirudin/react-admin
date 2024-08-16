import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/busStops";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/busStops",
});

const StopService = {
  // Fetch all stops
  getAllBusStops: async () => {
    try {
      const response = await apiClient.get("/busStops");
      return response.data;
    } catch (error) {
      console.error("Error fetching bus stops:", error);
      throw new Error("Unable to fetch bus stops. Please try again later.");
    }
  },

  // Fetch a stop by ID
  getBusStopById: async (id) => {
    try {
      const response = await apiClient.get(`/busStops/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bus stop with ID ${id}:`, error);
      throw new Error(`Unable to fetch bus stop with ID ${id}. Please try again later.`);
    }
  },

  // Create a new stop
  createBusStop: async (stopData) => {
    try {
      const response = await apiClient.post("/busStops", stopData);
      return response.data;
    } catch (error) {
      console.error("Error creating bus stop:", error);
      throw new Error("Unable to create bus stop. Please try again later.");
    }
  },

  // Update a stop by ID
  updateBusStop: async (id, stopData) => {
    try {
      const response = await apiClient.put(`/busStops/${id}`, stopData);
      return response.data;
    } catch (error) {
      console.error(`Error updating bus stop with ID ${id}:`, error);
      throw new Error(`Unable to update bus stop with ID ${id}. Please try again later.`);
    }
  },

  // Delete a stop by ID
  deleteBusStop: async (id) => {
    try {
      const response = await apiClient.delete(`/busStops/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting bus stop with ID ${id}:`, error);
      throw new Error(`Unable to delete bus stop with ID ${id}. Please try again later.`);
    }
  },
};

export default StopService;
