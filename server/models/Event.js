const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide an event description'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide an event date'],
  },
  location: String,
  category: {
    type: String,
    enum: ['technical', 'cultural', 'sports', 'workshop', 'other'],
    default: 'technical',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },

  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('Event', EventSchema);
