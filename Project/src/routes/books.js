const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { auth } = require('../middleware/auth');

// Public: list and get
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);

// Protected: create, update, delete
router.post('/', auth, bookController.createBook);
router.put('/:id', auth, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
