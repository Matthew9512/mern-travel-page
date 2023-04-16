const travelModel = require('../models/travelDataModel');
const { format } = require('date-fns');

/**
 *
 * @todo if/eles
 * @todo check json responses
 * @todo date and price date must starts with 01
 */

const sendCategoryData = async function (req, res) {
   try {
      const respond = await travelModel.find({ category: 'most popular' });
      res.status(200).json(respond);
   } catch (error) {
      console.error(error);
      res.status(404).json({ message: error.message });
   }
};

const sendSearchInputData = async function (req, res) {
   try {
      const respond = await travelModel.find();
      res.status(200).json(respond);
   } catch (error) {
      console.error(error);
      res.status(404).json({ message: error.message });
   }
};

const sendDataByID = async function (req, res) {
   const id = req.params.id;
   try {
      const respond = await travelModel.findById({ _id: id });
      res.status(200).json(respond);
   } catch (error) {
      console.error(error);
      res.status(404).json({ message: `Invalid id please try again` });
   }
};

const sendQueryData = async function (req, res) {
   const { startDate, endDate, price, city } = req.query;
   const reqStartDate = startDate ? startDate : format(new Date(2022, 00, 01), 'dd/MM/yyyy');
   const reqEndDate = endDate ? endDate : format(new Date(2024, 12, 29), 'dd/MM/yyyy');
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
      return res.status(400).json({ message: error.message });
   }
};

module.exports = { sendCategoryData, sendSearchInputData, sendDataByID, sendQueryData };
