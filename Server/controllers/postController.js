const Post = require('../models/Post');
const Tag = require('../models/Tag');
const slugify = require('../utils/slugify');

// Helper: generate unique slug
const generateUniqueSlug = async (title) => {
  let slug = slugify(title);
  let exists = await Post.findOne({ slug });
  let counter = 1;
  while (exists) {
    slug = slugify(title) + '-' + counter;
    exists = await Post.findOne({ slug });
    counter++;
  }
  return slug;
};

// Helper: process tags (find or create)

// New Code start
  const processTags = async (tagNames = []) => {
  const tagIds = [];

  if (!Array.isArray(tagNames)) {
    return tagIds;
  }

  for (let name of tagNames) {
    if (typeof name !== 'string') continue;

    name = name.trim().toLowerCase();

    if (!name) continue;

    const slug = slugify(name);

    try {
      // Find existing tag first
      let tag = await Tag.findOne({ slug });

      if (tag) {
        tagIds.push(tag._id);
        continue;
      }

      // Create only if it doesn't exist
      tag = await Tag.create({
        name,
        slug,
      });

      tagIds.push(tag._id);

    } catch (error) {
      // If another request created the tag at the same time
      if (error.code === 11000) {
        const existingTag = await Tag.findOne({ slug });

        if (existingTag) {
          tagIds.push(existingTag._id);
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  // Remove duplicate tag IDs
  return [
    ...new Map(
      tagIds.map((id) => [id.toString(), id])
    ).values(),
  ];
};
// New Code end
// const processTags = async (tagNames) => {
//   const tagIds = [];
//   for (let name of tagNames) {
//     name = name.trim().toLowerCase();
//     if (!name) continue;
//     let tag = await Tag.findOne({ name });
//     if (!tag) {
//       const slug = slugify(name);
//       tag = await Tag.create({ name, slug });
//     }
//     tagIds.push(tag._id);
//   }
//   return tagIds;
// };

// @desc    Get published posts with optional search and pagination
// @route   GET /api/posts
// @access  Public
const getPublishedPosts = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const query = { status: 'published' };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

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
  });
};

// @desc    Get a single post by slug
// @route   GET /api/posts/:slug
// @access  Public
const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug, status: 'published' })
    .populate('author', 'name avatarUrl bio')
    .populate('tags', 'name slug');

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private

// New Code start
const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      coverImage,
      status,
      tags = [],
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: 'Title and content are required',
      });
    }

    // Generate unique post slug
    const slug = await generateUniqueSlug(title);

    // Generate excerpt from content
    const plainText = content
      .replace(/[#_*`]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    const excerpt = plainText.substring(0, 250);

    // Process tags
    const tagIds = await processTags(tags);

    // Create post
    const post = await Post.create({
      title,
      slug,
      content,
      excerpt,
      coverImage: coverImage || '',
      status: status || 'draft',
      author: req.user.id,
      tags: tagIds,
    });

    // Populate response
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name avatarUrl')
      .populate('tags', 'name slug');

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Create post error:', error);

    res.status(500).json({
      message: 'Failed to create post',
      error: error.message,
    });
  }
};
// New Code end

// SOME DUPLICATE ERROR 
// const createPost = async (req, res) => {
//   const { title, content, coverImage, status, tags = [] } = req.body;

//   if (!title || !content) {
//     return res.status(400).json({ message: 'Title and content are required' });
//   }

//   const slug = await generateUniqueSlug(title);

//   // Generate excerpt from content (first 250 chars stripped of markdown)
//   const plainText = content.replace(/#|_|\*|`|\[.*?\]\(.*?\)/g, '').trim();
//   const excerpt = plainText.substring(0, 250);

//   const tagIds = await processTags(tags);

//   const post = await Post.create({
//     title,
//     slug,
//     content,
//     excerpt,
//     coverImage: coverImage || '',
//     status: status || 'draft',
//     author: req.user.id,
//     tags: tagIds,
//   });

//   const populatedPost = await Post.findById(post._id)
//     .populate('author', 'name avatarUrl')
//     .populate('tags', 'name slug');

//   res.status(201).json(populatedPost);
// };

// DUPLICATE ERROR

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (owner only)
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, coverImage, status, tags = [] } = req.body;

  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Ownership check
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You are not authorized to update this post' });
  }

  // If title changes, generate new slug
  let slug = post.slug;
  if (title && title !== post.title) {
    slug = await generateUniqueSlug(title);
  }

  const tagIds = await processTags(tags);

  // Update excerpt if content changed
  let excerpt = post.excerpt;
  if (content && content !== post.content) {
    const plainText = content.replace(/#|_|\*|`|\[.*?\]\(.*?\)/g, '').trim();
    excerpt = plainText.substring(0, 250);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      title: title || post.title,
      slug,
      content: content || post.content,
      excerpt,
      coverImage: coverImage !== undefined ? coverImage : post.coverImage,
      status: status || post.status,
      tags: tagIds,
    },
    { new: true, runValidators: true }
  )
    .populate('author', 'name avatarUrl')
    .populate('tags', 'name slug');

  res.json(updatedPost);
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (owner only)
const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You are not authorized to delete this post' });
  }

  await post.deleteOne();
  res.json({ message: 'Post removed' });
};

// @desc    Get all posts for the logged-in user (including drafts)
// @route   GET /api/posts/mine
// @access  Private
const getMyPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user.id })
    .populate('tags', 'name slug')
    .sort({ createdAt: -1 });

  res.json(posts);
};

module.exports = {
  getPublishedPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
};