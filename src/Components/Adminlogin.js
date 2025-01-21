// AdminLogin.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://lockievisualbackend.onrender.com/auth";  // Updated to match the other login component

const Alert = ({ type, message }) => {
  const bgColor = type === "error" ? "bg-red-100" : "bg-green-100";
  const textColor = type === "error" ? "text-red-800" : "text-green-800";
  const borderColor = type === "error" ? "border-red-200" : "border-green-200";

  return (
    <div
      className={`${bgColor} ${textColor} px-4 py-3 rounded-lg border ${borderColor} mb-4 shadow-md animate-fade-in-down`}
    >
      {message}
    </div>
  );
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing token on component mount
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
        navigate("/admin/dashboard");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        // Store token with Bearer prefix
        const token = data.access_token.startsWith('Bearer ') 
          ? data.access_token 
          : `Bearer ${data.access_token}`;
        
        localStorage.setItem("token", token);
        setSuccess("Login successful! Redirecting to admin dashboard...");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Admin Email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;