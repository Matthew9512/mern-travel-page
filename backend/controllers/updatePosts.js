const postModel = require('../models/postsModel');

// asyncHandler?!?!
const updatePosts = async function (req, res) {
   const { post, id } = req.body;

   if (!post) return res.status(400).json({ message: `No data provided` });

   const updatedPost = await postModel.updateOne({ _id: id }, { post });

   if (!updatedPost) return res.status(404).json({ message: `Can't update post` });

   res.status(200).json({ message: `Post successfully updated` });
};

module.exports = updatePosts;
