const express = require('express');
const { createResult, getResults } = require('../controllers/resultController');

const router = express.Router();

// Save a new result
// POST /api/results
router.post('/', createResult);

// Get all results
// GET /api/results
router.get('/', getResults);

module.exports = router;


