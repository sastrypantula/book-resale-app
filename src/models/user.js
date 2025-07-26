const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'both'],
    default: 'buyer'
  },
  booksListed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    default: []
  }],
  booksPurchased: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    default: []
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
