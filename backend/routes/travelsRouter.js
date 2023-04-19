const express = require('express');
const router = express.Router();
const travels = require('../controllers/travels');

// const { getFeaturedTravels, getTravles, getTravelsByID, getSearchedTravels } = require('../controllers/searchTravelData');
// const updatePlacesNumber = require('../controllers/updatePlacesNumber');
// const updateTravelRate = require('../controllers/updateTravelRate');

router.get('/featured', travels.getFeaturedTravels);
router.get('/search', travels.getAllTravles);
router.get('/search/:id', travels.getTravelsByID);
router.get('/q', travels.getSearchedTravels);
router.patch('/bookings', travels.bookTravel);
router.patch('/places/rate', travels.updateTravelRate);

module.exports = router;
