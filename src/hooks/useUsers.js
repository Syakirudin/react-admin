import { useState, useEffect } from "react";
import UserService from "../services/userServices";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    residence: "",
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
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!validateUser(newUser)) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await UserService.createUser(newUser);
      fetchUsers(); // Refresh the user list
      resetForm(); // Clear form fields
    } catch (error) {
      setError("Error creating user: " + error.message);
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
      setError("Error fetching user details");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUpdate = async () => {
    if (!validateUser(newUser)) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await UserService.updateUser(newUser.id, newUser);
      fetchUsers();
      setEditingUser(null);
      resetForm();
    } catch (error) {
      setError("Error updating user");
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
      setError("Error deleting user");
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
      username: "",
      email: "",
      password: "",
      gender: "",
      residence: "",
    });
    setEditingUser(null);
  };

  const validateUser = (user) => {
    return user.username && user.email && user.password; // Basic validation
  };

  return {
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
  };
};

export default useUsers;
