const express = require('express');
const router = express.Router();
const comments = require('../controllers/comments');

router.route('/:id').post(comments.createComments).get(comments.getComments).patch(comments.updateComments);
router.delete('/delete', comments.deleteComments);
router.patch('/likes/rate', comments.amountOfCommentLikes);
// router.patch('/likes/rate/update', comments.updateLikesOnComments);

module.exports = router;
