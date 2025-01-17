// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import adminApi from './api.services';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [bookingsData, contactsData] = await Promise.all([
        adminApi.getBookings(),
        adminApi.getContacts()
      ]);
      setBookings(bookingsData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      alert('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (bookingId) => {
    try {
      const updatedBooking = await adminApi.confirmBooking(bookingId);
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? updatedBooking : booking
      ));
      alert('Booking confirmed successfully');
    } catch (error) {
      console.error('Failed to confirm booking:', error);
      alert('Failed to confirm booking. Please try again.');
    }
  };

  const handleRejectBooking = async (bookingId) => {
    try {
      const updatedBooking = await adminApi.rejectBooking(bookingId);
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? updatedBooking : booking
      ));
      alert('Booking rejected successfully');
    } catch (error) {
      console.error('Failed to reject booking:', error);
      alert('Failed to reject booking. Please try again.');
    }
  };

  const handleMarkDelivered = async (bookingId) => {
    try {
      const updatedBooking = await adminApi.markDelivered(bookingId);
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? updatedBooking : booking
      ));
      alert('Service marked as delivered successfully');
    } catch (error) {
      console.error('Failed to mark as delivered:', error);
      alert('Failed to mark as delivered. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: '#FEF3C7',
      confirmed: '#D1FAE5',
      delivered: '#DBEAFE',
      cancelled: '#FEE2E2'
    };

    return (
      <span
        style={{
          backgroundColor: statusColors[status],
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Lockie Visuals Admin Dashboard</h1>
        <button onClick={loadDashboardData}>Refresh Data</button>
      </div>

      <div className="tabs">
        <button 
          onClick={() => setActiveTab('bookings')}
          className={activeTab === 'bookings' ? 'active' : ''}
        >
          Bookings ({bookings.length})
        </button>
        <button 
          onClick={() => setActiveTab('contacts')}
          className={activeTab === 'contacts' ? 'active' : ''}
        >
          Contact Messages ({contacts.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'bookings' ? (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-info">
                  <h3>{booking.serviceName}</h3>
                  <p>{booking.userEmail}</p>
                  <p>Booking ID: {booking.id}</p>
                  <p>Created: {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="booking-actions">
                  {getStatusBadge(booking.status)}
                  {booking.status === 'pending' && (
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleConfirmBooking(booking.id)}
                        className="confirm-btn"
                      >
                        Confirm
                      </button>
                      <button 
                        onClick={() => handleRejectBooking(booking.id)}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {booking.status === 'confirmed' && (
                    <button 
                      onClick={() => handleMarkDelivered(booking.id)}
                      className="deliver-btn"
                    >
                      Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="contacts-list">
            {contacts.map((contact) => (
              <div key={contact.id} className="contact-card">
                <h3>{contact.subject}</h3>
                <p>From: {contact.name} ({contact.email})</p>
                <p className="message">{contact.message}</p>
                <p className="timestamp">
                  Received: {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-dashboard {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .tabs {
          margin-bottom: 20px;
        }

        .tabs button {
          padding: 10px 20px;
          margin-right: 10px;
          border: none;
          background: none;
          cursor: pointer;
        }

        .tabs button.active {
          border-bottom: 2px solid #4CAF50;
        }

        .booking-card, .contact-card {
          border: 1px solid #ddd;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 4px;
        }

        .booking-info {
          margin-bottom: 10px;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .confirm-btn {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .reject-btn {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .deliver-btn {
          background-color: #2196F3;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .message {
          white-space: pre-wrap;
          margin: 10px 0;
          padding: 10px;
          background-color: #f5f5f5;
          border-radius: 4px;
        }

        .timestamp {
          color: #666;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;