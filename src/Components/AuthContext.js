// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check token on initial load
    const token = localStorage.getItem('authToken');
    if (token) {
      // Since we don't have a user endpoint, we'll store user data with the token
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('https://lockievisualdb.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Assuming the response includes token and user data
        // Adjust according to your actual API response structure
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    // Since we don't have a logout endpoint, we'll just clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);