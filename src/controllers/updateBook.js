const Book = require('../models/book');

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user._id; // ✅ FIXED - should be _id not id

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.seller.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not allowed to update this book' });
    }

    // Only update allowed fields
    const fieldsToUpdate = ['title', 'author', 'subject', 'originalPrice', 'sellingPrice', 'description'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field]) book[field] = req.body[field];
    });

    await book.save();

    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { updateBook };
