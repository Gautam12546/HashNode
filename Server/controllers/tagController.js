const Tag = require('../models/Tag');
const Post = require('../models/Post');

// @desc    Get all tags with post counts
// @route   GET /api/tags
// @access  Public
const getTags = async (req, res) => {
  const tags = await Tag.find().sort({ name: 1 });
  // Count posts per tag (published only)
  const tagsWithCounts = await Promise.all(
    tags.map(async (tag) => {
      const count = await Post.countDocuments({ tags: tag._id, status: 'published' });
      return { ...tag.toObject(), postCount: count };
    })
  );
  res.json(tagsWithCounts);
};

// @desc    Get published posts for a specific tag
// @route   GET /api/tags/:slug/posts
// @access  Public
const getTagPosts = async (req, res) => {
  const { slug } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const tag = await Tag.findOne({ slug });
  if (!tag) {
    return res.status(404).json({ message: 'Tag not found' });
  }

  const query = { tags: tag._id, status: 'published' };
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const posts = await Post.find(query)
    .populate('author', 'name avatarUrl')
    .populate('tags', 'name slug')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Post.countDocuments(query);

  res.json({
    posts,
    page: parseInt(page),
    totalPages: Math.ceil(total / parseInt(limit)),
    total,
    tag: tag.name,
  });
};

module.exports = { getTags, getTagPosts };