const commentsModel = require('../models/commentsModel');

// helper for getting only required data from comments
const findComments = function (comments) {
   return comments.map((value) => {
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
};

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

      const comments = await commentsModel.find({ id });

      // function thats returns comments
      const sendComments = findComments(comments);

      if (comments) res.status(201).json({ message: `Comment successfully created`, sendComments });
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

      // function thats returns comments
      const sendComments = findComments(comments);

      if (comments) res.status(200).json(sendComments);
   } catch (error) {
      next(error);
   }
};

// update comment
const updateComments = async function (req, res, next) {
   try {
      const { post, id } = req.body;

      if (!post || !id) return res.status(400).json({ message: `No data provided` });

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

// update amount likes of comment
const amountOfCommentLikes = async function (req, res, next) {
   try {
      const { id, likes } = req.body;

      if (!id) return res.status(404).json({ message: `No data provided` });

      const respond = await commentsModel.updateOne({ _id: id }, { likes });

      if (!respond) res.status(400).json({ message: `Error occurred couldn't process request` });

      res.status(200).json({ message: `Thank you for adding your likes` });
   } catch (error) {
      next(error);
   }
};

module.exports = { createComments, getComments, updateComments, deleteComments, amountOfCommentLikes };
