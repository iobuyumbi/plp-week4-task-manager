const jwt = require("jsonwebtoken");
const User = require("../models/User");

// checks token and sets request user
exports.protect = async (req, res, next) => {
  let token;
  // Check if token is in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // If no token, return unauthorized
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    console.log("Verifying token...");
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", { id: decoded.id, role: decoded.role });

    // Find user by id
    req.user = await User.findById(decoded.id);
    console.log(
      "User found:",
      req.user
        ? { _id: req.user._id, email: req.user.email, role: req.user.role }
        : "Not found"
    );

    if (!req.user) {
      console.log("User not found in database");
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(403).json({ message: "Forbidden" });
  }
};

// Check role of user
exports.authorize = (roles) => {
  return (req, res, next) => {
    // If no user or role, return unauthorized
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if user role is in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
