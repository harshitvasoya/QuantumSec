import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

const AddProjectPage = () => {
  useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    demoLink: '',
    image: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin-token');

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        technologies: formData.technologies.split(','),
      }),
    });

    const result = await response.json();
    alert(result.message || 'Project added!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'technologies', 'githubLink', 'demoLink', 'image', 'category'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        ))}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProjectPage;
