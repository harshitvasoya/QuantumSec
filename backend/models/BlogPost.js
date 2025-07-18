const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: Date,
  excerpt: String,
  tags: [String],
  slug: String,
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
