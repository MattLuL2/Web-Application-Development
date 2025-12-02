
const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactsController');
const auth = require('../middleware/auth');

// Public: get all and get by id
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected create/update/delete
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.deleteById);
router.delete('/', auth, controller.deleteAll);

module.exports = router;
