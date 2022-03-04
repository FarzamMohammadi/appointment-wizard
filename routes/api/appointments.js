const express = require('express');
const router = express.Router();
const config = require('config');
const { check } = require('express-validator');

const appointmentsController = require('../../controllers/appointments');

// @route   GET api/appointments
// @desc    Get all appointments
// @access  public
router.get('/', appointmentsController.getAll);

// @route   POST api/appointments
// @desc    Create new appointment
// @access  public
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
  appointmentsController.create
);

// @route   DELETE api/appointments/:id
// @desc    Delete appointment
// @access  public
router.delete('/:id', appointmentsController.deleteById);

module.exports = router;
