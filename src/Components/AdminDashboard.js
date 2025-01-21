import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://lockievisualbackend.onrender.com';

// Create axios instance with the necessary configurations
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Interceptors for request and response handling
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

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

// Alert Component to display messages
const Alert = ({ message, type }) => (
  <div className={`px-4 py-3 rounded-lg mb-4 ${type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
    <p className="text-sm">{message}</p>
  </div>
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

  // Check authentication status and redirect if not authenticated
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const response = await apiClient.get('/auth/user');
      if (response.data) {
        setIsAuthenticated(true);
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch data when authenticated
  const loadDashboardData = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setAlertInfo({ message: '', type: '' });

      const [bookingsRes, contactsRes] = await Promise.all([
        apiClient.get('/admin/bookings'),
        apiClient.get('/admin/contacts')
      ]);

      setBookings(bookingsRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setAlertInfo({ message: 'Failed to load data', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Handle actions (confirm, reject, etc.) for bookings
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
        type: 'success'
      });
      loadDashboardData();
    } catch (error) {
      console.error(`Error during ${actionType} booking:`, error);
      setAlertInfo({
        message: error.response?.data?.message || `Failed to ${actionType} booking`,
        type: 'error'
      });
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated, loadDashboardData]);

  if (!isAuthenticated || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Admin Dashboard</h2>

      {alertInfo.message && <Alert message={alertInfo.message} type={alertInfo.type} />}

      <div className="space-x-4 my-4">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-md ${activeTab === 'bookings' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Bookings
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2 rounded-md ${activeTab === 'contacts' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
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
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : booking.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'confirm')}
                                  disabled={actionLoading[booking.id]}
                                  className="text-green-500 hover:text-green-700"
                                >
                                  {actionLoading[booking.id] ? 'Confirming...' : 'Confirm'}
                                </button>
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'reject')}
                                  disabled={actionLoading[booking.id]}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  {actionLoading[booking.id] ? 'Rejecting...' : 'Reject'}
                                </button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => handleBookingAction(booking.id, 'deliver')}
                                disabled={actionLoading[booking.id]}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                {actionLoading[booking.id] ? 'Delivering...' : 'Mark as Delivered'}
                              </button>
                            )}
                          </div>
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
