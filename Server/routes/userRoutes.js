const express = require('express');
const { getUserProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.get('/:id', getUserProfile);
router.put('/me', protect, updateProfile);

module.exports = router;