const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import routes
const contactsRouter = require('./server/routes/contacts');
const projectsRouter = require('./server/routes/projects');
const educationsRouter = require('./server/routes/educations');
const usersRouter = require('./server/routes/users');
const authRouter = require('./server/routes/auth');

app.use('/api/contacts', contactsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/qualifications', educationsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send({ message: 'MyPortfolio backend is running' });
});

// Mongoose settings
mongoose.set('strictQuery', false);

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Portfolio';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
