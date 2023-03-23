const postModel = require('../models/postsModel');

// asyncHandler?!?!
const getPosts = async function (req, res) {
   console.log(`params`);
   const { id } = req.params;

   if (!id) return res.status(400).json({ message: `No data provided` });

   const posts = await postModel.find({ id: id });

   const sendPosts = posts.map((value) => {
      return { createdAt: value.createdAt, updatedAt: value.updatedAt, post: value.post, username: value.username };
   });

   if (posts) res.status(200).json({ data: sendPosts });
};

module.exports = getPosts;
