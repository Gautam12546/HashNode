const express = require('express');
const { uploadImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Upload route
router.post('/', protect, upload.single('image'), uploadImage);

module.exports = router;