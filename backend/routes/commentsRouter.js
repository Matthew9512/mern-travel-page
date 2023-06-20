const express = require('express');
const router = express.Router();
const comments = require('../controllers/comments');
const verifyJwt = require('../middleware/verifyJwt');

router.route('/:id').post(verifyJwt, comments.createComments).patch(verifyJwt, comments.updateComments);
router.get('/:id/q', comments.getComments);
router.delete('/delete', verifyJwt, comments.deleteComments);
router.patch('/likes/rate', comments.amountOfCommentLikes);

module.exports = router;
