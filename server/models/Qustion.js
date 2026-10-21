const mongoose = require('mongoose');

// Schema: Defines the shape of a Question document
const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } // Automatically sets the time
});

module.exports = mongoose.model('Question', QuestionSchema);