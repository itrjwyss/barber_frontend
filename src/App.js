import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header';
import Barber from './Forms/barber';
import Customer from './Forms/customer';
import {Route, Routes } from 'react-router-dom';
import Service from './Forms/service';
import Appointment from './Forms/appointment';

function App() {
    return(
      <div>
        <Header/>
        <Routes>
          <Route path="/Barberos" element={<Barber/>}></Route>
          <Route path="/Clientes" element={<Customer/>}></Route>
          <Route path="/Servicios" element={<Service/>}></Route>
          <Route path="/Citas" element={<Appointment/>}></Route>
        </Routes>
      </div>
    );
}

export default App;
