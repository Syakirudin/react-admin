// src/pages/HomePage.jsx

import React, { useEffect, useState } from 'react';
import { get } from '../services/apiService';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get('/users'); // Replace with your API endpoint
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.username}</li> // Adjust according to your data structure
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
