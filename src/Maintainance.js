import React, { useState, useEffect } from 'react';
import { Settings, Clock, ArrowLeft } from 'lucide-react';

const MaintenancePage = () => {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-poppins p-4">
      <div className="max-w-4xl w-full bg-white rounded-sm ring-slate-400 overflow-hidden">
        <div className="md:flex">
          {/* Left side - decorative */}
          <div className="md:w-1/3 bg-blue-600 p-8 text-white flex flex-col justify-between">
            <div className="mb-8">
              <Settings className="h-16 w-16 animate-spin text-blue-200" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Upgrading System</h3>
              <p className="text-blue-200">We're making things better. Stay tuned!</p>
            </div>
          </div>

          {/* Right side - content */}
          <div className="md:w-2/3 p-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">We'll be back soon!</h2>
            <p className="text-lg text-black mb-8">
              Our team is working hard to improve your experience. We apologize for any inconvenience.
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-orange-500 mr-3" />
                <div>
                  <h4 className="text-lg font-semibold text-orange-500">Estimated time remaining</h4>
                  <p className="text-orange-500 text-2xl font-mono mt-1">{formatTime(timeLeft)}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;