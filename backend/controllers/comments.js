const commentsModel = require('../models/commentsModel');

// create new comment
const createComments = async function (req, res, next) {
   try {
      const { id, username, post } = req.body;

      if (!id || !username || !post) return res.status(400).json({ message: `No data provided` });

      const newComment = await commentsModel.create({
         id,
         username,
         post,
      });

      if (!newComment) return res.status(404).json({ message: `Something went wrong, can't create new comment` });

      res.status(201).json({ message: `Comment successfully created` });
   } catch (error) {
      next(error);
   }
};

// send comments related to id of travel
const getComments = async function (req, res, next) {
   try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: `No data provided` });

      const comments = await commentsModel.find({ id });
      const sendComments = comments.map((value) => {
         return {
            createdAt: value.createdAt,
            updatedAt: value.updatedAt,
            post: value.post,
            username: value.username,
            id: value.id,
            postID: value._id,
            likes: value.likes,
            userLikes: value.userLikes,
         };
      });

      if (comments) res.status(200).json({ data: sendComments });
   } catch (error) {
      next(error);
   }
};

// update comment
const updateComments = async function (req, res, next) {
   try {
      const { post, id } = req.body;

      if (!post) return res.status(400).json({ message: `No data provided` });

      const updatedComment = await commentsModel.updateOne({ _id: id }, { post });

      if (!updatedComment) return res.status(404).json({ message: `Can't update comment` });

      res.status(200).json({ message: `Comment successfully updated` });
   } catch (error) {
      next(error);
   }
};

// delete comment
const deleteComments = async function (req, res, next) {
   try {
      const { id } = req.body;

      if (!id) return res.status(404).json({ message: `No data provided` });

      const respond = await commentsModel.deleteOne({ _id: id });

      if (!respond) res.status(400).json({ message: `Error occurred couldn't process request` });

      res.status(200).json({ message: `Comment succesfully deleted` });
   } catch (error) {
      next(error);
   }
};

// update likes of comment and save data of user that rate comment
const likesOnComments = async function (req, res, next) {
   try {
      const { id, likes, userLikes } = req.body;
      // !likes
      if (!id || !userLikes) return res.status(404).json({ message: `No data provided` });

      const respond = await commentsModel.updateMany(
         { _id: id },
         { likes, $addToSet: { userLikes: { userID: userLikes.userID, rateType: userLikes.rateType } } }
      );

      if (!respond) res.status(400).json({ message: `Error occurred couldn't process request` });

      res.status(200).json({ message: `Thank you for adding your likes` });
   } catch (error) {
      next(error);
   }
};

// update like type on comment
const updateLikesOnComments = async function (req, res, next) {
   try {
      const { id, likes, userLikes } = req.body;
      // !likes
      if (!id || !userLikes) return res.status(404).json({ message: `No data provided` });

      const respond = await commentsModel.updateMany(
         { _id: id },
         { likes, userLikes: { userID: userLikes.userID, rateType: userLikes.rateType } }
      );

      if (!respond) res.status(400).json({ message: `Error occurred couldn't process request` });

      res.status(200).json({ message: `Thank you for adding your likes` });
   } catch (error) {
      next(error);
   }
};

module.exports = { createComments, getComments, updateComments, deleteComments, likesOnComments, updateLikesOnComments };
