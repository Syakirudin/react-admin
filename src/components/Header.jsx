import React from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';


const Header = () => {
  return (
    <header className="sidebar">
      <nav>
        <div>PROFILE</div>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/bus-stop">Bus Stop</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
