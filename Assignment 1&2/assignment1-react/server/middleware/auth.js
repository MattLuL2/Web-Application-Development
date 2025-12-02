const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('../controllers/authController');

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

module.exports = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ msg: 'Missing token' });
  if (isBlacklisted(token)) return res.status(401).json({ msg: 'Token revoked' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
