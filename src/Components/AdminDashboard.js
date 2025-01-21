import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://lockievisualbackend.onrender.com';

// Create axios instance with configurations
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add request and response interceptors
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertInfo, setAlertInfo] = useState({ message: '', type: '' });
  const [actionLoading, setActionLoading] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthAndLoadData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      setLoading(true);
      // Attempt to fetch data to confirm authentication
      const [bookingsRes, contactsRes] = await Promise.all([
        apiClient.get('/admin/bookings')
      ]);

      setBookings(bookingsRes.data);
      setContacts(contactsRes.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication or data fetch failed:', error);
      localStorage.removeItem('token');
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuthAndLoadData();
  }, [checkAuthAndLoadData]);

  const handleBookingAction = async (bookingId, actionType) => {
    setActionLoading((prev) => ({ ...prev, [bookingId]: true }));

    try {
      let actionResponse;
      if (actionType === 'confirm') {
        actionResponse = await apiClient.post(`/admin/bookings/${bookingId}/confirm`);
      } else if (actionType === 'reject') {
        actionResponse = await apiClient.post(`/admin/bookings/${bookingId}/reject`);
      } else if (actionType === 'deliver') {
        actionResponse = await apiClient.post(`/admin/bookings/${bookingId}/deliver`);
      }

      setAlertInfo({
        message: `Booking ${actionType}ed successfully!`,
        type: 'success',
      });
      checkAuthAndLoadData(); // Reload data after action
    } catch (error) {
      console.error(`Error during ${actionType} booking:`, error);
      setAlertInfo({
        message: error.response?.data?.message || `Failed to ${actionType} booking`,
        type: 'error',
      });
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">Redirecting to login...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Admin Dashboard</h2>
      {alertInfo.message && (
        <div className={`px-4 py-3 rounded-lg mb-4 ${alertInfo.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          <p className="text-sm">{alertInfo.message}</p>
        </div>
      )}
      <div className="space-x-4 my-4">
        <button onClick={() => setActiveTab('bookings')} className={`px-4 py-2 rounded-md ${activeTab === 'bookings' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Bookings
        </button>
        <button onClick={() => setActiveTab('contacts')} className={`px-4 py-2 rounded-md ${activeTab === 'contacts' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Contacts
        </button>
      </div>

      {activeTab === 'bookings' && bookings.length === 0 && (
        <p className="p-4 text-gray-500">No bookings available.</p>
      )}
      {/* Render bookings and contacts as per original implementation */}
    </div>
  );
};

export default AdminDashboard;
