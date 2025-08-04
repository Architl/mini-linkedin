const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');

// ✅ Get the authenticated user's profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    const posts = await Post.find({ author: req.userId }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load profile' });
  }
});

// ✅ Get a specific user's profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load user profile' });
  }
});

module.exports = router;
