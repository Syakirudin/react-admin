import React, { useState, useEffect } from "react";
import axios from "axios";

const StopList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Separate state for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setData(response.data);
      } catch (err) {
        setError(err.message); // Set error message in case of failure
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Stop List</h1>
      {error ? (
        <p>Error: {error}</p> // Display error message if an error occurred
      ) : data && data.length > 0 ? (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default StopList;
