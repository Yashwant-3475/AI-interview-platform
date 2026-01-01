const Question = require('../models/Question');

// @route   GET /api/questions
// @desc    Get all questions for the mock interview
// @access  Public
const getQuestions = async (req, res) => {
  try {
    // For now, just return all questions.
    // Later you can add filters (e.g., by difficulty or limit).
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    console.error('Get questions error:', error.message);
    res.status(500).json({ message: 'Failed to fetch questions.' });
  }
};

module.exports = {
  getQuestions,
};


