import React, { useState } from 'react';

const AddBlogPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    slug: '',
    tags: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim())
        }),
      });
      if (!response.ok) throw new Error('Failed to add blog');
      setStatus('Blog post added successfully!');
      setFormData({ title: '', author: '', excerpt: '', slug: '', tags: '', date: new Date().toISOString().slice(0, 10) });
    } catch (err) {
      setStatus('Error adding blog post');
    }
  };

  return (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <h2 className="text-2xl font-bold mb-6">Add New Blog Post</h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Title */}
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      />

      {/* Author */}
      <input
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      />

      {/* Slug */}
      <input
        name="slug"
        placeholder="Slug (URL-friendly)"
        value={formData.slug}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      />

      {/* Excerpt */}
      <textarea
        name="excerpt"
        placeholder="Excerpt"
        value={formData.excerpt}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      />

      {/* Tags */}
      <input
        name="tags"
        placeholder="Tags (comma-separated)"
        value={formData.tags}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      />

      {/* Medium URL */}
      <input
        name="mediumUrl"
        placeholder="Medium Blog URL"
        value={formData.mediumUrl}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>

    {status && <p className="mt-4 text-green-400">{status}</p>}
  </div>
);

};

export default AddBlogPage;
