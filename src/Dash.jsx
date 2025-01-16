import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceBookingDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [bookings, setBookings] = useState([]);
  const [notification, setNotification] = useState('');
  const [confirmingService, setConfirmingService] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const BOOKINGS_API = 'https://lockievisualbackend.onrender.com/bookings';

  const services = [
    {
      id: 1,
      name: 'Graphic Design',
      description: 'Professional graphic design services for your brand',
      price: 'MWK 75,000',
    },
    {
      id: 2,
      name: 'Website Development',
      description: 'Custom website development solutions',
      price: 'MWK 113,000',
    },
  ];

  // Helper function to get auth headers and verify token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': token
    };
  };

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { returnUrl: window.location.pathname } });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const headers = getAuthHeaders();
        const response = await fetch(BOOKINGS_API, {
          headers: headers
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            navigate('/login', { state: { returnUrl: window.location.pathname } });
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch bookings');
        }
        
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        showNotification(error.message, true);
      }
    };

    if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [activeTab, navigate]);

  const handleBookService = async (service) => {
    try {
      // Verify token exists before allowing booking
      getAuthHeaders();
      setConfirmingService(service);
    } catch (error) {
      navigate('/login', { state: { returnUrl: window.location.pathname } });
    }
  };

  const showNotification = (message, isError = false) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const confirmBooking = async () => {
    if (!confirmingService) return;

    setLoading(true);
    try {
      const requestPayload = {
        serviceName: confirmingService.name,
        additionalDetails: {
          price: confirmingService.price,
          description: confirmingService.description,
        }
      };

      const headers = getAuthHeaders();
      const response = await fetch(BOOKINGS_API, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestPayload)
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login', { state: { returnUrl: window.location.pathname } });
          return;
        }
        throw new Error(responseData.message || 'Failed to create booking');
      }

      setBookings(prev => [...prev, responseData]);
      showNotification(`Successfully booked "${confirmingService.name}"!`);
      setConfirmingService(null);
    } catch (error) {
      console.error('Booking error:', error);
      showNotification(error.message, true);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const headers = getAuthHeaders();
      const response = await fetch(`${BOOKINGS_API}/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: headers
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login', { state: { returnUrl: window.location.pathname } });
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel booking');
      }

      const updatedBooking = await response.json();
      setBookings(prev => prev.map(booking => 
        booking.id === updatedBooking.id ? updatedBooking : booking
      ));
      showNotification('Booking cancelled successfully');
    } catch (error) {
      console.error('Cancel booking error:', error);
      showNotification(error.message, true);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Service Dashboard</h1>
          <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
        </div>

        {notification && (
          <div className={`mb-4 p-4 rounded shadow-sm ${
            notification.includes('Failed') || notification.includes('failed')
              ? 'bg-red-100 border border-red-200 text-red-800'
              : 'bg-green-100 border border-green-200 text-green-800'
          }`}>
            {notification}
          </div>
        )}

        {confirmingService && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
              <p className="text-gray-600 mb-4">
                Are you sure you want to book <strong>{confirmingService.name}</strong>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  onClick={() => setConfirmingService(null)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
                  onClick={confirmBooking}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex gap-4 border-b">
            <button
              className={`px-4 py-2 ${
                activeTab === 'services'
                  ? 'border-b-2 border-orange-500 text-orange-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('services')}
            >
              Services
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-orange-500 text-orange-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              My Bookings
            </button>
          </div>
        </div>

        {activeTab === 'services' ? (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{service.price}</span>
                  <button
                    onClick={() => handleBookService(service)}
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Booking History</h2>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{booking.serviceName}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        {booking.status === 'PENDING' && (
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You have no bookings yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceBookingDashboard;