import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.phone) newErrors.phone = 'Phone number is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters long.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.terms) newErrors.terms = 'You must agree to the terms and conditions.';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Form submitted:', formData);
    
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
    });
    
    setErrors({});
  };

  const formFields = [
    { name: 'fullName', type: 'text', header: 'Full Name', placeholder: 'e.g., Reload Time', icon: '/user.png' },
    { name: 'email', type: 'email', header: 'Email Address', placeholder: 'e.g., example@gmail.com', icon: '/email.png' },
    { name: 'phone', type: 'text', header: 'Phone Number', placeholder: 'e.g., +1234567890', icon: '/phone.png' },
    { name: 'password', type: 'password', header: 'Password', placeholder: 'Enter your password', icon: '/padlock.png' },
    { name: 'confirmPassword', type: 'password', header: 'Confirm Password', placeholder: 'Confirm your password', icon: '/padlock.png' },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center font-poppins justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 ">
        <div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-900">Create an Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to = "/login"  className="font-medium text-indigo-600 hover:text-indigo-500">
              Login here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {formFields.map((field, index) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.header}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img src={field.icon} alt={`${field.header} icon`} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                </div>
                {errors[field.name] && <p className="mt-2 text-sm text-red-600">{errors[field.name]}</p>}
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              By clicking the box, you agree with our
              <Link to ="#" className="text-indigo-600 hover:text-indigo-500"> terms </Link>
              and
              <Link to ="#"className="text-indigo-600 hover:text-indigo-500"> conditions.</Link>
            </label>
          </div>
          {errors.terms && <p className="mt-2 text-sm text-red-600">{errors.terms}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;