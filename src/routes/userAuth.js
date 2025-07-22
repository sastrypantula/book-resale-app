const express = require('express');
const { register, login, logout } = require('../controllers/userAuthent');
const authRouter =  express.Router();


// Register
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout',logout);


// login
// logout
// GetProfile
module.exports = authRouter;
