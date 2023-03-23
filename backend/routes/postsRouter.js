const express = require('express');
const router = express.Router();
const createPosts = require('../controllers/createPosts');
const getPosts = require('../controllers/getPosts');

router.route('/:id/comments').post(createPosts).get(getPosts);

module.exports = router;
