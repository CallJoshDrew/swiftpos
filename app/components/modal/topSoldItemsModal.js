"use client";
import React, { useState } from "react";
import Image from "next/image";

function TopSoldItemsModal({
  isTopSoldItemsModalOpen,
  setTopSoldItemsModalOpen,
  allTodayItems,
  allWeekItems,
  allMonthItems,
  selectedDayBtn,
  selectedWeekBtn,
  selectedMonthBtn,
  selectedYearBtn,
}) {
  const [selectedTime, setSelectedTime] = useState("today");

  let showAllItems;
  if (selectedTime === "today") {
    showAllItems = allTodayItems;
  } else if (selectedTime === "weekly") {
    showAllItems = allWeekItems;
  } else if (selectedTime === "monthly") {
    showAllItems = allMonthItems;
  } else if (selectedTime === "yearly") {
    showAllItems = allMonthItems;
  }

  if (!isTopSoldItemsModalOpen) {
    return null;
  }
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 opacity-80 z-20"></div>
      <div className="fixed inset-0 flex items-center justify-center z-30 ">
        <div className="bg-gray-100 rounded-lg shadow-lg w-full h-full mt-10 mx-5 overflow-y-scroll">
          <div className="rounded-lg flex flex-col justify-between items-center">
            <div className="flex w-full justify-between px-4 py-5">
              <div className="flex justify-start space-x-4">
                <button
                  onClick={() => setSelectedTime("today")}
                  className={`py-2 px-4 rounded-md ${
                    selectedTime === "today"
                      ? "bg-green-700 text-white shadow-md "
                      : "bg-white text-black"
                  }`}>
                  {selectedDayBtn}
                </button>
                <button
                  onClick={() => setSelectedTime("weekly")}
                  className={`py-2 px-4 rounded-md ${
                    selectedTime === "weekly"
                      ? "bg-green-700 text-white shadow-md "
                      : "bg-white text-black"
                  }`}>
                  {selectedWeekBtn}
                </button>
                <button
                  onClick={() => setSelectedTime("monthly")}
                  className={`py-2 px-4 rounded-md ${
                    selectedTime === "monthly"
                      ? "bg-green-700 text-white shadow-md "
                      : "bg-white text-black"
                  }`}>
                  {selectedMonthBtn}
                </button>
                <button
                  onClick={() => setSelectedTime("yearly")}
                  className={`py-2 px-4 rounded-md ${
                    selectedTime === "yearly"
                      ? "bg-green-700 text-white shadow-md "
                      : "bg-white text-black"
                  }`}>
                  {selectedYearBtn}
                </button>
              </div>
              <button
                className="text-sm text-white bg-red-700 px-4 py-2 rounded-lg"
                onClick={() => {
                  setTopSoldItemsModalOpen(false);
                }}>
                Close
              </button>
            </div>
          </div>
          <div className="mx-4 rounded-lg overflow-hidden border shadow-sm">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-green-700 text-white text-center">
                  <th className="px-4 py-4 border-b font-light">Top</th>
                  <th className="px-4 py-4 border-b font-light">Items</th>
                  <th className="px-4 py-4 border-b font-light">Quantities</th>
                  <th className="px-4 py-4 border-b font-light">Total Sales (RM)</th>
                </tr>
              </thead>
              <tbody>
                {showAllItems.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white text-gray-600 text-center hover:bg-gray-200 transition-colors duration-200">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 flex justify-center">
                      <div className="flex justify-start w-3/6 space-x-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          as="image"
                          width="100"
                          height="100"
                          className="h-8 w-8 object-cover rounded-md"
                        />
                        <div>{item.name}</div>
                      </div>
                    </td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-end w-3/5">
                        {item.totalPrice.toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(TopSoldItemsModal);
