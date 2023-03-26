const postsModel = require('../models/postsModel');

// asyncHandler?!?!
const deletePosts = async function (req, res) {
   const { id } = req.body;

   if (!id) return res.status(404).json({ message: `No data provided` });

   const respond = await postsModel.deleteOne({ _id: id });

   if (!respond) res.status(400).json({ message: `Error occurred couldn't process request` });

   res.status(200).json({ message: `Post succesfully deleted` });
};

module.exports = deletePosts;
