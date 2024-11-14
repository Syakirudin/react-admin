// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Routes
import Home from "./pages/Home";
import Location from "./pages/Location";
import Routing from "./pages/Routing";
// import Schedule from "./pages/Schedule";
// import Fare from "./pages/Fare";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

import "./App.css"; // Global styling

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/location" element={<Location />} />
          <Route path="/routing" element={<Routing />} />
          {/* <Route path="/schedule" element={<Schedule />} />
          <Route path="/fare" element={<Fare />} /> */}
          <Route path="/setting" element={<Setting />} />


          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
