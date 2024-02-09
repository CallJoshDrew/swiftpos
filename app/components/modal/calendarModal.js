// pages/Calendar.js
import React, { useState } from "react";
import toast from "react-hot-toast";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default CSS

export default function CalendarModal({
  isCalendarModalOpen,
  setCalendarModalOpen,
  selectedDate,
  setSelectedDate,
}) {
  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    setCalendarModalOpen(false);
    toast.success(`You have selected ${selectedDate.toDateString()}`, {
      duration: 2000,
      position: "top-center",
      reverseOrder: false,
    });
  };

  const handleCloseBtn = () => {
    setCalendarModalOpen(false);
  };

  if (!isCalendarModalOpen) {
    return null;
  }
  return (
    <>
      <div className="fixed inset-0 -top-10 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white pt-3 pb-4 px-4 rounded shadow-lg w-[340px]">
          <div className="flex items-end justify-between mb-3">
            <div className="text-black">Please Select Date</div>
            <button
              className="text-xs py-2 px-4 bg-red-700 text-white rounded-md"
              onClick={() => handleCloseBtn()}>
              Close
            </button>
          </div>
          <div className="calendar-container text-black">
            <Calendar
              onChange={handleSelectedDate}
              value={selectedDate}
              className="p-6 rounded-md text-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}
