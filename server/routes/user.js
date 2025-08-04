const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');

// @route   GET /api/users/profile
// @desc    Get logged-in user's profile and posts
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    // Fetch user info (excluding password)
    const user = await User.findById(req.user.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch posts authored by this user
    const posts = await Post.find({ author: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      posts
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
