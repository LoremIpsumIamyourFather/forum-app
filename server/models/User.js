const mongoose = require('mongoose');

// Schema: Defines the shape of a User document
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // unique: true means no duplicate usernames
  password: { type: String, required: true }
});

// Export the model so it can be used it in routes
module.exports = mongoose.model('User', UserSchema);