const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, authorize('professor'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome Professor Dashboard',
    user: req.user,
  });
});

module.exports = router;
