const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Post = require('../models/Post');

// Get current user's profile and posts
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load profile' });
  }
});

// Get another user's profile by ID (for viewing profile by clicking name)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load user profile' });
  }
});

module.exports = router;
