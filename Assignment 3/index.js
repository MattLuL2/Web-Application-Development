const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// in-memory store 
const users = new Map();
let nextId = 1;

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const ACCESS_EXPIRES_IN = 900;
const BCRYPT_ROUNDS = 12; 

const app = express();
app.use(express.json());

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function normalizeName(name) {
  return String(name || '').trim().replace(/\s+/g, ' ');
}

function findUserByEmail(email) {
  email = normalizeEmail(email);
  for (const user of users.values()) {
    if (user.email === email) return user;
  }
  return null;
}

// Route: POST /users/signup
app.post('/users/signup', async (req, res) => {
  try {
    const { email, name, password } = req.body || {};
    if (!email || !name || !password) {
      return res.status(400).json({ status: 'error', error: { code: 'INVALID_INPUT', message: 'email, name and password are required' } });
    }

    const nEmail = normalizeEmail(email);
    const nName = normalizeName(name);

    if (findUserByEmail(nEmail)) {
      return res.status(400).json({
        status: 'error',
        error: { code: 'DUPLICATE_EMAIL', message: 'Email is already registered' }
      });
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const id = String(nextId++);
    const createdAt = new Date().toISOString();
    const user = { id, email: nEmail, name: nName, passwordHash, createdAt };
    users.set(id, user);

    return res.status(201).json({ status: 'ok', data: { userId: id } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' } });
  }
});

// Route: POST /users/login
app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ status: 'error', error: { code: 'INVALID_INPUT', message: 'email and password are required' } });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ status: 'error', error: { code: 'EMAIL_NOT_FOUND', message: 'Email not found' } });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ status: 'error', error: { code: 'BAD_PASSWORD', message: 'Incorrect password' } });
    }

    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });

    return res.status(200).json({
      status: 'ok',
      data: {
        accessToken: token,
        tokenType: 'Bearer',
        expiresIn: ACCESS_EXPIRES_IN
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' } });
  }
});


function authenticateToken(req, res, next) {
  const auth = req.get('Authorization') || req.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', error: { code: 'INVALID_TOKEN', message: 'Invalid or missing token' } });
  }
  const token = auth.slice(7).trim();
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload || !payload.sub) {
      return res.status(401).json({ status: 'error', error: { code: 'INVALID_TOKEN', message: 'Invalid or missing token' } });
    }
    req.userId = String(payload.sub);
    return next();
  } catch (err) {
    return res.status(401).json({ status: 'error', error: { code: 'INVALID_TOKEN', message: 'Invalid or missing token' } });
  }
}

// Route: GET /me (protected)
app.get('/me', authenticateToken, (req, res) => {
  const user = users.get(req.userId);
  if (!user) {
    return res.status(401).json({ status: 'error', error: { code: 'INVALID_TOKEN', message: 'Invalid or missing token' } });
  }

  return res.status(200).json({
    status: 'ok',
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      }
    }
  });
});

app.get('/', (req, res) => res.json({ status: 'ok', now: new Date().toISOString() }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
  console.log(`JWT_SECRET=${JWT_SECRET ? '[set]' : '[not set,use default]'}, BCRYPT_ROUNDS=${BCRYPT_ROUNDS}`);
});
