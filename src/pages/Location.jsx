// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { fetchStops } from "../services/locationService";
import AddLocation from "../components/AddLocation";
import SearchBar from "../components/SearchBar";

import { FaSortUp, FaSortDown } from "react-icons/fa";
import ModalLocation from "../components/ModalLocation";

const Location = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const getStops = async () => {
      try {
        const stopsData = await fetchStops();
        setData(stopsData);
      } catch (error) {
        console.error("Failed to fetch stops:", error);
      }
    };

    getStops();
  }, []);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => ({
      key,
      direction:
        prevSortConfig.direction === "asc" && prevSortConfig.key === key
          ? "desc"
          : "asc",
    }));
  };

  const openModal = () => {
    console.log("Modal is opening...");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Location</h1>
        <div className="flex items-center space-x-3">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </div>
        <AddLocation onClick={openModal} />
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th
              className="py-3 px-4 border-b cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ID
              {sortConfig.key === "id" && (
                <span className="inline-block ml-2">
                  {sortConfig.direction === "asc" ? (
                    <FaSortUp className="text-white" />
                  ) : (
                    <FaSortDown className="text-white" />
                  )}
                </span>
              )}
            </th>
            <th
              className="py-3 px-4 border-b cursor-pointer"
              onClick={() => handleSort("location_name")}
            >
              Location Name
              {sortConfig.key === "location_name" && (
                <span className="inline-block ml-2">
                  {sortConfig.direction === "asc" ? (
                    <FaSortUp className="text-white" />
                  ) : (
                    <FaSortDown className="text-white" />
                  )}
                </span>
              )}
            </th>
            <th className="py-3 px-4 border-b">Coordinate</th>
            <th
              className="py-3 px-4 border-b cursor-pointer"
              onClick={() => handleSort("city_name")}
            >
              City Name
              {sortConfig.key === "city_name" && (
                <span className="inline-block ml-2">
                  {sortConfig.direction === "asc" ? (
                    <FaSortUp className="text-white" />
                  ) : (
                    <FaSortDown className="text-white" />
                  )}
                </span>
              )}
            </th>
            <th className="py-3 px-4 border-b">Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((stop) => (
            <tr key={stop.id} className="hover:bg-gray-100">
              <td className="py-3 px-6 border-b">{stop.id}</td>
              <td className="py-3 px-4 border-b">{stop.location_name}</td>
              <td className="py-3 px-4 border-b">{stop.coordinate}</td>
              <td className="py-3 px-4 border-b">{stop.city_name}</td>
              <td className="py-3 px-4 border-b flex gap-2">
                <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalLocation show={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">Add New Location</h2>
        {/* Modal form content */}
      </ModalLocation>
    </div>
  );
};

export default Location;
