const express = require('express');
const router = express.Router();
const signIn = require('../controllers/signIn');
const login = require('../controllers/login');
const userBookings = require('../controllers/bookings');

router.post('/login', login);
router.post('/signin', signIn);
router.patch('/bookings', userBookings);

module.exports = router;
