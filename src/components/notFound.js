// src/components/NotFound.js

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        Go back to the <Link to="/">Home Page</Link>.
      </p>
    </div>
  );
};

export default NotFound;
