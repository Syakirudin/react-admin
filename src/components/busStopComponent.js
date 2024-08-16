import React from "react";
import useBusStops from "../hooks/useBusStops.js";

const StopsComponent = () => {
  const {
    stops,
    newStop,
    editingStop,
    error,
    loading,
    handleCreateStop,
    handleUpdateStop,
    handleSaveUpdate,
    handleDeleteStop,
    handleChange,
    resetForm,
    validateStop, // Ensure this is included
  } = useBusStops();

  // Handle creating a new stop
  const handleCreate = () => {
    if (validateStop(newStop)) {
      handleCreateStop();
    } else {
      alert("Please fill all required fields.");
    }
  };

  // Handle saving updates to an existing stop
  const handleSave = () => {
    if (validateStop(newStop)) {
      handleSaveUpdate();
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Stops</h1>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f4f4f4",
              borderBottom: "2px solid #ddd",
            }}
          >
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Route ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>City Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Stop Order</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Coordinate</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Stop Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Stop Type</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stops.map((stop) => (
            <tr key={stop.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{stop.id}</td>
              <td style={{ padding: "10px" }}>{stop.route_id}</td>
              <td style={{ padding: "10px" }}>{stop.city_name}</td>
              <td style={{ padding: "10px" }}>{stop.stop_order}</td>
              <td style={{ padding: "10px" }}>{stop.coordinate}</td>
              <td style={{ padding: "10px" }}>{stop.stop_name}</td>
              <td style={{ padding: "10px" }}>{stop.stop_type}</td>
              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => handleUpdateStop(stop.id)}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteStop(stop.id)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ textAlign: "center", color: "#333" }}>
        {editingStop ? "Update Stop" : "Create New Stop"}
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <input
          name="route_id"
          type="text"
          placeholder="Route ID"
          value={newStop.route_id}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="city_name"
          type="text"
          placeholder="City Name"
          value={newStop.city_name}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="stop_order"
          type="text"
          placeholder="Stop Order"
          value={newStop.stop_order}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="coordinate"
          type="text"
          placeholder="Coordinate"
          value={newStop.coordinate}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="stop_name"
          type="text"
          placeholder="Stop Name"
          value={newStop.stop_name}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="stop_type"
          type="text"
          placeholder="Stop Type"
          value={newStop.stop_type}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        {editingStop ? (
          <div>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Save Update
            </button>
            <button
              onClick={resetForm}
              style={{
                backgroundColor: "#FFC107",
                color: "black",
                border: "none",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "4px",
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleCreate}
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Create Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default StopsComponent;
