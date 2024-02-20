"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { todayRegisteredAtom } from "./components/atoms/todayRegisteredAtom";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [todayRegistered, setTodayRegistered] = useAtom(todayRegisteredAtom);
  console.log(todayRegistered);
  const [showModal, setShowModal] = useState(false);

  // Helper function to format date and time
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Use the helper function when setting the initial state
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" });
  const [formData, setFormData] = useState({
    availableCash: "",
    boostCash: "",
    timeAndDate: formatDateTime(new Date(now)),
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    // Format the date and time before saving
    setTodayRegistered({
      ...formData,
      timeAndDate: formatDateTime(new Date(formData.timeAndDate)),
    });
    setShowModal(false);
    setFormSubmitted(true);
    setTimeout(() => {
      toast.success("Registration is successful!", {
        duration: 2000,
        position: "top-center",
        reverseOrder: false,
      });

      // Navigate to '/tables' after 2 seconds
      setTimeout(() => {
        router.push("/tables");
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    if (Object.keys(todayRegistered).length !== 0 && !formSubmitted) {
      router.push("/tables");
      toast.success("You already register today!", {
        duration: 1000,
        position: "top-center",
        reverseOrder: false,
      });
    }
    setLoading(false);
    console.log(todayRegistered);
  }, [todayRegistered, router, formSubmitted]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      </Head>
      <div className="relative w-full">
        <div className="bg-gray-100 w-[1024px] min-h-screen absolute -left-[147px] top-0 ">
          <div className="min-h-screen flex flex-col items-center justify-center px-10">
            <h1 className="text-4xl mb-8 text-green-800 font-bold">Welcome to our POS system</h1>
            <form
              onSubmit={handleSubmit}
              className="bg-white w-[480px] shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="availableCash">
                  Today Available Cash
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="availableCash"
                  type="number"
                  name="availableCash"
                  value={formData.availableCash}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="boostCash">
                  Today Boost Cash
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="boostCash"
                  type="number"
                  name="boostCash"
                  value={formData.boostCash}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="timeAndDate">
                  Time and Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="timeAndDate"
                  type="datetime-local"
                  name="timeAndDate"
                  value={formData.timeAndDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">
                  Register
                </button>
              </div>
            </form>
            <div className="block text-gray-500 text-md mb-2" htmlFor="availableCash">
              This is a demo unit for your perusal  
            </div>
            {showModal && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true">
                    ​
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-lg leading-6 font-medium text-gray-900"
                            id="modal-title">
                            Please confirm and make sure the info provided is accurate before
                            proceed.
                          </h3>
                          <div className="mt-2">
                            <p className="text-xl text-gray-500">Are you sure?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-800 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleConfirm}>
                        Yes
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setShowModal(false)}>
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
