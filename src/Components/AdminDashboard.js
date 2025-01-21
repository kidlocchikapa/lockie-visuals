import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://lockievisualbackend.onrender.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors globally
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('Token expired or invalid - logging out');
      localStorage.removeItem('adminToken');
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      console.log('Checking auth with token:', token?.substring(0, 20) + '...');
      
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/admin/login');
        return;
      }

      try {
        const response = await apiClient.get('/auth/validate');
        console.log('Auth validation response:', response.status);

        if (response.status === 200) {
          console.log('Authentication successful');
          setIsAuthenticated(true);
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleApiError = (error) => {
    console.error('API Error:', error);
    const errorMessage = error.response?.data?.message || 'An error occurred';
    setAlertInfo({
      message: errorMessage,
      type: 'error'
    });

    if (error.response?.status === 401) {
      setIsAuthenticated(false);
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const loadDashboardData = useCallback(async () => {
    if (!isAuthenticated) {
      console.log('Not authenticated, skipping data load');
      return;
    }

    try {
      console.log('Loading dashboard data...');
      setLoading(true);
      setAlertInfo({ message: '', type: '' });
      setIsRefreshing(true);

      const [bookingsResponse, contactsResponse] = await Promise.all([
        apiClient.get('/admin/bookings'),
        apiClient.get('/admin/contacts')
      ]);

      setBookings(bookingsResponse.data);
      setContacts(contactsResponse.data);
      console.log('Dashboard data loaded successfully');
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      handleApiError(error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [loadDashboardData, isAuthenticated]);

  const handleConfirm = async (bookingId) => {
    try {
      setActionLoading((prev) => ({ ...prev, [bookingId]: true }));
      await apiClient.post(`/admin/bookings/${bookingId}/confirm`);
      setAlertInfo({
        message: 'Booking confirmed successfully!',
        type: 'success'
      });
      loadDashboardData();
    } catch (error) {
      console.error('Error confirming booking:', error);
      handleApiError(error);
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleReject = async (bookingId) => {
    try {
      setActionLoading((prev) => ({ ...prev, [bookingId]: true }));
      await apiClient.post(`/admin/bookings/${bookingId}/reject`);
      setAlertInfo({
        message: 'Booking rejected successfully!',
        type: 'success'
      });
      loadDashboardData();
    } catch (error) {
      console.error('Error rejecting booking:', error);
      handleApiError(error);
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleMarkDelivered = async (bookingId) => {
    try {
      setActionLoading((prev) => ({ ...prev, [bookingId]: true }));
      await apiClient.post(`/admin/bookings/${bookingId}/deliver`);
      setAlertInfo({
        message: 'Booking marked as delivered successfully!',
        type: 'success'
      });
      loadDashboardData();
    } catch (error) {
      console.error('Error marking booking as delivered:', error);
      handleApiError(error);
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading && !isRefreshing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Admin Dashboard</h2>
      
      {alertInfo.message && (
        <div className={`px-4 py-3 rounded-lg mb-4 ${
          alertInfo.type === 'error' 
            ? 'bg-red-100 text-red-800 border border-red-200' 
            : 'bg-green-100 text-green-800 border border-green-200'
        }`}>
          <p className="text-sm">{alertInfo.message}</p>
        </div>
      )}

      <div className="space-x-4 my-4">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'bookings'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'contacts'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Contacts
        </button>
      </div>

      {activeTab === 'bookings' && (
        <div className="my-8">
          <h3 className="text-xl font-medium text-gray-600 mb-4">Bookings</h3>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {bookings.length === 0 ? (
              <p className="p-4 text-gray-500">No bookings available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                          <div className="text-sm text-gray-500">{booking.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(booking.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleConfirm(booking.id)}
                                disabled={actionLoading[booking.id]}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {actionLoading[booking.id] ? 'Confirming...' : 'Confirm'}
                              </button>
                              <button
                                onClick={() => handleReject(booking.id)}
                                disabled={actionLoading[booking.id]}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {actionLoading[booking.id] ? 'Rejecting...' : 'Reject'}
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && !booking.delivered && (
                            <button
                              onClick={() => handleMarkDelivered(booking.id)}
                              disabled={actionLoading[booking.id]}
                              className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading[booking.id] ? 'Marking...' : 'Mark Delivered'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="my-8">
          <h3 className="text-xl font-medium text-gray-600 mb-4">Contact Messages</h3>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {contacts.length === 0 ? (
              <p className="p-4 text-gray-500">No contact messages available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{contact.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{contact.message}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;