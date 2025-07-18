// routes/fetchResume.js
const express = require('express');
const Resume = require('../models/Resume');
const router = express.Router();

router.get('/resume', async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });

    if (!resume) return res.status(404).json({ error: 'Resume not found' });

    res.set({
      'Content-Type': resume.filetype,
      'Content-Disposition': `attachment; filename="${resume.filename}"`,
    });

    res.send(resume.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

module.exports = router;
