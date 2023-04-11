const travelModel = require('../models/travelDataModel');

// asyncHandler?!?!
const updateTravelRate = async function (req, res) {
   const { id, travelRate } = req.body;

   if (!id) return res.status(400).json({ message: `No data provided` });

   const updateRate = await travelModel.findById({ _id: id });

   if (!updateRate) return res.status(404).json({ message: `Can't find travel` });

   const rate = updateRate.travelRate + +travelRate;

   const votes = updateRate.userVotes + 1;

   await updateRate.updateOne({ travelRate: rate, userVotes: votes });

   res.status(200).json({ message: `Thank you for your vote` });
};

module.exports = updateTravelRate;
