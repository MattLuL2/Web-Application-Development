const Book = require('../models/Book');

exports.createBook = async (req, res, next) => {
  try {
    const { title, author, isbn, description, publishedDate } = req.body;
    if (!title || !author) return res.status(400).json({ message: 'Title and author required' });
    const book = new Book({ title, author, isbn, description, publishedDate, createdBy: req.user._id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate('createdBy', 'name email');
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', 'name email');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    // only owner or admin
    if (String(book.createdBy) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this book' });
    }
    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (String(book.createdBy) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this book' });
    }
    await book.remove();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};
