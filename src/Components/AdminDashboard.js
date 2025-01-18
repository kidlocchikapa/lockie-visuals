import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Alert from '../Components/ui/alert';
import adminApi from './api.services';

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
    >
      {children}
    </button>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertInfo, setAlertInfo] = useState({ message: '', type: '' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      const [bookingsData, contactsData] = await Promise.all([
        adminApi.getBookings(),
        adminApi.getContacts()
      ]);
      setBookings(bookingsData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setAlertInfo({ 
        message: error.message || 'Failed to load dashboard data. Please try again.',
        type: 'error'
      });
      if (error.message.includes('401')) {
        navigate('/login', { state: { from: '/admin' } });
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/admin' } });
      return;
    }
    loadDashboardData();
  }, [navigate, loadDashboardData]);

  const handleAction = async (actionFn, bookingId, successMessage) => {
    try {
      const updatedBooking = await actionFn(bookingId);
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? updatedBooking : booking
      ));
      setAlertInfo({ message: successMessage, type: 'success' });
    } catch (error) {
      console.error(`Failed to perform action:`, error);
      setAlertInfo({ 
        message: error.message || `Failed to ${successMessage.toLowerCase()}. Please try again.`,
        type: 'error'
      });
      if (error.message.includes('401')) {
        navigate('/login', { state: { from: '/admin' } });
      }
    }
  };

  const handleConfirmBooking = (bookingId) => 
    handleAction(adminApi.confirmBooking, bookingId, 'Booking confirmed successfully');

  const handleRejectBooking = (bookingId) => 
    handleAction(adminApi.rejectBooking, bookingId, 'Booking rejected successfully');

  const handleMarkDelivered = (bookingId) => 
    handleAction(adminApi.markDelivered, bookingId, 'Service marked as delivered successfully');

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      delivered: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-md text-sm ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading && !isRefreshing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lockie Visuals Admin Dashboard</h1>
        <Button
          onClick={loadDashboardData}
          disabled={isRefreshing}
          className="flex items-center gap-2"
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      {alertInfo.message && (
        <Alert
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={() => setAlertInfo({ message: '', type: '' })}
        />
      )}

      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setActiveTab('bookings')}
          variant={activeTab === 'bookings' ? 'default' : 'outline'}
        >
          Bookings ({bookings.length})
        </Button>
        <Button
          onClick={() => setActiveTab('contacts')}
          variant={activeTab === 'contacts' ? 'default' : 'outline'}
        >
          Contact Messages ({contacts.length})
        </Button>
      </div>

      <div className="space-y-4">
        {activeTab === 'bookings' ? (
          <div className="grid gap-4">
            {bookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No bookings found
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.serviceName}</h3>
                      <p className="text-gray-600">{booking.userEmail}</p>
                      <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(booking.status)}
                      {booking.status === 'pending' && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => handleConfirmBooking(booking.id)}
                            variant="success"
                          >
                            Confirm
                          </Button>
                          <Button
                            onClick={() => handleRejectBooking(booking.id)}
                            variant="danger"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          onClick={() => handleMarkDelivered(booking.id)}
                          variant="info"
                          className="mt-4"
                        >
                          Mark Delivered
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {contacts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No contact messages found
              </div>
            ) : (
              contacts.map((contact) => (
                <div key={contact.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-2">{contact.subject}</h3>
                  <p className="text-gray-600">From: {contact.name} ({contact.email})</p>
                  <p className="my-4 p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
                    {contact.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    Received: {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;