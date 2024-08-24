import React from "react";
import useUsers from "../hooks/useUsers";

const UserComponent = () => {
  const {
    users,
    newUser,
    editingUser,
    error,
    loading,
    handleCreateUser,
    handleUpdateUser,
    handleSaveUpdate,
    handleDeleteUser,
    handleChange,
    resetForm,
  } = useUsers();

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Users</h1>
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
            <th style={{ padding: "10px", textAlign: "left" }}>Username</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Gender</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Residence</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{user.id}</td>
              <td style={{ padding: "10px" }}>{user.username}</td>
              <td style={{ padding: "10px" }}>{user.email}</td>
              <td style={{ padding: "10px" }}>{user.gender}</td>
              <td style={{ padding: "10px" }}>{user.residence}</td>
              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => handleUpdateUser(user.id)}
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
                  onClick={() => handleDeleteUser(user.id)}
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
        {editingUser ? "Update User" : "Create New User"}
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
          name="username"
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="gender"
          type="text"
          placeholder="Gender"
          value={newUser.gender}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          name="residence"
          type="text"
          placeholder="Residence"
          value={newUser.residence}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        {editingUser ? (
          <div>
            <button
              onClick={handleSaveUpdate}
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
            onClick={handleCreateUser}
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Create User
          </button>
        )}
      </div>
    </div>
  );
};

export default UserComponent;
