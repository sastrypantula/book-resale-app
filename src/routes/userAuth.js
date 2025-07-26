const express = require('express');
const { register, login, logout ,getProfile} = require('../controllers/userAuthent');
const authRouter =  express.Router();
const authMiddleware = require('../../middleware/authMiddleware');

// Register
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', authMiddleware(['buyer', 'seller']), logout);
authRouter.get('/profile', authMiddleware(['buyer', 'seller']), getProfile); // TODO: Add getprofile function

module.exports = authRouter;
