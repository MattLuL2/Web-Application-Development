const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

// Simple in-memory token blacklist (for signout). Not persistent across restarts.
const tokenBlacklist = new Map();

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already in use' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash, created: new Date(), updated: new Date() });
    await user.save();
    const out = user.toObject();
    delete out.password;
    res.status(201).json(out);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ msg: 'Invalid credentials' });
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signout = async (req, res) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '').trim();
    if (token) {
      // store token with expiry time
      try {
        const decoded = jwt.decode(token);
        const exp = decoded && decoded.exp ? decoded.exp * 1000 : Date.now() + 3600 * 1000;
        tokenBlacklist.set(token, exp);
      } catch (e) {
        tokenBlacklist.set(token, Date.now() + 3600 * 1000);
      }
    }
    res.json({ msg: 'Signed out' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.isBlacklisted = (token) => {
  if (!token) return false;
  const exp = tokenBlacklist.get(token);
  if (!exp) return false;
  if (Date.now() > exp) {
    tokenBlacklist.delete(token);
    return false;
  }
  return true;
};
