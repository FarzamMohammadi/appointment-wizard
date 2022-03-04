import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddAppointment from './components/appointments/AddAppointments';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<AddAppointment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
