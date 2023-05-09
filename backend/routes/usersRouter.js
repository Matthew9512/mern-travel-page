const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const verifyJwt = require('../middleware/verifyJwt');

router.get('/:id', verifyJwt, users.getUser);
router.patch('/likes/rate/update', verifyJwt, users.updateLikesType);
router.post('/refresh', users.refreshJwt);
router.post('/login', users.logIn);
router.post('/signin', users.signIn);

module.exports = router;
