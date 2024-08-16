import React from "react";


const MainPage = () => {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to the Main Page</h1>
      
    </div>
  );
};

// Inline styles
const containerStyle = {
  textAlign: "center",
  marginTop: "50px",
};

const headingStyle = {
  fontSize: "2rem",
  color: "#333",
};



export default MainPage;
