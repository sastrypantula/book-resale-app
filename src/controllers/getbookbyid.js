// controllers/bookController.js
const Book = require('../models/book');

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId)
      .populate('seller', 'name email') // Get seller details
      .select('-__v'); // remove __v field

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({
      id: book._id,
      title: book.title,
      author: book.author,
      subject: book.subject,
      originalPrice: book.originalPrice,
      sellingPrice: book.sellingPrice,
      description: book.description,
      images: book.images,
      isSold: book.isSold,
      createdAt: book.createdAt,
      seller: book.seller
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getBookById };
