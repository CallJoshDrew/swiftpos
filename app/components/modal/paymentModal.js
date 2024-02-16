"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { ordersAtom } from "../atoms/ordersAtom";
import { isLinkDisabledAtom } from "../atoms/linkDisableAtom";
import { selectedTableOrderAtom } from "../atoms/selectedTableOrderAtom";
import { selectedTakeAwayOrderAtom } from "../atoms/selectedTakeAwayOrderAtom";

function PaymentModal({
  isPayModalOpen,
  setPayModalOpen,
  setShowEditBtn,
  orderType,
}) {
  const [, setOrders] = useAtom(ordersAtom);
  const [, setIsLinkDisabled] =useAtom(isLinkDisabledAtom);
  function useSelectedOrder(orderType) {
    const [selectedTableOrder, setSelectedTableOrder] = useAtom(selectedTableOrderAtom);
    const [selectedTakeAwayOrder, setSelectedTakeAwayOrder] = useAtom(selectedTakeAwayOrderAtom);
  
    const selectedOrder = orderType === "Dine-In" ? selectedTableOrder : selectedTakeAwayOrder;
    const setSelectedOrder =
      orderType === "Dine-In" ? setSelectedTableOrder : setSelectedTakeAwayOrder;
  
    return [selectedOrder, setSelectedOrder];
  }
  const [selectedOrder, setSelectedOrder] = useSelectedOrder(orderType);

  // Initialize state variables for payment method, amount received, amount change, and input value
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountReceived, setAmountReceived] = useState(0);
  const [inputValue, setInputValue] = useState(0);

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
      };
      console.log(newOrder); // Log the new order
      return newOrder;
    });
    setIsLinkDisabled(false);
    setPayModalOpen(false);
    setShowEditBtn(false);
    console.log("set to false from payment");
    // Reset the payment method back to "Cash"
    setPaymentMethod("Cash");
    toast.success("Payment was successful!", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };

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
                const newAmountReceived = Number(Number(inputValue).toFixed(2));
                const newAmountChange = Number(
                  (Number(inputValue) - Number(selectedOrder?.totalPrice)).toFixed(2)
                );
                handlePaymentStatus(newAmountReceived, newAmountChange);
                setAmountReceived(newAmountReceived);
              }}>
              Yes
            </button>
            <button
              className="flex-1 bg-gray-500 text-sm text-white font-bold py-3 px-4 rounded-md"
              onClick={() => {
                handleModalClose();
                setAmountReceived(amountReceived);
                setInputValue(amountReceived);
              }}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(PaymentModal);
