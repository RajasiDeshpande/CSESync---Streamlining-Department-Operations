const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Course = require('../models/Course');

const router = express.Router();

router.use(protect);

// @desc    Get all courses (with optional filters)
// @route   GET /api/courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('professor', 'name');
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
