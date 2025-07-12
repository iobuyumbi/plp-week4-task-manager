require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Debug environment variables
console.log("Environment check:");
console.log("- MONGO_URI:", process.env.MONGO_URI ? "Present" : "Missing");
console.log("- JWT_SECRET:", process.env.JWT_SECRET ? "Present" : "Missing");
console.log("- PORT:", process.env.PORT || 5000);

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "Server is working!",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

console.log("MONGO_URI:", process.env.MONGO_URI);
