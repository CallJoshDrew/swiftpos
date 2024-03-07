"use client";
import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { todayRegisteredAtom } from "../components/atoms/todayRegisteredAtom";
import { useRouter } from "next/navigation";
import CategoryForm from "../components/categoryForm";
import { salesDataAtom } from "../components/atoms/salesDataAtom";
import { ordersAtom } from "../components/atoms/ordersAtom";

export default function Setting() {
  const [todayRegistered, setTodayRegistered] = useAtom(todayRegisteredAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isCloseRegModalOpen, setIsCloseRegModalOpen] = useState(false);

  const [salesData, setSalesData] = useAtom(salesDataAtom);
  const [orders] = useAtom(ordersAtom);

  const addOrdersToSalesData = () => {
    const today = new Date();
    let year = today.getFullYear().toString(); // Convert the year to a string
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let monthString = monthNames[today.getMonth()]; // Get the month name
    const month = today.getMonth() + 1; // JavaScript months are 0-based
    const date = today.getDate();
    
    // Create a new object for today's orders
    const newOrder = {
      date: `${month}/${date}/${year}`,
      orders: [...orders],
    };
  
    // Add today's orders to the sales data
    setSalesData((prevSalesData) => {
      const updatedSalesData = { ...prevSalesData };
      if (!updatedSalesData[year]) {
        updatedSalesData[year] = {};
      }
      if (!updatedSalesData[year][monthString]) {
        updatedSalesData[year][monthString] = [];
      }
  
      // Find the index of the existing order for today
      const existingOrderIndex = updatedSalesData[year][monthString].findIndex(
        (order) => order.date === newOrder.date
      );
  
      if (existingOrderIndex !== -1) {
        // If the order for today already exists, replace it
        updatedSalesData[year][monthString][existingOrderIndex] = newOrder;
      } else {
        // If the order for today doesn't exist, add it
        updatedSalesData[year][monthString].push(newOrder);
      }
  
      return updatedSalesData;
    });
  };
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" });
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  useEffect(() => {
    if (todayRegistered.openForRegister === false) {
      setLoading(true);
      // toast.success("Please Register First", {
      //   duration: 1000,
      //   position: "top-center",
      //   reverseOrder: false,
      // });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [todayRegistered, router]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-w-full min-h-screen flex items-center justify-center z-10">
        <div className="loader ease-linear rounded-full border-4 h-12 w-12 mb-4"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 w-5/6 flex-auto flex flex-col gap-2 py-10 px-4">
      {/* <CategoryForm /> */}
      <button
        className="bg-red-800 rounded-lg px-4 py-2 flex items-center w-[180px] space-x-2 my-1"
        onClick={() => setIsCloseRegModalOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
          />
        </svg>
        <div className="text-white text-sm">Close Registration</div>
      </button>
      {isCloseRegModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              ​
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Please double confirm
                    </h3>
                    <div className="text-sm mt-2 w-full text-gray-800">
                      All data will be saved and you won&apos;t be able to record, edit, or delete
                      any orders after confirm. Are you sure you want to close registration for
                      today?
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setTimeout(() => {
                      setIsCloseRegModalOpen(false);
                    }, 1500);
                    addOrdersToSalesData();
                    toast.success("Registration is closed!", {
                      duration: 1000,
                      position: "top-center",
                      reverseOrder: false,
                    });
                    console.log(salesData);
                    setTodayRegistered(prevState => ({
                      ...prevState,
                      ClosedTimeAndDate: formatDateTime(new Date(now)),
                      openForRegister: false,
                    }));
                  }}>
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsCloseRegModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
