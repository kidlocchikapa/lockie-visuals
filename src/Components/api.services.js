// src/services/api.service.js
import axios from 'axios';

const API_URL = 'https://lockievisualbackend.onrender.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const adminApi = {
  // Bookings
  async getBookings() {
    try {
      const response = await apiClient.get('/admin/bookings');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  },

  async confirmBooking(bookingId) {
    try {
      const response = await apiClient.post(`/admin/bookings/${bookingId}/confirm`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to confirm booking');
    }
  },

  async rejectBooking(bookingId) {
    try {
      const response = await apiClient.post(`/admin/bookings/${bookingId}/reject`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reject booking');
    }
  },

  async markDelivered(bookingId) {
    try {
      const response = await apiClient.post(`/admin/bookings/${bookingId}/deliver`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark booking as delivered');
    }
  },

  async updateBooking(bookingId, data) {
    try {
      const response = await apiClient.patch(`/admin/bookings/${bookingId}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update booking');
    }
  },

  // Contacts
  async getContacts() {
    try {
      const response = await apiClient.get('/admin/contacts');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contacts');
    }
  },
};

export default adminApi;