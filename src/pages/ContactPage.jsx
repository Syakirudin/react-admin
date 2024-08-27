import React from 'react';
import './style/ContactPage.css'; // Create this CSS file for styling

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Get in touch with us through the following means:</p>
      <ul>
        <li>Email: contact@example.com</li>
        <li>Phone: (123) 456-7890</li>
      </ul>
    </div>
  );
};

export default ContactPage;
