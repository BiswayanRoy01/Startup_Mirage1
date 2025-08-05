const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  startups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Startup' }]
});

module.exports = mongoose.model('User', userSchema);