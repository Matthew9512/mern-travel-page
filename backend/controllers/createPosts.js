const postModel = require('../models/postsModel');

// asyncHandler?!?!
const createPosts = async function (req, res) {
   const { id, username, post } = req.body;

   if (!id || !username || !post) return res.status(400).json({ message: `No data provided` });

   const newPost = await postModel.create({
      id: id,
      username: username,
      post: post,
   });

   if (!newPost) return res.status(404).json({ message: `Can't create new post` });
   res.status(201).json({ message: `Post successfully created` });
};

module.exports = createPosts;
