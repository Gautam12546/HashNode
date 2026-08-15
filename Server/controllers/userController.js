const User = require('../models/User');
const Post = require('../models/Post');

// @desc    Get user profile by ID (public)
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Get published posts by this user
  const posts = await Post.find({ author: id, status: 'published' })
    .populate('tags', 'name slug')
    .sort({ createdAt: -1 });

  res.json({ user, posts });
};

// @desc    Update current user profile
// @route   PUT /api/users/me
// @access  Private
const updateProfile = async (req, res) => {
  const { name, bio, avatarUrl } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name || user.name;
  user.bio = bio !== undefined ? bio : user.bio;
  user.avatarUrl = avatarUrl !== undefined ? avatarUrl : user.avatarUrl;

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    bio: updatedUser.bio,
    avatarUrl: updatedUser.avatarUrl,
  });
};

module.exports = { getUserProfile, updateProfile };