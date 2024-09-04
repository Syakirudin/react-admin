import React, { useState, useEffect } from "react";
import BusStopForm from "../components/bus-stop-component/BusStopForms.jsx";
import "./style/BusStopPage.css";

const BusStopPage = () => {
  const [stops, setStops] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    no_route: "",
    stops: [
      {
        location_name: "",
        city_name: "",
        coordinate: "",
      },
    ],
  });
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStops = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stops`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFetchedData(data);
    } catch (error) {
      console.error("Error fetching stops:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStops();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Group data by route_id
  const groupedByRoute = fetchedData.reduce((acc, stop) => {
    if (!acc[stop.route_id]) {
      acc[stop.route_id] = [];
    }
    acc[stop.route_id].push(stop);
    return acc;
  }, {});

  

  const handleSubmit = async (data) => {
    if (editIndex !== null) {
      // Editing existing stop
      const stopId = stops[editIndex].id;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/stops/${stopId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
      no_route: "",
      stops: [
        {
          location_name: "",
          city_name: "",
          coordinate: "",
        },
      ],
    });
    setEditIndex(null);
    setFormVisible(true);
  };

  const handleCancel = () => {
    setFormVisible(false);
    setFormData({
      no_route: "",
      stops: [
        {
          location_name: "",
          city_name: "",
          coordinate: "",
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
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/stops/${stopId}`,
          {
            method: "DELETE",
          }
        );
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
      <div className="table-container">
        {Object.entries(groupedByRoute).length > 0 ? (
          Object.entries(groupedByRoute).map(([routeId, stops]) => (
            <div key={routeId} className="route-table">
              <h2>Route No: {routeId}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Stop Order</th>
                    <th>Location</th>
                    <th>City</th>
                    <th>Coordinate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stops.map((stop, index) => (
                    <tr key={stop.id}>
                      <td>{index + 1}</td>
                      <td>{stop.location_name}</td>
                      <td>{stop.city_name}</td>
                      <td>
                        x: {stop.coordinate.x}, y: {stop.coordinate.y}
                      </td>
                      <td>
                        <button
                          onClick={() => handleEdit(stop.id)}
                          style={{
                            backgroundColor: "#04AA6D",
                            color: "white",
                            marginLeft: "10px",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(stop.id)}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            marginLeft: "10px",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
