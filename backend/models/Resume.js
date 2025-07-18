// models/Resume.js
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  filename: String,
  filetype: String,
  data: Buffer,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resume', ResumeSchema);
