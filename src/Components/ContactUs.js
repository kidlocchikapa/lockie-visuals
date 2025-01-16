import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://lockievisualbackend.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({
          type: 'success',
          title: 'Message sent successfully!',
          message: "We'll get back to you as soon as possible."
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Error sending message',
        message: 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 relative">
      {/* Toast Notification */}
      {notification && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50 ${
            notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'
          }`}
        >
          <h3 className={`font-medium ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {notification.title}
          </h3>
          <p className={notification.type === 'success' ? 'text-green-700' : 'text-red-700'}>
            {notification.message}
          </p>
        </div>
      )}

      {/* Header Section */}
      <div className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-2xl">
            Have a question or want to discuss a project? We'd love to hear from you. Get in touch with us using the form below or through our contact information.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <ContactInfo 
                  icon={<Phone className="w-5 h-5 text-orange-500" />}
                  title="Phone"
                  detail="0990155300/0888777332"
                />
                <ContactInfo 
                  icon={<Mail className="w-5 h-5 text-orange-500" />}
                  title="Email"
                  detail="Infoatlockievisuals@gmail.com"
                />
                <ContactInfo 
                  icon={<MapPin className="w-5 h-5 text-orange-500" />}
                  title="Address"
                  detail="University of Malawi, Zomba"
                />
                <ContactInfo 
                  icon={<Clock className="w-5 h-5 text-orange-500" />}
                  title="Business Hours"
                  detail="Monday - Friday: 9:00 AM - 6:00 PM"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContactInfo = ({ icon, title, detail }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 bg-orange-100 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-gray-700">{detail}</p>
      </div>
    </div>
  );
};