// const adminAuthMiddleware = (req, res, next) => {
//     const adminPassword = process.env.ADMIN_PASSWORD;
//     if (req.headers['x-admin-password'] === adminPassword) {
//         next();
//     } else {
//         res.status(403).json({ error: "Unauthorized" });
//     }
// };

// module.exports = adminAuthMiddleware;

const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.adminToken; // Get token from cookies

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = verifyAdmin;
