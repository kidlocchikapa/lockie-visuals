// EmailVerification.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`https://lockievisualbackend.onrender.com/auth/verify-email?token=${token}`);
        const data = await response.json();
        
        if (response.ok) {
          setStatus('success');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {status === 'verifying' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Verifying your email...</h2>
              {/* Add a loading spinner here if desired */}
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Email Verified!</h2>
              <p>Your email has been verified successfully. Redirecting to login...</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h2>
              <p className="mb-4">The verification link is invalid or has expired.</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;