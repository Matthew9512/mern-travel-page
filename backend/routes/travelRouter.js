const express = require('express');
const router = express.Router();
const { sendCategoryData, sendSearchInputData, sendDataByID, sendQueryData } = require('../controllers/searchTravelData');
const updatePlacesNumber = require('../controllers/updatePlacesNumber');

router.get('/', sendCategoryData);
router.get('/search', sendSearchInputData);
router.get('/search/:id', sendDataByID);
router.get('/q', sendQueryData);
router.patch('/places', updatePlacesNumber);

module.exports = router;
