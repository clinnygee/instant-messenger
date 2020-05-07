const express = require('express');
const router = express.Router();
const AuthController = require('./Auth.controller');
const withAuth = require('../../middleware/auth');

router.post('/login', AuthController.logIn);

router.post('/register', AuthController.register);

router.post('/logout', AuthController.logOut);

router.get('/checkToken',withAuth, AuthController.checkToken);




module.exports = router;