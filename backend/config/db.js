// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGOURI) {
      throw new Error("MONGOURI is not defined in environment variables");
    }

    // Connect to MongoDB (no deprecated options)
    await mongoose.connect(process.env.MONGOURI);

    // Optional: enable mongoose debug mode for query logging
    mongoose.set("debug", true);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message || error);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = connectDB;
