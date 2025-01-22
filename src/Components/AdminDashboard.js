import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://lockievisualbc.onrender.com'; // Updated URL

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token.startsWith('Bearer ')
        ? token
        : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

const Alert = ({ message, type }) => (
  <div
    className={`px-4 py-3 rounded-lg mb-4 ${
      type === 'error'
        ? 'bg-red-100 text-red-800'
        : 'bg-green-100 text-green-800'
    }`}
  >
    <p className="text-sm">{message}</p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertInfo, setAlertInfo] = useState({ message: '', type: '' });
  const [actionLoading, setActionLoading] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date provided';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const loadBookings = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setAlertInfo({ message: '', type: '' });

      const response = await apiClient.get('/admin/bookings');
      const formattedBookings = response.data.map(booking => ({
        ...booking,
        formattedDate: formatDate(booking.bookingDate || booking.date)
      }));
      
      formattedBookings.sort((a, b) => 
        new Date(b.bookingDate || b.date) - new Date(a.bookingDate || a.date)
      );
      setBookings(formattedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setAlertInfo({ 
        message: error.response?.data?.message || 'Failed to load bookings', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleBookingAction = async (bookingId, actionType) => {
    setActionLoading((prev) => ({ ...prev, [bookingId]: true }));

    try {
      const method = 'PATCH';
      let endpoint = `/admin/bookings/${bookingId}`; // Base endpoint

      // Append the action type to the endpoint
      switch (actionType) {
        case 'confirm':
          endpoint += '/confirm';
          break;
        case 'reject':
          endpoint += '/cancel';
          break;
        case 'deliver':
          endpoint += '/deliver';
          break;
        default:
          throw new Error('Invalid action type');
      }

      await apiClient({
        method,
        url: endpoint
      });
      
      setAlertInfo({
        message: `Booking ${actionType}ed successfully!`,
        type: 'success',
      });
      await loadBookings();
    } catch (error) {
      console.error(`Error during ${actionType}:`, error);
      setAlertInfo({
        message: error.response?.data?.message || `Failed to ${actionType} booking`,
        type: 'error',
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
      loadBookings();
    }
  }, [isAuthenticated, loadBookings]);

  if (!isAuthenticated || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Booking Management</h2>

      {alertInfo.message && (
        <Alert message={alertInfo.message} type={alertInfo.type} />
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="mb-4 p-4">
          <button
            onClick={loadBookings}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Refresh Bookings
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg">No bookings available at the moment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Additional Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id || booking.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.clientName || booking.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.clientEmail || booking.email || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.clientPhone || booking.phone || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {booking.formattedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {booking.serviceType || booking.service || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {booking.additionalInfo || booking.notes || 'No additional information'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : booking.status === 'delivered'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleBookingAction(booking._id || booking.id, 'confirm')}
                              disabled={actionLoading[booking._id || booking.id]}
                              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                            >
                              {actionLoading[booking._id || booking.id] ? 'Processing...' : 'Confirm'}
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking._id || booking.id, 'reject')}
                              disabled={actionLoading[booking._id || booking.id]}
                              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                            >
                              {actionLoading[booking._id || booking.id] ? 'Processing...' : 'Reject'}
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleBookingAction(booking._id || booking.id, 'deliver')}
                            disabled={actionLoading[booking._id || booking.id]}
                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                          >
                            {actionLoading[booking._id || booking.id] ? 'Processing...' : 'Mark Delivered'}
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
  );
};

export default AdminDashboard;