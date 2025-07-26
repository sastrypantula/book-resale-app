const jwt = require("jsonwebtoken");
const User = require('../src/models/user');

const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const { token } = req.cookies;

      if (!token) throw new Error("Token not found");

      const payload = jwt.verify(token, process.env.JWT_KEY);
      const user = await User.findById(payload._id);

      if (!user) throw new Error("User not found");

      // Check role
      if (!allowedRoles.includes(user.role)) {
        throw new Error("Not authorized");
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).send("Unauthorized: " + err.message);
    }
  };
};

module.exports = authMiddleware;
