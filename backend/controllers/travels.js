const travelsModel = require('../models/travelsModel');
const usersModel = require('../models/usersModel');

// get list on travels based on category
const getFeaturedTravels = async function (req, res, next) {
   try {
      const travelData = await travelsModel.find({ category: 'most popular' });

      if (!travelData.length)
         return res.status(400).json({
            message: `Looks like we can't find any travels at this moment, please try again later ;)`,
         });

      res.status(200).json(travelData);
   } catch (error) {
      next(error);
   }
};

// get full list of travels
const getAllTravles = async function (req, res, next) {
   try {
      const travelData = await travelsModel.find();

      if (!travelData.length)
         return res.status(400).json({
            message: `Looks like we can't find any travels at this moment, please try again later ;)`,
         });

      res.status(200).json(travelData);
   } catch (error) {
      next(error);
   }
};

// get travel by id
const getTravelsByID = async function (req, res, next) {
   try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: `No data provided, pls try again` });

      const travelData = await travelsModel.findById({ _id: id });

      if (!travelData) return res.status(404).json({ message: `Can't find travel` });

      res.status(200).json(travelData);
   } catch (error) {
      next(error);
   }
};

// search based on user inputs data
const getSearchedTravels = async function (req, res, next) {
   const futureData = new Date().getFullYear() + 1;
   const prevData = new Date().getFullYear() - 1;

   const { startDate, endDate, price, city } = req.query;

   const reqStartDate = startDate ? startDate : new Date(prevData, 00, 01).toLocaleDateString('en-GB');
   const reqEndDate = endDate ? endDate : new Date(futureData, 12, 29).toLocaleDateString('en-GB');

   const reqPrice = +price || 10_000;
   const reqCity = city || { $ne: null };

   try {
      const travelData = await travelsModel.find({
         startDate: { $gte: reqStartDate, $lte: reqEndDate },
         price: { $lte: reqPrice },
         city: reqCity,
      });
      if (!travelData.length)
         return res.status(400).json({
            message: `Looks like we can't find places that you are looking for, please change your criteria or see our full offer ;)`,
         });

      res.status(200).json(travelData);
   } catch (error) {
      console.log(error);
      next(error);
   }
};

// update rate of travel
const updateTravelRate = async function (req, res, next) {
   try {
      const { id, travelRate, userID } = req.body;

      if (!id || !travelRate || !userID) return res.status(400).json({ message: `No data provided` });

      const updateRate = await travelsModel.findById({ _id: id });

      if (!updateRate) return res.status(404).json({ message: `Can't find travel` });

      const rate = updateRate.travelRate + +travelRate;

      const votes = updateRate.userVotes + 1;

      await updateRate.updateOne({ travelRate: rate, userVotes: votes });

      await usersModel.updateOne({ _id: userID }, { $addToSet: { userVotes: { travelID: id } } });

      res.status(200).json({ message: `Thank you for your vote` });
   } catch (error) {
      next(error);
   }
};

// check if theres enough available places left to book travel then book this travel
const bookTravel = async function (req, res, next) {
   try {
      const { places, travelID, userID } = req.body;

      if (!places || !travelID) return res.status(404).json({ message: `No data provided` });

      const update = await travelsModel.findOne({ _id: travelID });

      // return if number of requested places if bigger than available places
      if (places > update.availablePlaces)
         return res.status(404).json({
            message: `You can't bookmark ${places} places for this travel, there's only ${update.availablePlaces} left`,
         });

      // calc how many places will stay after booking
      const verPlaces = update.availablePlaces - +places;

      const updatePlaces = await travelsModel.updateOne({ _id: travelID }, { availablePlaces: verPlaces });

      const saveBookings = await usersModel.updateOne({ _id: userID }, { $addToSet: { bookings: travelID } }).orFail();

      const userData = await usersModel.findOne({ _id: userID });

      if (!updatePlaces || !saveBookings)
         return res.status(404).json({ message: `Something went wrong, please try again` });

      const { password, updatedAt, __v, ...user } = userData._doc;

      res.status(200).json({
         message: `You have succesfully bookmarked travel`,
         user,
      });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   getFeaturedTravels,
   getAllTravles,
   getTravelsByID,
   getSearchedTravels,
   updateTravelRate,
   bookTravel,
};
