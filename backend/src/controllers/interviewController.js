// Get mock interview questions
const getInterviewQuestions = (req, res) => {
  try {
    const questions = [
      "Tell me about yourself and your experience.",
      "What are your strengths and weaknesses?",
      "Describe a challenging project you worked on and how you handled it.",
      "How do you handle working under pressure?",
      "What programming languages and technologies are you most comfortable with?",
      "Explain a time when you had to learn a new technology quickly.",
      "How do you approach debugging a complex issue?",
      "What development methodologies are you familiar with?",
      "How do you stay updated with the latest technologies?",
      "Where do you see yourself in 5 years?"
    ];

    res.status(200).json(questions);
  } catch (error) {
    console.error('Error getting interview questions:', error);
    res.status(500).json({ message: 'Failed to fetch interview questions' });
  }
};

module.exports = {
  getInterviewQuestions
};