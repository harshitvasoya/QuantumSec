const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  ip: String,
  referrer: String,
  browser: String,
  os: String,
  platform: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
