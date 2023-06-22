const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const verifyJwt = require('../middleware/verifyJwt');

router.post('/login', users.logIn);
router.post('/signin', users.signIn);
router.post('/logout', users.logOut);
router.delete('/delete', verifyJwt, users.deleteAccount);
router.get('/:id', verifyJwt, users.getUser);
router.patch('/likes/rate/update', verifyJwt, users.updateLikesType);
router.post('/refresh', users.refreshJwt);

module.exports = router;
