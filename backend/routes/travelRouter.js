const express = require('express');
const router = express.Router();
const { sendCategoryData, sendSearchInputData, sendDataByID, sendQueryData } = require('../controllers/searchTravelData');
const updatePlacesNumber = require('../controllers/updatePlacesNumber');
const updateTravelRate = require('../controllers/updateTravelRate');

router.get('/featured', sendCategoryData);
router.get('/search', sendSearchInputData);
router.get('/search/:id', sendDataByID);
router.get('/q', sendQueryData);
router.patch('/places', updatePlacesNumber);
router.patch('/places/rate', updateTravelRate);

module.exports = router;
