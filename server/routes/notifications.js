const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');

const router = express.Router();

router.use(protect);

// @desc    Get user notifications (personal + broadcast by role)
// @route   GET /api/notifications
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const notifications = await Notification.find({
      $or: [
        { recipient: userId },
        { recipientRole: role },
        { recipientRole: 'all' }
      ]
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'name role')
      .limit(50);

    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
router.put('/:id/read', async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc    Mark all notifications as read for this user
// @route   PUT /api/notifications/read-all
router.put('/read-all', async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    await Notification.updateMany(
      {
        $or: [
          { recipient: userId },
          { recipientRole: role },
          { recipientRole: 'all' }
        ],
        isRead: false
      },
      { isRead: true }
    );
    res.status(200).json({ success: true, message: 'All marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
router.delete('/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;

