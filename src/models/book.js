const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'zoology', 'Other']
  },
  
  originalPrice: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    maxLength: 500
  },
  images: [{
    type: String, // URLs of book images
    required: true
  }],
  
  // Seller (User with role: 'seller')
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    
  },

  isSold: {
    type: Boolean,
    default: false
  },
}, 
{
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
