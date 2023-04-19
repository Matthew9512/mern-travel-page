const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.get('/:id', users.getUser);
router.post('/login', users.logIn);
router.post('/signin', users.signIn);

module.exports = router;
