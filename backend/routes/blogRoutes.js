const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// GET /api/blogs?limit=5&tag=cyber
router.get('/', async (req, res) => {
  const { limit, tag } = req.query;

  try {
    // Build filter
    const filter = tag ? { tags: tag } : {};

    // Limit the number of posts (optional)
    const query = BlogPost.find(filter).sort({ date: -1 });
    if (limit) query.limit(parseInt(limit));

    const posts = await query.exec();
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    res.status(500).json({ message: 'Server error. Unable to fetch blog posts.' });
  }
});

// POST /api/blogs -> Create a new blog post
router.post('/', async (req, res) => {
  try {
    const blog = new BlogPost(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(400).json({ message: 'Error saving blog post' });
  }
});


module.exports = router;
