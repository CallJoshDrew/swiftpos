// components/Modal.js
import React, { useState, useEffect } from 'react';

export default function Modal({ isOpen, onClose, orderId, selectedStatus, setSelectedStatus }) {
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = () => {
    onClose(orderId, selectedStatus);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <div className="flex bg-gray-700 rounded-md text-white p-4">
          <div className="text-xl">Order ID: {orderId}</div>
          {/* <div className="text-xl mb-4">{selectedStatus}</div> */}
          </div>
          <div className="flex justify-center space-x-4 my-3">
            <label className="text-lg">
              <input 
                type="radio" 
                value="Completed" 
                checked={selectedStatus === 'Completed'} 
                onChange={handleStatusChange}
              />
              Completed
            </label>
            <label className="text-lg">
              <input 
                type="radio" 
                value="Cancel" 
                checked={selectedStatus === 'Cancel'} 
                onChange={handleStatusChange}
              />
              Cancel Order
            </label>
          </div>
          <div>
            <button 
              className="mr-4 bg-green-800 text-sm text-white font-bold py-2 px-4 rounded" 
              onClick={handleSubmit}
            >
              Change
            </button>
            <button 
              className="bg-red-700 text-sm text-white font-bold py-2 px-4 rounded" 
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
