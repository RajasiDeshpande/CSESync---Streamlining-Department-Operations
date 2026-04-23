const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { 
  getDashboard, 
  getEnrolledCourses, 
  toggleEnrollment,
  toggleEventInterest
} = require('../controllers/studentController');


const router = express.Router();

router.use(protect);
router.use(authorize('student'));

router.get('/dashboard', getDashboard);
router.get('/courses', getEnrolledCourses);
router.post('/courses/:id/enroll', toggleEnrollment);
router.post('/events/:id/register', toggleEventInterest);


module.exports = router;
