const Book = require('../models/book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ isSold: false }).select('title sellingPrice images _id');
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error getting books' });
  }
};
module.exports = { getAllBooks };