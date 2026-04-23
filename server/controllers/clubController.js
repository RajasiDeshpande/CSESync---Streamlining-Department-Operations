const Event = require('../models/Event');
const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Get club dashboard statistics
// @route   GET /api/club/dashboard
// @access  Private/Club
exports.getDashboard = async (req, res) => {
  try {
    const clubId = req.user.id;

    // Get club events
    const myEvents = await Event.find({ club: clubId });
    
    // Get total RSVP count (assuming attendees field might exist or be added)
    // For now, let's just count events
    const activeEvents = await Event.countDocuments({ 
      club: clubId,
      date: { $gte: new Date() }
    });


    const pastEvents = myEvents.length - activeEvents;

    // Recent notifications sent by club
    const recentNotifications = await Notification.find({
      sender: clubId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalEvents: myEvents.length,
          activeEvents,
          pastEvents,
        },
        myEvents,
        recentNotifications,
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

// @desc    Create a new event
// @route   POST /api/club/events
// @access  Private/Club
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      category,
      club: req.user.id,
    });


    // Automatically create a notification for all students about the new event
    // Find all students
    const students = await User.find({ role: 'student' }).select('_id');
    
    const notifications = students.map(student => ({
      title: `New Event: ${title}`,
      message: `${req.user.name} has scheduled a new event: ${title} on ${new Date(date).toLocaleDateString()}`,
      recipient: student._id,
      sender: req.user.id,
      category: 'event',
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      success: true,
      data: event,
      message: 'Event created and students notified!',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete an event
// @route   DELETE /api/club/events/:id
// @access  Private/Club
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.club.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }


    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Event removed',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
