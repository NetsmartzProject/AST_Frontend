import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './USER/Login';
import User from './USER/Dash/User';
import Navbar from './USER/Navbar';
import Signup from './USER/Dash/SignUp';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<User />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
