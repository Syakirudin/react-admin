import React, { useState, useEffect } from "react";
import "../style/BusStopForm.css";

const BusStopForm = ({ onSubmit, initialData = {}, isEditMode }) => {
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

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData(initialData); // Set form data for editing
    }
  }, [initialData, isEditMode]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStops = formData.stops.map((stop, i) =>
      i === index ? { ...stop, [name]: value } : stop
    );
    setFormData({
      ...formData,
      stops: updatedStops,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      stopData: formData.stops,
      routeData: { no_route: formData.no_route },
    };

    console.log("Submitting data:", requestData); // Log the data before sending

    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? `${process.env.REACT_APP_API_URL}/stops/${initialData.id}`
      : `${process.env.REACT_APP_API_URL}/stops`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        onSubmit(data); // Notify parent component
      })
      .catch((error) => {
        console.error("Error:", error);
        // Optionally, update UI with error message
      });
  };

  const addNewRow = () => {
    setFormData({
      ...formData,
      stops: [
        ...formData.stops,
        { location_name: "", city_name: "", coordinate: "" },
      ],
    });
  };

  const toggleEdit = (index) => {
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const deleteRow = (index) => {
    const updatedStops = formData.stops.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      stops: updatedStops,
    });
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  return (
    <form className="bus-stop-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? "Edit Bus Stop" : "Bus Stop Form"}</h2>
      <div className="form-group">
        <label htmlFor="no_route">Route No:</label>
        <input
          type="text"
          id="no_route"
          name="no_route"
          value={formData.no_route}
          onChange={(e) =>
            setFormData({ ...formData, no_route: e.target.value })
          }
          required
        />
      </div>

      <table className="bus-stop-table">
        <thead>
          <tr>
            <th>Location Name</th>
            <th>City Name</th>
            <th>Coordinate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.stops.map((stop, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="location_name"
                      value={stop.location_name || ""}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="city_name"
                      value={stop.city_name || ""}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="coordinate"
                      value={stop.coordinate || ""}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{stop.location_name || "N/A"}</td>
                  <td>{stop.city_name || "N/A"}</td>
                  <td>{stop.coordinate || "N/A"}</td>
                </>
              )}
              <td>
                {editingIndex === index ? (
                  <div className="button-group">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => deleteRow(index)}>
                      Delete
                    </button>
                    <button type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="button-group">
                    <button type="button" onClick={() => toggleEdit(index)}>
                      Edit
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={addNewRow}>
        Add New Stop
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BusStopForm;
