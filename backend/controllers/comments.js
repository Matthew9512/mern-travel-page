const commentsModel = require('../models/commentsModel');

// limit of items in response
const _resLimit = 3;

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

      const numberOfResults = await commentsModel.find({ id }).countDocuments();
      const comments = await commentsModel
         .find({ id })
         .sort({ createdAt: -1 })
         .limit(_resLimit)
         .skip(0 * _resLimit);

      res.status(200).json({ comments, numberOfResults, message: `Comment successfully created` });
      return;
   } catch (error) {
      next(error);
   }
};

// send comments related to id of travel
const getComments = async function (req, res, next) {
   try {
      const { id } = req.params;
      const { page } = req.query;

      if (!id) return res.status(400).json({ message: `No data provided` });
      const numberOfResults = await commentsModel.find({ id }).countDocuments();

      const comments = await commentsModel
         .find({ id })
         .sort({ createdAt: -1 })
         .limit(_resLimit)
         .skip(page * _resLimit);

      res.status(200).json({ comments, numberOfResults });
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
