// backend/src/controllers/resumeController.js

// NOTE: pdf-parse intentionally disabled (fallback mode)

const SKILL_KEYWORDS = [
  "javascript",
  "react",
  "node",
  "express",
  "mongodb",
  "html",
  "css",
  "git",
  "github",
  "rest",
  "api"
];

// Upload works as before
const uploadResume = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  return res.status(200).json({
    message: "Resume uploaded successfully",
    filename: req.file.originalname
  });
};

// SAFE fallback analyze (never throws)
const analyzeResume = async (req, res) => {
  console.log("🔥 FALLBACK ANALYZE CONTROLLER HIT 🔥");

  if (!req.file) {
    return res.status(400).json({ message: "No resume file uploaded" });
  }

  // Fallback logic (no pdf, no AI)
  const matchedSkills = ["javascript", "react", "html", "css"];
  const missingSkills = SKILL_KEYWORDS.filter(
    (s) => !matchedSkills.includes(s)
  );

  return res.status(200).json({
    status: "success",
    analysisType: "fallback",
    matchedSkills,
    missingSkills,
    note: "Fallback analysis used due to PDF parser instability"
  });
};

module.exports = {
  uploadResume,
  analyzeResume
};
