const Book = require('../models/book'); // Missing Book import
const User = require('../models/user'); // import user model too

const addBook = async (req, res) => {
  try {
    const { title, author, subject, originalPrice, sellingPrice, description, images } = req.body;

    if (!title || !author || !subject || !originalPrice || !sellingPrice || !images || images.length === 0) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const newBook = new Book({
      title,
      author,
      subject,
      originalPrice,
      sellingPrice,
      description,
      images,
      seller: req.user._id
    });

    const savedBook = await newBook.save();

    // 👇 Update the seller's list of books
    await User.findByIdAndUpdate(req.user._id, {
      $push: { booksListed: savedBook._id }
    });

    res.status(201).json({
      message: 'Book listed successfully',
      book: savedBook
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { addBook };