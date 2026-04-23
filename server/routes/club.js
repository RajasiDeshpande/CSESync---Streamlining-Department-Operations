const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getDashboard,
  createEvent,
  deleteEvent
} = require('../controllers/clubController');

const router = express.Router();

router.use(protect);
router.use(authorize('club'));

router.get('/dashboard', getDashboard);
router.post('/events', createEvent);
router.delete('/events/:id', deleteEvent);

module.exports = router;
