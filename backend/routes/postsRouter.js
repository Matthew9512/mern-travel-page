const express = require('express');
const router = express.Router();
const createPosts = require('../controllers/createPosts');
const getPosts = require('../controllers/getPosts');
const deletePosts = require('../controllers/deletePosts');
const updatePosts = require('../controllers/updatePosts');
const likesOnPosts = require('../controllers/likesOnPosts');

router.route('/:id/comments').post(createPosts).get(getPosts).patch(updatePosts);
router.delete('/delete', deletePosts);
router.route('/likes').patch(likesOnPosts);

module.exports = router;
