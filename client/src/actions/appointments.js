const axios = require('axios');

export const createAppointment = async (formData) => {
  try {
    const appointment = await axios.post('/api/appointments', formData);
    return true;
  } catch (error) {
    alert('Fill out the forms based on required format');
  }
};

export const getAppointments = async () => {
  try {
    const appointments = await axios.get('/api/appointments');
    return appointments.data.appointments;
  } catch (error) {
    alert(error.message);
  }
};

export const deleteAppointment = async (id) => {
  try {
    const appointment = await axios.delete('/api/appointments/' + id);
    return true;
  } catch (error) {
    alert(error.message);
  }
};
