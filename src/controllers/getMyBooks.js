const Book = require('../models/book');
const User = require('../models/user'); 

const getMyBooks = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID not found' });
        }
        
        const userWithBooks = await User.findById(userId)
            .populate({
                path: 'booksPurchased',
                select: 'title author subject originalPrice sellingPrice images',
            });
            
        if (!userWithBooks) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({
            message: 'Books fetched successfully',
            books: userWithBooks.booksPurchased
        });
    } catch (error) {
        console.error('Error fetching user books:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

module.exports = { getMyBooks };
  

