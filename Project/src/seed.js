require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Book = require('./models/Book');

const seed = async () => {
  await connectDB();
  await User.deleteMany({});
  await Book.deleteMany({});

  const user1 = new User({ name: 'Alice Example', email: 'alice@example.com', password: 'password123', role: 'admin' });
  const user2 = new User({ name: 'Bob Example', email: 'bob@example.com', password: 'password123' });
  await user1.save();
  await user2.save();

  const b1 = new Book({ title: 'The Node Way', author: 'Jane Dev', isbn: '1234567890', description: 'Intro to Node.js', createdBy: user1._id });
  const b2 = new Book({ title: 'Mongo Deep Dive', author: 'John Data', isbn: '0987654321', description: 'Working with MongoDB', createdBy: user2._id });
  await b1.save();
  await b2.save();

  console.log('Seeded users and books.');
  mongoose.connection.close();
};

seed().catch(err => console.error(err));
