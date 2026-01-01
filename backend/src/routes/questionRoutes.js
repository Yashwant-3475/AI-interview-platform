const express = require('express');
const { getQuestions } = require('../controllers/questionController');

const router = express.Router();

// GET /api/questions
router.get('/', getQuestions);

module.exports = router;


