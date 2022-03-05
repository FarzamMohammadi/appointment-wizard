import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createAppointment } from '../../actions/appointments';
import './appointments.css';

const initialState = {
  cardNumber: '',
  vaccineSite: '',
  priorityArea: '',
  dateTime: '',
  cancelled: 'false',
};

export default function AddAppointments() {
  let navigate = useNavigate();
  const [executed, setExecuted] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { cardNumber, vaccineSite, priorityArea, dateTime, cancelled } =
    formData;

  async function handleSubmit(e) {
    e.preventDefault();
    const appointmentCreatedPromise = await createAppointment(formData).then(
      function (isCreated) {
        if (isCreated) {
          navigate('/list-appointments');
        }
      }
    );
    setFormData(initialState);
  }

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Fragment>
      <section className='container'>
        <h1>Add New Appointment</h1>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group'>
            <p>Card Number:*</p>
            <input
              type='text'
              placeholder='123-4567-8910'
              name='cardNumber'
              value={cardNumber}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Vaccine Site:*</p>
            <input
              type='text'
              placeholder='North York'
              name='vaccineSite'
              value={vaccineSite}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Priority Area:*</p>
            <input
              type='text'
              placeholder='80+ / healthcare / essential'
              name='priorityArea'
              value={priorityArea}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Date & Time:*</p>
            <input
              type='datetime-local'
              placeholder=''
              name='dateTime'
              value={dateTime}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Cancelled:</p>
            <input
              type='text'
              placeholder='false by default'
              name='cancelled'
              value={cancelled}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <button type='submit' className='submit-button'>
            Submit
          </button>
        </form>
        <p>
          <Link to='/list-appointments'>View All Appointments</Link>
        </p>
      </section>
    </Fragment>
  );
}
