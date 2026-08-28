"use client";
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Unauthorized, redirect to login
          localStorage.removeItem('user');
          window.location.href = '/login';
          return;
        }
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Clear localStorage
        localStorage.removeItem('user');
        setUser(null);
        setSuccess('Logged out successfully');
        
        // Redirect to login after 1 second
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    } catch (err) {
      setError('Logout failed');
    }
  };

  const handleEdit = (userData: User) => {
    // This is used for both editing the logged-in user's profile and other users
    // Store the specific user ID we're editing
    setEditingUserId(userData.id);
    setEditForm({ name: userData.name, email: userData.email });
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
      }

      const updatedUser = await response.json();
      
      // Update users list
      setUsers(users.map(u => u.id === editingUserId ? updatedUser : u));
      
      // If it's the logged-in user, update localStorage too
      if (user?.id === editingUserId) {
        const updatedStoredUser = { ...user, name: updatedUser.name, email: updatedUser.email };
        localStorage.setItem('user', JSON.stringify(updatedStoredUser));
        setUser(updatedStoredUser);
      }
      
      setSuccess('User updated successfully');
      setIsEditing(false);
      setEditingUserId(null);
      setEditForm({ name: '', email: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Delete failed');
      }

      // If deleting own account, logout
      if (userId === user?.id) {
        localStorage.removeItem('user');
        setUser(null);
        setSuccess('Account deleted successfully. You have been logged out.');
        // Redirect to login after 1 second
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } else {
        // Otherwise just remove from list
        setUsers(users.filter(u => u.id !== userId));
        setSuccess('User deleted successfully');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to access dashboard</h1>
          <a href="/login" className="text-blue-600 hover:text-blue-800">Login here</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-100 to-blue-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-semibold">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2.5 rounded-xl font-bold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>

        {(error || success) && (
          <div className="mb-6 p-4 rounded-2xl shadow-lg">
            {error && (
              <div className="text-red-700 bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 px-5 py-4 rounded-xl font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 px-5 py-4 rounded-xl font-medium">
                {success}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* User Profile Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 lg:col-span-1 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Your Profile
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-violet-50 to-pink-50 rounded-xl p-4">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Name</label>
                <p className="text-gray-900 font-semibold">{user.name}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Email</label>
                <p className="text-gray-900 font-semibold">{user.email}</p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Role</label>
                <p className="text-gray-900 font-semibold capitalize">{user.role}</p>
              </div>
            </div>
            
            {isEditing && editingUserId === user.id ? (
              <form onSubmit={handleUpdate} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 px-4 rounded-xl font-bold hover:from-violet-700 hover:to-pink-700 transition-all shadow-lg"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingUserId(null);
                      setEditForm({ name: '', email: '' });
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => handleEdit(user)}
                className="mt-6 w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 px-4 rounded-xl font-bold hover:from-violet-700 hover:to-pink-700 transition-all shadow-lg"
              >
                Edit Profile
              </button>
            )}
            
            <button
              onClick={() => handleDelete(user.id)}
              className="mt-4 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-xl font-bold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg"
            >
              Delete Account
            </button>
          </div>

          {/* User List Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 lg:col-span-2 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              All Users
            </h2>
            
            {users.length === 0 ? (
              <div className="text-center py-12 text-gray-500 font-medium">
                No users found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-violet-50 to-pink-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gradient-to-r hover:from-violet-50 hover:to-pink-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{u.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{u.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                          {u.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {u.id === user.id ? (
                            <span className="text-gray-400 italic">(You)</span>
                          ) : (
                            <button
                              onClick={() => handleEdit(u)}
                              className="text-violet-600 hover:text-pink-600 font-bold mr-4 transition-colors"
                            >
                              Edit
                            </button>
                          )}
                          {u.id !== user.id && (
                            <button
                              onClick={() => handleDelete(u.id)}
                              className="text-red-600 hover:text-red-800 font-bold transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form Modal (for editing other users) */}
        {isEditing && editingUserId !== user.id && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Edit User</h3>
              <form onSubmit={handleUpdate}>
                <div className="mb-5">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 px-4 rounded-xl font-bold hover:from-violet-700 hover:to-pink-700 transition-all shadow-lg"
                  >
                    Update User
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingUserId(null);
                      setEditForm({ name: '', email: '' });
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
