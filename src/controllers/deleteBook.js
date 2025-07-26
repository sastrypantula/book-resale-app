const User = require('../models/user');
const Book = require('../models/book');

const deleteBook = async (req, res) => {
    const userId = req.user._id;
    const bookId = req.params.id;

    try {
        // Debug: Log the IDs
        console.log('Delete request - User ID:', userId);
        console.log('Delete request - Book ID:', bookId);
        
        if (!userId) {
            return res.status(400).json({ message: 'User ID not found' });
        }

        // 1. Find the user and populate booksListed
        const user = await User.findById(userId).populate({
            path: 'booksListed',
            select: '_id',
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User books listed:', user.booksListed.map(b => b._id));

        // 2. Check if the book exists
        const book = await Book.findById(bookId);
        console.log('Book found:', book ? 'Yes' : 'No');
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // 3. Check if the user is the seller of this book
        if (book.seller.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not allowed to delete this book' });
        }

        // 4. Check if bookId exists in user's booksListed
        const isBookInList = user.booksListed.some(b => b._id.toString() === bookId);
        if (!isBookInList) {
            return res.status(403).json({ message: 'Book is not listed by you' });
        }

        // 5. Delete the book
        await Book.findByIdAndDelete(bookId);

        // 6. Remove book from user's booksListed
        await User.findByIdAndUpdate(userId, {
            $pull: { booksListed: bookId }
        });

        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { deleteBook };
