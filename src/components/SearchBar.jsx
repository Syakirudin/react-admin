// src/components/SearchBar.jsx
import React from "react";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search locations..."
      value={searchQuery}
      onChange={onSearchChange}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-96"
    />
  );
};

export default SearchBar;
