const express = require('express');
const router = express.Router();
const travels = require('../controllers/travels');
const verifyJwt = require('../middleware/verifyJwt');

router.get('/featured', travels.getFeaturedTravels);
router.get('/search', travels.getAllTravles);
router.get('/search/:id', travels.getTravelsByID);
router.get('/q', travels.getSearchedTravels);
router.patch('/bookings', verifyJwt, travels.bookTravel);
router.put('/places/rate', verifyJwt, travels.updateTravelRate);

module.exports = router;
