import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MainPage from "./pages/mainPage";
import UserComponent from "./components/userComponent";
import StopsComponent from "./components/busStopComponent";
import NotFound from "./components/notFound"; // Ensure this component exists
import './App.css'; // Import the CSS file

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/users">Users</Link></li>
      <li><Link to="/stops">Stops</Link></li>
    </ul>
  </nav>
);

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/users" element={<UserComponent />} />
            <Route path="/stops" element={<StopsComponent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
