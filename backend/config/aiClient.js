// Simple OpenAI client setup
// This file creates and exports a single OpenAI client instance
// using the API key stored in the environment variable OPENAI_API_KEY.
// If the key is missing, we log a warning but DO NOT crash the server.
const OpenAI = require('openai');

let openai = null;

if (!process.env.OPENAI_API_KEY) {
  console.warn(
    'OPENAI_API_KEY is not set. AI evaluation endpoints will not work until it is configured.'
  );
} else {
  // Only create the client when we actually have a key
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

module.exports = openai;


