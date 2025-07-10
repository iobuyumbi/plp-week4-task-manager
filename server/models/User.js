const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["developer", "admin"],
    default: "developer",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
// This code exports the User model, making it available for use in other parts of the application.
