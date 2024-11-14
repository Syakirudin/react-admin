// src/components/ModalLocation.jsx
import React from 'react';

const ModalLocation = ({ show, onClose, children }) => {
  if (!show) return null; // Don't render the modal if show is false

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalLocation;
