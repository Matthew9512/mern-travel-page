const travelModel = require('../models/travelDataModel');

/**
 * @todo change number of places to true/false
 */

const updatePlacesNumber = async function (req, res) {
   const { places, id } = req.body;

   if (!places || !id) return res.status(404).json({ message: `No data provided` });

   const update = await travelModel.findOne({ _id: id });

   // return if theres no available places left
   if (!update.availablePlaces) return res.status(404).json({ message: `There's no places left for this travel` });

   // return if number of requested places if bigger than available places
   if (places > update.availablePlaces)
      return res.status(404).json({ message: `You can't bookmark ${places} places, there's only ${update.availablePlaces} left` });

   // calc how many places will stay after booking
   const verPlaces = update.availablePlaces - +places;

   await travelModel.updateOne({ _id: id }, { availablePlaces: verPlaces });

   res.status(200).json({ message: `You have succesfully bookmarked travel`, data: verPlaces });
};

module.exports = updatePlacesNumber;
