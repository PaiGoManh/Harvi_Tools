
// const express = require("express");
// const router = express.Router();
// require("dotenv").config(); // To use environment variables

// // Admin password validation
// router.post("/validate-admin", (req, res) => {
//   const { password } = req.body;

//   // Compare the password with the one stored in the .env file
//   if (password === process.env.ADMIN_PASSWORD) {
//     return res.status(200).json({ success: true, message: "Access granted!" });
//   }

//   return res.status(401).json({ success: false, message: "Invalid password." });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Enable CORS with credentials support

// Use cookie-parser middleware
app.use(cookieParser());

// Admin password validation with JWT
router.post("/validate-admin", (req, res) => {
  const { password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid password." });
  }

  try {
    const token = jwt.sign(
      { id: "admin", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    // Set token in HTTP-only cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure flag in production
      sameSite: "Strict",
      maxAge: 3600000 // 1 hour
    });

    res.status(200).json({ success: true, message: "Access granted!" });

  } catch (error) {
    console.error("JWT generation error:", error);
    res.status(500).json({ success: false, message: "Server error during authentication" });
  }
});

// Logout route to clear the cookie
router.post("/logout", (req, res) => {
  res.clearCookie("adminToken");
  res.json({ success: true, message: "Logged out successfully" });
});

module.exports = router;
