const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getStats,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getEvents,
  updateEventStatus,
  deleteEvent,
  createNotification,
  getReports

} = require('../controllers/adminController');


const router = express.Router();

// All routes are protected and admin only
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


router.get('/courses', getCourses);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);


router.get('/departments', getDepartments);
router.post('/departments', createDepartment);
router.put('/departments/:id', updateDepartment);
router.delete('/departments/:id', deleteDepartment);


router.get('/events', getEvents);
router.put('/events/:id', updateEventStatus);
router.delete('/events/:id', deleteEvent);


router.post('/notifications', createNotification);

router.get('/reports', getReports);

module.exports = router;

