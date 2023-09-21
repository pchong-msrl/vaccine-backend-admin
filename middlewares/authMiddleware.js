const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      // console.log("token:", token);
      return res.status(401).json({ error: "Invalid token." });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = authenticateToken;
