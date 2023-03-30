const travelModel = require('../models/travelDataModel');

const updatePlacesNumber = async function (req, res) {
   const { places, id } = req.body;

   if (!places || !id) return res.status(404).json({ message: `No data provided` });

   const update = await travelModel.findOne({ _id: id });

   // calc how many places will stay after booking
   const verPlaces = +update.availablePlaces - +places;

   // return if number of available places will be less than 0
   if (verPlaces < 0)
      return res.status(404).json({ message: `You can't bookmark ${places} places, there's only ${update.availablePlaces} left` });

   // return if there's no places left
   if (verPlaces === 0) return res.status(404).json({ message: `There's no places left for this travel` });

   await travelModel.updateOne({ _id: id }, { availablePlaces: verPlaces });

   res.status(200).json({ message: `You have succesfully bookmarked travel`, data: verPlaces });
};

module.exports = updatePlacesNumber;
