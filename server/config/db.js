const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed: ", error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose.
// It exports a function that attempts to connect to the database using the URI specified in the environment variables.
