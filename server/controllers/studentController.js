const Course = require('../models/Course');
const Event = require('../models/Event');
const Notification = require('../models/Notification');

// @desc    Get student dashboard stats and data
// @route   GET /api/student/dashboard
// @access  Private/Student
exports.getDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get enrolled courses count
    const enrolledCoursesCount = await Course.countDocuments({
      enrolledStudents: studentId,
    });

    // Get upcoming events count (simulated or simplified)
    const upcomingEventsCount = await Event.countDocuments({
      date: { $gte: new Date() },
    });

    // Get unread notifications count
    const unreadNotificationsCount = await Notification.countDocuments({
      recipient: studentId,
      isRead: false,
    });

    // Get recent notifications
    const recentNotifications = await Notification.find({
      $or: [{ recipient: studentId }, { recipientRole: 'student' }, { recipientRole: 'all' }],
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get upcoming events
    const upcomingEvents = await Event.find({
      date: { $gte: new Date() },
    })
      .sort({ date: 1 })
      .limit(3);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          enrolledCourses: enrolledCoursesCount,
          upcomingEvents: upcomingEventsCount,
          unreadNotifications: unreadNotificationsCount,
        },
        recentNotifications,
        upcomingEvents,
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

// @desc    Get all courses student is enrolled in
// @route   GET /api/student/courses
// @access  Private/Student
exports.getEnrolledCourses = async (req, res) => {
  try {
    const courses = await Course.find({ enrolledStudents: req.user.id }).populate('professor', 'name email');
    
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Enroll or Unenroll from a course
// @route   POST /api/student/courses/:id/enroll
// @access  Private/Student
exports.toggleEnrollment = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const isEnrolled = course.enrolledStudents.includes(req.user.id);

    if (isEnrolled) {
      // Unenroll
      course.enrolledStudents = course.enrolledStudents.filter(
        (id) => id.toString() !== req.user.id.toString()
      );
    } else {
      // Enroll
      course.enrolledStudents.push(req.user.id);
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: isEnrolled ? 'Unenrolled successfully' : 'Enrolled successfully',
      isEnrolled: !isEnrolled,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Register interest for an event
// @route   POST /api/student/events/:id/register
// @access  Private/Student
exports.toggleEventInterest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const isInterested = event.participants.includes(req.user.id);

    if (isInterested) {
      event.participants = event.participants.filter(
        (id) => id.toString() !== req.user.id.toString()
      );
    } else {
      event.participants.push(req.user.id);
    }

    await event.save();

    res.status(200).json({
      success: true,
      message: isInterested ? 'Interest removed' : 'Interest registered',
      isInterested: !isInterested,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

