const userModel = require('../models/userModel');

const user = async function (req, res) {
   const id = req.params.id;
   try {
      if (!id) return res.status(400).json({ message: `no data provided, pls try again` });

      const usersBookings = await userModel.findOne({ _id: id });

      if (!usersBookings) return res.status(400).json({ message: `user not found` });

      res.status(200).json({ data: usersBookings.bookings });
   } catch (error) {
      console.log(error);
   }
};

module.exports = user;
