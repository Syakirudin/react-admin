import React from 'react';
import { Link } from 'react-router-dom';
import './style/NotFoundPage.css'; // Create this CSS file for styling

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
