import { useState, useEffect } from "react";
import StopService from "../services/stopServices.js";

const useBusStops = () => {
  const [stops, setStops] = useState([]);
  const [newStop, setNewStop] = useState({
    route_id: "",
    city_name: "",
    stop_order: "",
    coordinate: "",
    stop_name: "",
    stop_type: "",
  });
  const [editingStop, setEditingStop] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStops();
  }, []);

  const fetchStops = async () => {
    setLoading(true);
    try {
      const data = await StopService.getAllBusStops();
      setStops(data);
    } catch (error) {
      setError("Error fetching stops");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStop = async () => {
    if (!validateStop(newStop)) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await StopService.createBusStop(newStop);
      fetchStops();
      resetForm();
    } catch (error) {
      setError("Error creating stop");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStop = async (id) => {
    setLoading(true);
    try {
      const stop = await StopService.getBusStopById(id);
      setEditingStop(stop);
      setNewStop(stop);
    } catch (error) {
      setError("Error fetching stop details");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUpdate = async () => {
    if (!validateStop(newStop)) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await StopService.updateBusStop(newStop.id, newStop);
      fetchStops();
      setEditingStop(null);
      resetForm();
    } catch (error) {
      setError("Error updating stop");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStop = async (id) => {
    setLoading(true);
    try {
      await StopService.deleteBusStop(id);
      fetchStops();
    } catch (error) {
      setError("Error deleting stop");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStop((prevStop) => ({ ...prevStop, [name]: value }));
  };

  const resetForm = () => {
    setNewStop({
      route_id: "",
      city_name: "",
      stop_order: "",
      coordinate: "",
      stop_name: "",
      stop_type: "",
    });
    setEditingStop(null);
  };

  const validateStop = (stop) => {
    return (
      stop.route_id &&
      stop.city_name &&
      stop.stop_order &&
      stop.stop_name &&
      stop.stop_type
    );
  };

  return {
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
    validateStop,
  };
};

export default useBusStops;
