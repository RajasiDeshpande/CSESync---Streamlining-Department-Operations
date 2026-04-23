const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a department name'],
    unique: true,
  },
  code: {
    type: String,
    required: [true, 'Please provide a department code'],
    unique: true,
  },
  hod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Department', DepartmentSchema);
