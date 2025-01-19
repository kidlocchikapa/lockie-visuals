import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
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
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

const Button = ({ children, variant = 'default', className = '', disabled, onClick }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    success: "bg-green-50 text-green-700 hover:bg-green-100 focus:ring-green-500",
    danger: "bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500",
    info: "bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-500"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

const AdminDashboard = () => {
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
      window.location.href = '/admin/login';
    } else {
      setIsAuthenticated(true);
    }
  }, []);

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

  // Rest of your component code remains the same...
  // (Button handlers, status badge, and render logic)

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