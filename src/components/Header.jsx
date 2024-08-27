import React from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css'; // Create this CSS file for styling

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/stop-page">StopPage</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
