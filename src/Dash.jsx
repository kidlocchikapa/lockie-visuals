import React, { useState } from 'react';

const ServiceBookingDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [bookings, setBookings] = useState([
    { id: 1, service: 'Graphic Design', date: '2025-01-15', status: 'Completed' },
    { id: 2, service: 'Website Development', date: '2025-01-20', status: 'Pending' }
  ]);

  const services = [
    {
      id: 1,
      name: 'Graphic Design',
      description: 'Professional graphic design services for your brand',
      price: '$99/hour'
    },
    {
      id: 2,
      name: 'Website Development',
      description: 'Custom website development solutions',
      price: '$149/hour'
    }
  ];

  const handleBookService = (service) => {
    // In a real app, this would open a booking form or modal
    console.log(`Booking ${service.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Service Dashboard</h1>
          <span className="text-gray-600">
            {new Date().toLocaleDateString()}
          </span>
        </div>

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
              <div 
                key={service.id} 
                className="bg-white rounded-lg p-6 shadow-sm"
              >
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
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceBookingDashboard;
