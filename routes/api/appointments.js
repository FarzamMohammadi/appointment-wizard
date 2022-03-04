const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');

const Appointment = require('../../models/Appointment');

// @route   GET api/appointments
// @desc    Get all appointments
// @access  private
router.get('/', async (req, res) => {
  try {
    const appointmentList = await Appointment.find();
    res.status(200).json({ appointments: appointmentList });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/appointments
// @desc    Create new appointment
// @access  private
router.post(
  '/',
  [
    check('cardNumber', 'Health card number is required').not().isEmpty(),
    check('vaccineSite', 'Vaccine location is required').not().isEmpty(),
    check(
      'priorityArea',
      `Must select one of the following: '80+', 'healthcare', 'essential'`
    )
      .not()
      .isEmpty(),
    check('dateTime', 'Must select a date and time').not().isEmpty(),
  ],
  async (req, res) => {
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
  }
);

// @route   DELETE api/appointments/:id
// @desc    Delete appointment
// @access  private
router.delete('/:id', async (req, res) => {
  try {
    appointment = await Appointment.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Appointment has been cancelled' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message, type: 'Server error' });
  }
});

module.exports = router;
