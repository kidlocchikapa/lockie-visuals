import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 ">
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
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
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
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  Send Message
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
}