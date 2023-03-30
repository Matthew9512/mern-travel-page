const postsModel = require('../models/postsModel');

// asyncHandler?!?!
const likesOnPosts = async function (req, res) {
   const { id, likes } = req.body;

   if (!id || likes < 0) return res.status(404).json({ message: `No data provided` });

   const respond = await postsModel.updateOne({ _id: id }, { likes });

   if (!respond) res.status(400).json({ message: `Error occurred couldn't process request` });

   res.status(200).json({ message: `Thank you for adding your likes` });
};

module.exports = likesOnPosts;
