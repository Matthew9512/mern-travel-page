const express = require('express');
const router = express.Router();
const travelModel = require('../models/travelDataModel');

router.get('/', async (req, res) => {
  try {
    const respond = await travelModel.find({ category: 'most popular' });
    res.status(200).json(respond);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const respond = await travelModel.find();
    res.status(200).json(respond);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
});

router.get('/search/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const respond = await travelModel.findById({ _id: id });
    res.status(200).json(respond);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: `Invalid id please try again` });
  }
});

router.get('/q', async (req, res) => {
  const { startDate, endDate, price, city } = req.query;
  const reqStartDate = startDate ? startDate : new Date('2023-03-17').toJSON().slice(0, 10);
  const reqEndDate = endDate ? endDate : new Date('2024-12-29').toJSON().slice(0, 10);
  // const reqStartDate = startDate ? new Date(startDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
  // const reqEndDate = endDate ? new Date(endDate).toLocaleDateString('en-GB') : new Date('16/04/2023').toLocaleDateString('en-GB');
  const reqPrice = +price || 10_000;
  const reqCity = city || { $ne: null };

  try {
    const respond = await travelModel.find({
      startDate: { $gte: reqStartDate, $lte: reqEndDate },
      price: { $lte: reqPrice },
      city: reqCity,
    });
    if (!respond.length)
      throw new Error(`Looks like we can't find places that you are looking for, please change your criteria or see our full offer ;)`);
    res.status(200).json(respond);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
