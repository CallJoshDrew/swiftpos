"use client";
import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { ordersAtom } from "../atoms/ordersAtom";
import { isLinkDisabledAtom } from "../atoms/linkDisableAtom";
import { selectedTableOrderAtom } from "../atoms/selectedTableOrderAtom";
import { selectedTakeAwayOrderAtom } from "../atoms/selectedTakeAwayOrderAtom";
import { salesDataAtom } from "../atoms/salesDataAtom";

function PaymentModal({
  isPayModalOpen,
  setPayModalOpen,
  // setShowEditBtn,
  orderType,
}) {
  const [orders, setOrders] = useAtom(ordersAtom);
  const [, setIsLinkDisabled] = useAtom(isLinkDisabledAtom);
  const [, setSalesData] = useAtom(salesDataAtom);

  function useSelectedOrder(orderType) {
    const [selectedTableOrder, setSelectedTableOrder] = useAtom(selectedTableOrderAtom);
    const [selectedTakeAwayOrder, setSelectedTakeAwayOrder] = useAtom(selectedTakeAwayOrderAtom);

    const selectedOrder = orderType === "Dine-In" ? selectedTableOrder : selectedTakeAwayOrder;
    const setSelectedOrder =
      orderType === "Dine-In" ? setSelectedTableOrder : setSelectedTakeAwayOrder;

    return [selectedOrder, setSelectedOrder];
  }
  const [selectedOrder, setSelectedOrder] = useSelectedOrder(orderType);

  const [isDoubleConfirmModalOpen, setIsDoubleConfirmModalOpen] = useState(false);

  // Initialize state variables for payment method, amount received, amount change, and input value
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountReceived, setAmountReceived] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [paymentHandled, setPaymentHandled] = useState(false);

  // Use an effect hook to update the amount received and input value when the selected order changes
  useEffect(() => {
    if (selectedOrder && typeof selectedOrder.totalPrice === "number") {
      setAmountReceived(Number(selectedOrder.totalPrice.toFixed(2)));
      setInputValue(Number(selectedOrder.totalPrice.toFixed(2)));
    }
  }, [selectedOrder]);
  const getFormattedDateAndTime = () => {
    const now = new Date();
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kuala_Lumpur",
    };
    const dateOptions = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: "Asia/Kuala_Lumpur",
    };
    const timeString = now.toLocaleTimeString("en-US", timeOptions);
    const dateString = now.toLocaleDateString("en-US", dateOptions);

    return { timeString, dateString };
  };

  const handlePaymentStatus = (newAmountReceived, newAmountChange) => {
    const { timeString, dateString } = getFormattedDateAndTime();
    let statusType;
    if (selectedOrder?.orderType === "Dine-In") {
      statusType = "Paid";
    } else if (selectedOrder?.orderType === "TakeAway") {
      statusType = "Completed";
    }
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.orderNumber === selectedOrder.orderNumber) {
          return {
            ...order,
            status: statusType,
            paymentMethod,
            amountReceived: newAmountReceived,
            amountChange: newAmountChange,
            paymentTime: `${timeString}, ${dateString}`,
            showEditBtn: false,
          };
        } else {
          return order;
        }
      });
    });

    setSelectedOrder((prevSelectedOrder) => {
      const newOrder = {
        ...prevSelectedOrder,
        status: statusType,
        paymentMethod,
        amountReceived: newAmountReceived,
        amountChange: newAmountChange,
        paymentTime: `${timeString}, ${dateString}`,
        showEditBtn: false,
      };
      console.log(newOrder); // Log the new order
      return newOrder;
    });
    setIsLinkDisabled(false);
    setPayModalOpen(false);
    // setShowEditBtn(false);
    console.log("set to false from payment");
    // Reset the payment method back to "Cash"
    setPaymentMethod("Cash");
    setPaymentHandled(true);
    toast.success("Payment was successful!", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };

  const addOrdersToSalesData = useCallback(() => {
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
  }, [orders]); // Include orders in the dependency array
  useEffect(() => {
    if (paymentHandled) {
      addOrdersToSalesData();
      // Reset paymentHandled back to false
      setPaymentHandled(false);
    }
  }, [paymentHandled, addOrdersToSalesData]); // Run this effect when paymentHandled changes
  // Define a function to close the payment modal
  const handleModalClose = () => {
    setPayModalOpen(false);
  };

  // If the payment modal is not open, don't render anything
  if (!isPayModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[340px]">
          <div className="text-lg font-medium text-green-800">{selectedOrder?.orderNumber}</div>
          <div className="border-green-800 bg-green-800 border-2 rounded-md p-4 pb-6">
            <div className="text-lg font-medium text-white mb-2">Total</div>
            <div className="text-5xl font-bold text-white leading-6">
              RM {selectedOrder?.totalPrice.toFixed(2)}
            </div>
          </div>
          <div className="text-xl text-gray-800 leading-5 mt-6">Select payment method</div>
          <div className="flex w-full space-x-2 my-2 justify-center items-center">
            <button
              className={`flex-1 text-white font-bold py-3 px-4 rounded-md ${
                paymentMethod === "Cash" ? "bg-green-800" : "bg-gray-500"
              }`}
              onClick={() => setPaymentMethod("Cash")}>
              Cash
            </button>
            <button
              className={`flex-1 text-white font-bold py-3 px-4 rounded-md ${
                paymentMethod === "Boost" ? "bg-green-800" : "bg-gray-500"
              }`}
              onClick={() => setPaymentMethod("Boost")}>
              Boost
            </button>
          </div>
          <div className="text-lg text-gray-800 leading-5 mt-6">Amount Received</div>
          <input
            type="number"
            placeholder={amountReceived.toFixed(2)}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full text-gray-600 font-bold text-2xl py-2 px-3 mt-2 border-2 border-gray-300 rounded-md"
          />
          <div className="text-lg text-gray-800 leading-5 mt-6">Change</div>
          <div className="text-3xl py-2 text-yellow-500 font-semibold leading-6">
            {(inputValue - selectedOrder?.totalPrice).toFixed(2)}
          </div>
          <div className="text-xl text-gray-800 leading-5 mt-6">Make payment now?</div>
          <div className="flex w-full space-x-2 my-2 justify-center items-center">
            <button
              className="flex-1 bg-green-800 text-sm text-white font-bold py-3 px-4 rounded-md"
              onClick={() => {
                setIsDoubleConfirmModalOpen(true);
              }}>
              Yes
            </button>
            <button
              className="flex-1 bg-gray-500 text-sm text-white font-bold py-3 px-4 rounded-md"
              onClick={() => {
                handleModalClose();
                setPaymentMethod("Cash");
              }}>
              No
            </button>
          </div>
        </div>
        {isDoubleConfirmModalOpen && (
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
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Please double confirm
                      </h3>
                      <div className="text-sm mt-2 w-full text-gray-800">
                        This action cannot be undone. The order will be completed and added into the report. Are you sure?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      const newAmountReceived = Number(Number(inputValue).toFixed(2));
                      const newAmountChange = Number(
                        (Number(inputValue) - Number(selectedOrder?.totalPrice)).toFixed(2)
                      );
                      handlePaymentStatus(newAmountReceived, newAmountChange);
                      setAmountReceived(newAmountReceived);
                    }}>
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setIsDoubleConfirmModalOpen(false);
                      setAmountReceived(amountReceived);
                      setInputValue(amountReceived);
                    }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default React.memo(PaymentModal);
