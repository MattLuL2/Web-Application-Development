const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  completion: { type: Date },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
