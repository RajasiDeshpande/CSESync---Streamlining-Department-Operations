const Course = require('../models/Course');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Get professor dashboard analytics
// @route   GET /api/professor/dashboard
// @access  Private/Professor
exports.getDashboard = async (req, res) => {
  try {
    const professorId = req.user.id;

    // Get assigned courses
    const assignedCourses = await Course.find({ professor: professorId });
    
    // Calculate total students reached
    const totalStudents = assignedCourses.reduce((acc, course) => acc + (course.enrolledStudents?.length || 0), 0);

    // Get recent notifications sent by this professor
    const recentAnnouncements = await Notification.find({
      sender: professorId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalCourses: assignedCourses.length,
          totalStudents: totalStudents,
          announcementsSent: recentAnnouncements.length,
        },
        assignedCourses,
        recentAnnouncements,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get detailed list of students per course
// @route   GET /api/professor/courses/:id/students
// @access  Private/Professor
exports.getCourseStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('enrolledStudents', 'name email');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.professor.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this course' });
    }

    res.status(200).json({
      success: true,
      data: course.enrolledStudents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Broadcast announcement to a course
// @route   POST /api/professor/broadcast
// @access  Private/Professor
exports.broadcastToCourse = async (req, res) => {
  try {
    const { courseId, title, message } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.professor.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to broadcast to this course' });
    }

    // Create notification for all enrolled students
    const notifications = course.enrolledStudents.map((studentId) => ({
      title,
      message: `Course ${course.name}: ${message}`,
      recipient: studentId,
      sender: req.user.id,
      category: 'academic',
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      success: true,
      message: `Announcement sent to ${course.enrolledStudents.length} students.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
