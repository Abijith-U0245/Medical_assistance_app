const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access Denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access Denied. Admins only.' });
    }

    req.user = user; // optional: attach user info to request
    next();
  } catch (err) {
    console.error('isAdmin middleware error:', err.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

module.exports = isAdmin;
