const express = require('express');
const multer = require('multer');
const path = require('path');
const { analyzeResume, uploadResume } = require('../controllers/resumeController');

const router = express.Router();

// Configure Multer to store uploaded files in a temporary "uploads" folder
const upload = multer({
  dest: path.join(__dirname, '../../uploads'),
  fileFilter: (req, file, cb) => {
    // Basic check: only allow PDF files
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed.'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Simple upload endpoint
router.post('/upload', upload.single('resume'), uploadResume);

// Analysis endpoint (kept for future use)
router.post('/analyze', upload.single('resume'), analyzeResume);

module.exports = router;

