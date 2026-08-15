const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  try {
    // Upload stream to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'hashnode', // optional folder
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    res.status(201).json({
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};

module.exports = { uploadImage };