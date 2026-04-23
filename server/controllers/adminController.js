const User = require('../models/User');
const Course = require('../models/Course');
const Department = require('../models/Department');
const Event = require('../models/Event');
const Notification = require('../models/Notification');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalProfessors = await User.countDocuments({ role: 'professor' });
    const totalClubs = await User.countDocuments({ role: 'club' });
    const totalCourses = await Course.countDocuments();
    const pendingEvents = await Event.countDocuments({ status: 'pending' });

    // Real aggregation for monthly registrations (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const registrations = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo }, role: 'student' } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyRegistrations = registrations.map(reg => ({
      month: monthNames[reg._id - 1],
      count: reg.count
    }));

    // If no data, provide at least some structure
    if (monthlyRegistrations.length === 0) {
      monthlyRegistrations.push({ month: monthNames[new Date().getMonth()], count: 0 });
    }

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalProfessors,
        totalClubs,
        totalCourses,
        pendingEvents,
        monthlyRegistrations
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const query = role ? { role } : {};
    const users = await User.find(query);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a user
// @route   POST /api/admin/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Get all courses
// @route   GET /api/admin/courses
// @access  Private/Admin
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('department professor', 'name');
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a course
// @route   POST /api/admin/courses
// @access  Private/Admin
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/admin/courses/:id
// @access  Private/Admin
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/admin/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Get all departments
// @route   GET /api/admin/departments
// @access  Private/Admin
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('hod', 'name');
    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a department
// @route   POST /api/admin/departments
// @access  Private/Admin
exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({ success: true, data: department });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a department
// @route   PUT /api/admin/departments/:id
// @access  Private/Admin
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.status(200).json({ success: true, data: department });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a department
// @route   DELETE /api/admin/departments/:id
// @access  Private/Admin
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Get all events
// @route   GET /api/admin/events
// @access  Private/Admin
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('club', 'name');
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update event status
// @route   PUT /api/admin/events/:id
// @access  Private/Admin
exports.updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const event = await Event.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/admin/events/:id
// @access  Private/Admin
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      ...req.body,
      sender: req.user.id
    });
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// @desc    Get reports & analytics overview
// @route   GET /api/admin/reports
// @access  Private/Admin
exports.getReports = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Monthly platform activity (all user logins/registrations combined)
    const activityData = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } }
    ]);

    const monthlyActivity = activityData.map(d => ({
      month: monthNames[d._id - 1],
      count: d.count
    }));

    // Course enrollment data for chart
    const courseEnrollments = await Course.aggregate([
      { $project: { name: 1, code: 1, enrolledCount: { $size: { $ifNull: ['$enrolledStudents', []] } } } },
      { $sort: { enrolledCount: -1 } },
      { $limit: 6 }
    ]);

    const coursePerformanceData = courseEnrollments.map(c => ({
      month: c.code,
      count: c.enrolledCount
    }));

    // Top student by...enrollment count
    const topCourse = courseEnrollments[0];

    // Most active club by events
    const mostActiveClub = await Event.aggregate([
      { $group: { _id: '$club', eventCount: { $sum: 1 } } },
      { $sort: { eventCount: -1 } },
      { $limit: 1 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'clubInfo' } },
      { $unwind: { path: '$clubInfo', preserveNullAndEmptyArrays: true } }
    ]);

    // Total enrolled students across all courses
    const enrollmentStats = await Course.aggregate([
      { $project: { enrolledCount: { $size: { $ifNull: ['$enrolledStudents', []] } } } },
      { $group: { _id: null, total: { $sum: '$enrolledCount' }, courseCount: { $sum: 1 } } }
    ]);

    const avgEnrollment = enrollmentStats[0]
      ? Math.round(enrollmentStats[0].total / Math.max(enrollmentStats[0].courseCount, 1))
      : 0;

    res.status(200).json({
      success: true,
      data: {
        monthlyActivity: monthlyActivity.length > 0 ? monthlyActivity : [{ month: monthNames[new Date().getMonth()], count: 0 }],
        coursePerformanceData: coursePerformanceData.length > 0 ? coursePerformanceData : [],
        highlights: {
          topCourse: topCourse ? { name: topCourse.name, detail: `${topCourse.enrolledCount} students enrolled` } : null,
          mostActiveClub: mostActiveClub[0] ? { name: mostActiveClub[0].clubInfo?.name || 'Unknown', detail: `${mostActiveClub[0].eventCount} Events Total` } : null,
          avgEnrollment: { name: `${avgEnrollment} avg`, detail: 'Students per course' }
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

