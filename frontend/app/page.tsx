"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setIsAuthenticated(!!storedUser);
  }, []);

  const handleDashboard = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">HRMS</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
                  <button onClick={() => router.push('/login')} className="text-gray-600 hover:text-red-600 font-medium transition-colors">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
                  <Link href="/register" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-blue-700 font-medium text-sm">🚀 Professional HR Management Solution</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Human Resource<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Management System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Streamline your organization's user management with our secure, scalable, and intuitive platform designed for modern businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDashboard}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
            </button>
            <Link
              href="/register"
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg border border-gray-200"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our HRMS?</h2>
            <p className="text-gray-600 text-lg">Everything you need to manage your team effectively</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* User Management */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">User Management</h3>
              <p className="text-gray-600 leading-relaxed">Comprehensive tools to create, update, and manage user accounts with role-based access control.</p>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed">JWT authentication, encrypted passwords, and secure session management to protect your data.</p>
            </div>

            {/* Dashboard */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 002-2V7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 002 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2zm0 0a2 2 0 002 2h6a2 2 0 002-2M9 19v-6a2 2 0 002-2V7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 00-2 2H9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">Real-time insights and reporting capabilities to make data-driven decisions for your organization.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 text-lg mb-8">Join organizations worldwide using our HRMS platform</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/login"
                className="bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-all border border-blue-500"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 HRMS. Built with modern technologies for efficient user management.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
