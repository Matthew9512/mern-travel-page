const userModel = require('../models/userModel');

const userBookings = async function (req, res) {
   const { userID, travelID } = req.body;
   try {
      if (!userID || !travelID) return res.status(400).json({ message: `No data provided` });

      const bookTravel = await userModel.updateOne({ _id: userID }, { $addToSet: { bookings: travelID } }).orFail();

      res.status(200).json({ message: `Travel successfully booked, thank you` });
   } catch (error) {
      return res.status(404).json({ message: `Can't save travel` });
   }
};

module.exports = userBookings;
