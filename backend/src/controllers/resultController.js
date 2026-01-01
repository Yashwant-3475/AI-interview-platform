const Result = require('../models/Result');

// @route   POST /api/results
// @desc    Save a new mock interview result
// @access  Public (for now)
const createResult = async (req, res) => {
  try {
    const { score, totalQuestions, correctAnswers, attemptedQuestions, accuracy } = req.body;

    // Basic check to make sure required numbers are present
    if (
      score === undefined ||
      totalQuestions === undefined ||
      correctAnswers === undefined ||
      attemptedQuestions === undefined ||
      accuracy === undefined
    ) {
      return res.status(400).json({ message: 'Missing result fields.' });
    }

    const result = await Result.create({
      score,
      totalQuestions,
      correctAnswers,
      attemptedQuestions,
      accuracy,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Create result error:', error.message);
    res.status(500).json({ message: 'Failed to save result.' });
  }
};

// @route   GET /api/results
// @desc    Get all mock interview results
// @access  Public (for now)
const getResults = async (req, res) => {
  try {
    const results = await Result.find({}).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    console.error('Get results error:', error.message);
    res.status(500).json({ message: 'Failed to fetch results.' });
  }
};

module.exports = {
  createResult,
  getResults,
};


