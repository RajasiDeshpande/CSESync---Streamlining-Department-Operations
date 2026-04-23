const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  recipientRole: {
    type: String,
    enum: ['all', 'student', 'professor', 'club'],
    default: 'all',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Notification', NotificationSchema);
