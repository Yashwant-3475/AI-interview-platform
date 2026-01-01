const express = require('express');
const router = express.Router();
const { getInterviewQuestions } = require('../controllers/interviewController');

// GET /api/interview/questions
router.get('/questions', getInterviewQuestions);

module.exports = router;