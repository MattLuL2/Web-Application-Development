const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const auth = require('../middleware/auth');

// Public read endpoints
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected write endpoints
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.deleteById);
router.delete('/', auth, controller.deleteAll);

module.exports = router;
