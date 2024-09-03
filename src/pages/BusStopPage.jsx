import React, { useState, useEffect } from "react";
import BusStopForm from "../components/bus-stop-component/BusStopForms.jsx";
import "./style/BusStopPage.css";

const BusStopPage = () => {
  const [stops, setStops] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    no_route: '',
    stops: [
      {
        location_name: '',
        city_name: '',
        coordinate: '',
      },
    ],
  });
  const [fetchedData, setFetchedData] = useState(null); // New state for fetched data

  // Fetch stops from API
  const fetchStops = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stops`);
      const data = await response.json();
      setStops(data);
      setFetchedData(data); // Update the new state
    } catch (error) {
      console.error("Error fetching stops:", error);
    }
  };

  // Call fetchStops when the component mounts
  useEffect(() => {
    fetchStops();
  }, []);

  const handleSubmit = async (data) => {
    if (editIndex !== null) {
      // Editing existing stop
      const stopId = stops[editIndex].id;
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/stops/${stopId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const updatedStop = await response.json();
        const updatedStops = stops.map((stop, index) =>
          index === editIndex ? updatedStop : stop
        );
        setStops(updatedStops);
        setEditIndex(null);
      } catch (error) {
        console.error("Error updating stop:", error);
      }
    } else {
      // Adding new stop
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/stops`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const newStop = await response.json();
        setStops([...stops, newStop]);
      } catch (error) {
        console.error("Error adding stop:", error);
      }
    }
    setFormVisible(false);
  };

  const handleAddNew = () => {
    setFormData({
      no_route: '',
      stops: [
        {
          location_name: '',
          city_name: '',
          coordinate: '',
        },
      ],
    });
    setEditIndex(null);
    setFormVisible(true);
  };

  const handleCancel = () => {
    setFormVisible(false);
    setFormData({
      no_route: '',
      stops: [
        {
          location_name: '',
          city_name: '',
          coordinate: '',
        },
      ],
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const stopToEdit = stops[index];
    setFormData({
      no_route: stopToEdit.no_route,
      stops: stopToEdit.stops,
    });
    setEditIndex(index);
    setFormVisible(true);
  };

  const handleDelete = async (index) => {
    const stopId = stops[index].id;
    if (window.confirm("Are you sure you want to delete this stop?")) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/stops/${stopId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const updatedStops = stops.filter((_, i) => i !== index);
        setStops(updatedStops);
      } catch (error) {
        console.error("Error deleting stop:", error);
      }
    }
  };

  return (
    <div className="BusStopPage">
      <h1>This is Bus Stop Page</h1>

      {isFormVisible ? (
        <>
          <button onClick={handleCancel}>Cancel</button>
          <BusStopForm
            onSubmit={handleSubmit}
            initialData={formData}
            isEditMode={editIndex !== null}
          />
        </>
      ) : (
        <button onClick={handleAddNew}>Add New Stop</button>
      )}

      {/* Display cards for fetched data */}
      <div className="card-container">
        {fetchedData && fetchedData.length > 0 ? (
          fetchedData.map((stop, index) => (
            <div key={stop.id} className="card">
              <h3>Location: {stop.location_name}</h3>
              <p>City: {stop.city_name}</p>
              <p>Coordinate: x: {stop.coordinate.x}, y: {stop.coordinate.y}</p>
              <button onClick={() => handleEdit(index)} style={{ backgroundColor: "#04AA6D", color: "white", marginLeft: "10px" }}>Edit</button>
              <button onClick={() => handleDelete(index)} style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}>Delete</button>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default BusStopPage;
