import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ type, message }) => {
  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';
  const borderColor = type === 'error' ? 'border-red-200' : 'border-green-200';

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${bgColor} ${textColor} px-4 py-3 rounded-lg border ${borderColor} mb-4 shadow-md`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedPassword = formData.password.trim();
    const trimmedConfirmPassword = formData.confirmPassword.trim();

    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required.';
    if (!trimmedPassword) {
      newErrors.password = 'Password is required.';
    } else if (trimmedPassword.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must agree to the terms and conditions.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError('');
    setShowSuccess(false);

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, password: formData.password.trim() }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          termsAccepted: false,
        });
        setErrors({});
      } else {
        const data = await response.json();
        setServerError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setServerError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (serverError) {
      const timer = setTimeout(() => setServerError(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [serverError]);

  const formFields = [
    { name: 'fullName', type: 'text', placeholder: 'John Doe' },
    { name: 'email', type: 'email', placeholder: 'example@gmail.com' },
    { name: 'phoneNumber', type: 'text', placeholder: '+1234567890' },
    { name: 'password', type: 'password', placeholder: 'Enter your password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm your password' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center py-12 px-6 sm:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {showSuccess && <Alert type="success" message="Account created successfully!" />}
        {serverError && <Alert type="error" message={serverError} />}

        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login here
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.name}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors[field.name] && <p className="text-red-600 text-sm">{errors[field.name]}</p>}
            </div>
          ))}

          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              I agree to the{' '}
              <Link to="#" className="text-indigo-600 hover:text-indigo-500">
                terms and conditions
              </Link>
            </label>
          </div>
          {errors.termsAccepted && <p className="text-red-600 text-sm">{errors.termsAccepted}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 text-white font-medium rounded-lg transition-all duration-300 ${
              isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none`}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
