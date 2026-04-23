const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Event = require('../models/Event');

const router = express.Router();

router.use(protect);

// @desc    Get all events
// @route   GET /api/events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ status: 'approved' }).populate('club', 'name');
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});


module.exports = router;
