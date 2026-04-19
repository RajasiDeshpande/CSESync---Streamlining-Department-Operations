const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, authorize('club'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome Club Dashboard',
    user: req.user,
  });
});

module.exports = router;
