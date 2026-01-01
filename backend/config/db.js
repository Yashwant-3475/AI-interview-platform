// Simple MongoDB connection using mongoose
const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the connection string from the environment.
 * Expects MONGODB_URI to be defined in a .env file at the backend root.
 *
 * Important for demo stability:
 * - If MONGODB_URI is missing, we log a warning and DO NOT crash the server.
 * - If the database is temporarily unavailable, we log the error
 *   but still allow the Express server to start.
 */
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not set. Server will start without a database connection.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.warn('Server is running, but MongoDB is currently unavailable.');
  }
};

module.exports = connectDB;


