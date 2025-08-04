const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    const posts = await Post.find({ author: req.userId }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load profile' });
  }
});

module.exports = router;
