const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, permit } = require('../middleware/auth');

// GET /api/users - List all users (admin only)
router.get('/', auth, permit('admin'), userController.getUsers);

// GET /api/users/:id - Get user by ID (admin or self)
router.get('/:id', auth, userController.getUser);

// PUT /api/users/:id - Update user (admin or self)
router.put('/:id', auth, userController.updateUser);

// DELETE /api/users/:id - Delete user (admin only)
router.delete('/:id', auth, permit('admin'), userController.deleteUser);

module.exports = router;
