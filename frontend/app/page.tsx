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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">HRMS Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-violet-600 font-semibold transition-colors">Dashboard</Link>
                  <button onClick={() => router.push('/login')} className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-violet-600 font-semibold transition-colors">Login</Link>
                  <Link href="/register" className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-violet-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full mb-8 shadow-md">
            <span className="bg-gradient-to-r from-violet-700 to-pink-700 bg-clip-text text-transparent font-bold text-sm">✨ Next-Gen HR Management Platform</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
            Transform Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">Workforce Management</span>
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empower your organization with intelligent user management, advanced security, and real-time analytics in one beautiful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button
              onClick={handleDashboard}
              className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-10 py-4.5 rounded-xl font-bold hover:from-violet-700 hover:to-pink-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1.5"
            >
              {isAuthenticated ? 'Access Dashboard' : 'Start Free Trial'}
            </button>
            <Link
              href="/register"
              className="bg-white text-gray-800 px-10 py-4.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl border-2 border-violet-200"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-5">Powerful Features for Modern Teams</h2>
            <p className="text-gray-600 text-lg">Everything you need to build and scale your organization</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* User Management */}
            <div className="bg-gradient-to-br from-white to-violet-50 rounded-3xl shadow-xl p-9 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-violet-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-7 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart User Management</h3>
              <p className="text-gray-600 leading-relaxed">Intuitive tools to create, update, and manage user accounts with intelligent role-based access control.</p>
            </div>

            {/* Security */}
            <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-xl p-9 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-pink-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-7 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-600 leading-relaxed">JWT authentication, bcrypt encryption, and secure session management protecting your sensitive data 24/7.</p>
            </div>

            {/* Dashboard */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-9 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-blue-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-7 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 002-2V7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 002 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2zm0 0a2 2 0 002 2h6a2 2 0 002-2M9 19v-6a2 2 0 002-2V7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 00-2 2H9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Beautiful dashboards with actionable insights and comprehensive reporting for data-driven decisions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-3xl p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your HR?</h2>
              <p className="text-violet-100 text-xl mb-10 max-w-2xl mx-auto">Join thousands of organizations already using our platform to streamline their workforce management.</p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/register"
                  className="bg-white text-violet-600 px-10 py-4.5 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
                >
                  Start Your Free Trial
                </Link>
                <Link
                  href="/login"
                  className="bg-violet-700/50 text-white px-10 py-4.5 rounded-xl font-bold hover:bg-violet-700/70 transition-all border-2 border-white/30"
                >
                  Sign In Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-violet-200 mt-24">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-pink-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">HRMS Pro</span>
            </div>
            <p className="text-gray-600">&copy; 2024 HRMS Pro. Built with ❤️ for modern organizations.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
