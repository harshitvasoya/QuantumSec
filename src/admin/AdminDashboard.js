import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <button
        onClick={() => navigate('/admin/add-blog')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-4"
      >
        Add Blog
      </button>
      <button
        onClick={() => navigate('/admin/add-project')}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Add Project
      </button>
      <button
        onClick={handleLogout}
        className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;