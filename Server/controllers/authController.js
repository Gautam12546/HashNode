const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      token,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      token,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};


// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

module.exports = { registerUser, loginUser, getMe };