const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, default: '' },
  userRole: { type: String, default: 'user' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
