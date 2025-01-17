// src/services/api.service.js
import axios from 'axios';

const API_URL = 'https://lockievisualbackend.onrender.com';

const adminApi = {
  // Bookings
  async getBookings() {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
  },

  async confirmBooking(bookingId) {
    const response = await axios.post(`${API_URL}/admin/bookings/${bookingId}/confirm`);
    return response.data;
  },

  async rejectBooking(bookingId) {
    const response = await axios.post(`${API_URL}/admin/bookings/${bookingId}/reject`);
    return response.data;
  },

  async markDelivered(bookingId) {
    const response = await axios.post(`${API_URL}/admin/bookings/${bookingId}/deliver`);
    return response.data;
  },

  async updateBooking(bookingId, data) {
    const response = await axios.patch(`${API_URL}/admin/bookings/${bookingId}`, data);
    return response.data;
  },

  // Contacts
  async getContacts() {
    const response = await axios.get(`${API_URL}/contacts`);
    return response.data;
  },
};

export default adminApi;