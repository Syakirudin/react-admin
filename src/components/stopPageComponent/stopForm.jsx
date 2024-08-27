import React, { useState } from 'react';
import '../style/stopFrom.css';

const StopForm = () => {
  const [formData, setFormData] = useState({
    location_name: '',
    city_name: '',
    coordinate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your API
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="location_name">Location Name:</label>
        <input
          type="text"
          id="location_name"
          name="location_name"
          value={formData.location_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="city_name">City Name:</label>
        <input
          type="text"
          id="city_name"
          name="city_name"
          value={formData.city_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="coordinate">Coordinate:</label>
        <input
          type="text"
          id="coordinate"
          name="coordinate"
          value={formData.coordinate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default StopForm;
