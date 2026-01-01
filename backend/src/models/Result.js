const mongoose = require('mongoose');

// Result model to store performance of a mock interview attempt
const resultSchema = new mongoose.Schema(
  {
    // Optional reference to a user (not required for now)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    attemptedQuestions: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number, // store percentage value, e.g. 80 for 80%
      required: true,
    },
  },
  {
    timestamps: true, // createdAt will act as interview date/time
  }
);

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;


