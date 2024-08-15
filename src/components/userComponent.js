import React, { useEffect, useState } from 'react';
import UserService from '../services/userServices.js';

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    password_hash: '',
    phone_number: '',
    role: 'user',
    area: '',
    district: '',
    level: '',
    coordinate: '',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (error) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!validateUser(newUser)) {
      setError('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await UserService.createUser(newUser);
      fetchUsers();
      resetForm();
    } catch (error) {
      setError('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  

  const handleUpdateUser = async (id) => {
    setLoading(true);
    try {
      const user = await UserService.getUserById(id);
      setEditingUser(user);
      setNewUser(user);
    } catch (error) {
      setError('Error fetching user details');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUpdate = async () => {
    if (!validateUser(newUser)) {
      setError('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await UserService.updateUser(newUser.id, newUser); // Pass user ID and data
      fetchUsers(); // Refresh the list of users
      setEditingUser(null); // Reset the editing state
      resetForm(); // Clear the form fields
    } catch (error) {
      setError('Error updating user');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      await UserService.deleteUser(id);
      fetchUsers();
    } catch (error) {
      setError('Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const resetForm = () => {
    setNewUser({
      full_name: '',
      email: '',
      password_hash: '',
      phone_number: '',
      role: 'user',
      area: '',
      district: '',
      level: '',
      coordinate: '',
    });
    setEditingUser(null);
  };

  const validateUser = (user) => {
    return user.full_name && user.email && user.password_hash; // Basic validation; customize as needed
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Users</h1>
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Full Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Phone Number</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Area</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>District</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Level</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Coordinate</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{user.id}</td>
              <td style={{ padding: '10px' }}>{user.full_name}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>{user.phone_number}</td>
              <td style={{ padding: '10px' }}>{user.area}</td>
              <td style={{ padding: '10px' }}>{user.district}</td>
              <td style={{ padding: '10px' }}>{user.level}</td>
              <td style={{ padding: '10px' }}>{user.coordinate}</td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => handleUpdateUser(user.id)}
                  style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', marginRight: '5px' }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ textAlign: 'center', color: '#333' }}>{editingUser ? 'Update User' : 'Create New User'}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
        <input
          name="full_name"
          type="text"
          placeholder="Full Name"
          value={newUser.full_name}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          name="password_hash"
          type="password"
          placeholder="Password"
          value={newUser.password_hash}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          name="phone_number"
          type="text"
          placeholder="Phone Number"
          value={newUser.phone_number}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          name="area"
          type="text"
          placeholder="Area"
          value={newUser.area}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          name="district"
          type="text"
          placeholder="District"
          value={newUser.district}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          name="level"
          type="text"
          placeholder="Level"
          value={newUser.level}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          name="coordinate"
          type="text"
          placeholder="Coordinate"
          value={newUser.coordinate}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        {editingUser ? (
          <div>
            <button
              onClick={handleSaveUpdate}
              style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '4px' }}
            >
              Save Update
            </button>
            <button
              onClick={resetForm}
              style={{ backgroundColor: '#FFC107', color: 'black', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '4px', marginLeft: '10px' }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleCreateUser}
            style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '4px' }}
          >
            Create User
          </button>
        )}
      </div>
    </div>
  );
};

export default UserComponent;
