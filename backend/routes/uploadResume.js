// routes/uploadResume.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Resume = require('../models/Resume');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    const fileData = fs.readFileSync(req.file.path);
    const resume = new Resume({
      filename: req.file.originalname,
      filetype: req.file.mimetype,
      data: fileData,
    });

    await resume.save();
    fs.unlinkSync(req.file.path); // clean temp file
    res.status(200).json({ message: 'Resume uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
