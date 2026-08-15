const express = require('express');
const {
  getPublishedPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Post routes
router.route('/')
  .get(getPublishedPosts)
  .post(protect, createPost);

router.get('/mine', protect, getMyPosts);

router.get('/:slug', getPostBySlug);

router.route('/:id')
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;