const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getDashboard,
  getCourseStudents,
  broadcastToCourse
} = require('../controllers/professorController');

const router = express.Router();

router.use(protect);
router.use(authorize('professor'));

router.get('/dashboard', getDashboard);
router.get('/courses/:id/students', getCourseStudents);
router.post('/broadcast', broadcastToCourse);

module.exports = router;
