import React, { useState, useEffect } from 'react';

const ServiceBookingDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [bookings, setBookings] = useState([]);
  const [notification, setNotification] = useState('');
  const [confirmingService, setConfirmingService] = useState(null);

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

  const handleBookService = (service) => {
    // Show confirmation modal with the selected service
    setConfirmingService(service);
  };

  const confirmBooking = () => {
    if (confirmingService) {
      const newBooking = {
        id: bookings.length + 1,
        service: confirmingService.name,
        date: new Date().toISOString().split('T')[0], // Today's date
        status: 'Pending',
      };

      setBookings((prevBookings) => [...prevBookings, newBooking]);
      setNotification(`Successfully booked "${confirmingService.name}"!`);
      setConfirmingService(null);

      // Clear notification after 2 seconds
      setTimeout(() => {
        setNotification('');
      }, 2000);
    }
  };

  const cancelBooking = () => {
    setConfirmingService(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Service Dashboard</h1>
          <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
        </div>

        {/* Notification */}
        {notification && (
          <div className="mb-4 p-4 bg-green-100 border border-green-200 text-green-800 rounded shadow-sm">
            {notification}
          </div>
        )}

        {/* Confirmation Modal */}
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
                  onClick={cancelBooking}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  onClick={confirmBooking}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
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

        {/* Content */}
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
                        <h3 className="font-medium">{booking.service}</h3>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status}
                      </span>
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
