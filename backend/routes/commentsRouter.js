const express = require('express');
const router = express.Router();
const comments = require('../controllers/comments');

// const createComments = require('../controllers/createComments');
// const getComments = require('../controllers/getComments');
// const deleteComments = require('../controllers/deleteComments');
// const updateComments = require('../controllers/updateComments');
// const likesOnComments = require('../controllers/likesOnComments');

router.route('/:id').post(comments.createComments).get(comments.getComments).patch(comments.updateComments);
router.delete('/delete', comments.deleteComments);
router.patch('/likes/rate', comments.likesOnComments);
// router.route('/likes').patch(comments.likesOnComments);

module.exports = router;
