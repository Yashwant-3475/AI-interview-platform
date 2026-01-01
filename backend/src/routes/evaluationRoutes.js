const express = require('express');
const { evaluateAnswer, getEvaluations } = require('../controllers/evaluationController');

const router = express.Router();

// Send an answer to the AI model and store the evaluation
// POST /api/evaluations
router.post('/', evaluateAnswer);

// Get all stored AI evaluations
// GET /api/evaluations
router.get('/', getEvaluations);

module.exports = router;


