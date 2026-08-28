"use client";
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setIsAuthenticated(!!storedUser);
  }, []);

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/login';
  };

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/register';
  };

  const handleDashboard = (e: React.MouseEvent) => {
    e.preventDefault();
    // Only navigate to dashboard if user is logged in
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    } else {
      alert('Please login first');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">HRMS</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Human Resource Management System</h2>
            <p className="text-gray-600 text-lg">Professional user management platform for organizations</p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M12 4.354a4 4 0 110 5.292M12 4.354a4 4 0 110 5.292M12 4.354a4 4 0 110 5.292M12 4.354a4 4 0 110 5.292M12 4.354a4 4 0 110 5.292M12 4.354a4 4 0 110 5.292M12 4.354a4 4 0 110 5.292M12 4.354a4 4 0 110 5.292" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600">Manage users, roles, and permissions efficiently</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Access</h3>
              <p className="text-gray-600">Role-based access control with authentication</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 002-2V7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 002 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2zm0 0a2 2 0 002 2h6a2 2 0 002-2M9 19v-6a2 2 0 002-2V7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 00-2 2H9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard</h3>
              <p className="text-gray-600">Comprehensive analytics and reporting</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Get Started</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRegister}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                Register New Account
              </button>
              <button
                onClick={handleLogin}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-md"
              >
                Login to Existing Account
              </button>
              <button
                onClick={handleDashboard}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
