const Appointment = require('../models/Appointment');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  try {
    const appointmentList = await Appointment.find();
    res.status(200).json({ appointments: appointmentList });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { cardNumber, vaccineSite, priorityArea, dateTime } = req.body;
    const newAppointment = new Appointment({
      cardNumber: cardNumber,
      vaccineSite: vaccineSite,
      priorityArea: priorityArea,
      dateTime: Date.now(),
      cancelled: false,
    });
    const appointment = await newAppointment.save();
    res.json({ msg: 'Appointment has been created', data: newAppointment });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message, type: 'Server error' });
  }
};

exports.deleteById = async (req, res) => {
  try {
    appointment = await Appointment.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Appointment has been cancelled' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message, type: 'Server error' });
  }
};
