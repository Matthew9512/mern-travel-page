const express = require('express');
const router = express.Router();
const travels = require('../controllers/travels');

router.get('/featured', travels.getFeaturedTravels);
router.get('/search', travels.getAllTravles);
router.get('/search/:id', travels.getTravelsByID);
router.get('/q', travels.getSearchedTravels);
router.patch('/bookings', travels.bookTravel);
router.put('/places/rate', travels.updateTravelRate);

module.exports = router;
