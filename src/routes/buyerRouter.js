const express = require('express');
const buyerRouter =  express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { getAllBooks } = require('../controllers/getAllBooks');
const { getBookById } = require('../controllers/getbookbyid');
const { getMyBooks } = require('../controllers/getMyBooks');

buyerRouter.get('/books',authMiddleware(['buyer','seller']),getAllBooks);
buyerRouter.get('/books/mybooks',authMiddleware(['buyer']),getMyBooks); // ✅ Specific route FIRST
buyerRouter.get('/books/:id', authMiddleware(['buyer','seller']), getBookById); // ✅ Parameterized route LAST

module.exports = buyerRouter;
