import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAppointments, deleteAppointment } from '../../actions/appointments';
import moment from 'moment';
import './appointments.css';

export default function ListAppointments() {
  const [appointments, setAppointments] = useState();
  const [executed, setExecuted] = useState(false);

  async function getAppointmentsToShow() {
    if (!executed) {
      const getAppointmentsPromise = await getAppointments().then(function (
        appointments
      ) {
        if (appointments) {
          setAppointments(appointments);
          setExecuted(true);
        }
      });
    }
  }

  function handleDelete(id) {
    if (deleteAppointment(id)) {
      window.location.reload();
    }
  }

  function renderTableData() {
    getAppointmentsToShow();
    return appointments?.map((appointment, index) => {
      const {
        _id,
        cardNumber,
        vaccineSite,
        priorityArea,
        dateTime,
        cancelled,
      } = appointment;
      return (
        <tr key={_id}>
          <td>{cardNumber}</td>
          <td>{vaccineSite}</td>
          <td>{priorityArea}</td>
          <td>{moment(dateTime).format('ddd, MMM DD YYYY, h:mm:ss a')}</td>
          <td>{cancelled.toString()}</td>
          <td>
            <button type='button' onClick={() => handleDelete(_id)}>
              Delete Appointment
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <Fragment>
      <section className='container'>
        <div>
          <h1 id='title'>List of All Appointments:</h1>
          <Link to='/'>
            <button type='button'>Add New Appointment</button>
          </Link>
          <table id='appointments'>
            <tr>
              <th>Card Number:</th>
              <th>Vaccine Site:</th>
              <th>Priority Area:</th>
              <th>Date & Time:</th>
              <th>Cancelled</th>
              <th>Delete</th>
            </tr>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      </section>
    </Fragment>
  );
}
