import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddAppointment from './components/appointments/AddAppointments';
import ListAppointment from './components/appointments/ListAppointments';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<AddAppointment />} />
        <Route exact path='/list-appointments' element={<ListAppointment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
