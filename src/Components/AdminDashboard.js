import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Alert from '../Components/ui/alert';
import axios from 'axios';

const API_URL = 'https://lockievisualbackend.onrender.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login'; // Redirect to login if 401
    }
    return Promise.reject(error);
  }
);

const AdminDashboard = () => {
  const navigate = useNavigate(); // Use navigate for redirection
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertInfo, setAlertInfo] = useState({ message: '', type: '' });
  const [actionLoading, setActionLoading] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login'); // Use navigate to redirect to login
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]); // Add navigate to the dependency array

  const adminApi = {
    async getBookings() {
      try {
        const response = await apiClient.get('/admin/bookings');
        return response.data;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },

    async getContacts() {
      try {
        const response = await apiClient.get('/admin/contacts');
        return response.data;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },

    async confirmBooking(bookingId) {
      try {
        const response = await apiClient.post(`/admin/bookings/${bookingId}/confirm`);
        return response.data;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },

    async rejectBooking(bookingId) {
      try {
        const response = await apiClient.post(`/admin/bookings/${bookingId}/reject`);
        return response.data;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },

    async markDelivered(bookingId) {
      try {
        const response = await apiClient.post(`/admin/bookings/${bookingId}/deliver`);
        return response.data;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    }
  };

  const handleApiError = (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    setAlertInfo({
      message: errorMessage,
      type: 'error'
    });

    if (error.response?.status === 401) {
      setIsAuthenticated(false);
    }
  };

  const loadDashboardData = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setAlertInfo({ message: '', type: '' });
      setIsRefreshing(true);

      const [bookingsData, contactsData] = await Promise.all([
        adminApi.getBookings(),
        adminApi.getContacts()
      ]);

      setBookings(bookingsData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [loadDashboardData, isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Or a loading state if you prefer
  }

  if (loading && !isRefreshing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Your existing return statement with the dashboard UI...
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Rest of your JSX remains the same */}
    </div>
  );
};

export default AdminDashboard;
