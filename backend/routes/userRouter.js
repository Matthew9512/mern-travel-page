const express = require('express');
const router = express.Router();
const signIn = require('../controllers/signIn');
const login = require('../controllers/login');

router.post('/login', login);
router.post('/signin', signIn);

module.exports = router;
