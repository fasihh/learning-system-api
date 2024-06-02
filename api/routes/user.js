const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user');

router.get('/', UserController.getAllUsers);

router.post('/signin', UserController.userSignIn);
router.post('/signup', UserController.userSignUp);

module.exports = router;