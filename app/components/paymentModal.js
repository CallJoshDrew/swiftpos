"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function PaymentModal({
  isPayModalOpen,
  setPayModalOpen,
  selectedOrder,
  orders,
  setOrders,
  setSelectedOrder,
  tables = [], // default value for tables
  setTables = () => {}, // default value for setTables
}) {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountReceived, setAmountReceived] = useState(0);
  const [amountChange, setAmountChange] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    if (selectedOrder && typeof selectedOrder.totalPrice === "number") {
      setAmountReceived(Number(selectedOrder.totalPrice.toFixed(2)));
      setInputValue(Number(selectedOrder.totalPrice.toFixed(2)));
    }
    // console.log(selectedOrder);
  }, [selectedOrder]);

  const handlePaymentStatus = (newAmountReceived, newAmountChange) => {
    setPayModalOpen(false);
    const updatedOrders = orders.map((order) => {
      if (order.orderNumber === selectedOrder?.orderNumber) {
        return {
          ...order,
          payment: "Paid",
          status: "Completed",
          paymentMethod,
          amountReceived: newAmountReceived,
          amountChange: newAmountChange,
        };
      } else {
        return order;
      }
    });

    setOrders(updatedOrders);

    // Update tables array only if tables and setTables are defined
    if (Array.isArray(tables) && tables && setTables) {
      const updatedTables = tables.map((table) => {
        if (table.order.orderNumber === selectedOrder?.orderNumber) {
          return {
            ...table,
            order: {
              ...table.order, // keep existing properties
              payment: "Paid",
              status: "Completed",
              paymentMethod,
              amountReceived: newAmountReceived,
              amountChange: newAmountChange,
            },
          };
        } else {
          return table;
        }
      });

      setTables(updatedTables);
    }

    setSelectedOrder((prevSelectedOrder) => {
      if (prevSelectedOrder.orderNumber === selectedOrder?.orderNumber) {
        return {
          ...prevSelectedOrder,
          payment: "Paid",
          status: "Completed",
          paymentMethod,
          amountReceived: newAmountReceived,
          amountChange: newAmountChange,
        };
      } else {
        return prevSelectedOrder;
      }
    });

    // Reset paymentMethod back to "Cash"
    setPaymentMethod("Cash");

    toast.success("Payment Done", {
      duration: 2000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  const handleModalClose = () => {
    setPayModalOpen(false);
  };

  if (!isPayModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[340px]">
          <div className="text-lg font-medium text-green-800">
            {tables === "TAPAO"
              ? `Order ID ${selectedOrder?.orderNumber}`
              : `Table ${selectedOrder?.tableNumber}`}
          </div>
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
                paymentMethod === "Cash" ? "bg-yellow-500" : "bg-gray-500"
              }`}
              onClick={() => setPaymentMethod("Cash")}>
              Cash
            </button>
            <button
              className={`flex-1 text-white font-bold py-3 px-4 rounded-md ${
                paymentMethod === "Boost" ? "bg-red-500" : "bg-gray-500"
              }`}
              onClick={() => setPaymentMethod("Boost")}>
              Boost
            </button>
          </div>
          <div className="text-xl text-gray-800 leading-5 mt-6">Amount Received</div>
          <input
            type="number"
            placeholder={amountReceived}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full text-gray-500 p-2 mt-2 border-2 border-gray-300 rounded-md"
          />
          <div className="text-xl text-gray-800 leading-5 mt-6">Change</div>
          <div className="text-xl px-2 py-3 mt-2 bg-yellow-500 text-white rounded-md font-semibold leading-6">
            RM {(inputValue - selectedOrder?.totalPrice).toFixed(2)}
          </div>
          <div className="text-xl text-gray-800 leading-5 mt-6">Make payment now?</div>
          <div className="flex w-full space-x-2 my-2 justify-center items-center">
            <button
              className="flex-1 bg-green-800 text-sm text-white font-bold py-3 px-4 rounded-md"
              onClick={() => {
                const newAmountReceived = Number(Number(inputValue).toFixed(2));
                const newAmountChange = Number((Number(inputValue) - Number(selectedOrder?.totalPrice)).toFixed(2));
                handlePaymentStatus(newAmountReceived, newAmountChange);
                setAmountReceived(newAmountReceived);
                setAmountChange(newAmountChange);
              }}>
              Yes
            </button>
            <button
              className="flex-1 bg-gray-700 text-sm text-white font-bold py-3 px-4 rounded-md"
              onClick={() => {
                handleModalClose();
                setAmountReceived(amountReceived);
                setInputValue(amountReceived);
                setAmountChange(0);
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
