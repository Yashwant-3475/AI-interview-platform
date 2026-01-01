const mongoose = require('mongoose');

// Simple question model for mock interviews
// Each question has the text, a list of options, the index of the correct answer,
// and a difficulty level (e.g. 'easy', 'medium', 'hard').
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    // Store the index of the correct option in the `options` array (0, 1, 2, 3, ...)
    answer: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      default: 'easy',
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;


