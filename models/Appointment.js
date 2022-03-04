const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  vaccineSite: {
    type: String,
    required: true,
  },
  priorityArea: {
    type: String,
    enum: ['80+', 'healthcare', 'essential'],
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  cancelled: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);
