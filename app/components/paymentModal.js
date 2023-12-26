"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function PaymentModal({
  isPayModalOpen,
  setPayModalOpen,
  selectedOrder,
  orders,
  setOrders,
  setSelectedOrder,
  tables,
  setTables,
}) {
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handlePaymentStatus = () => {
    setPayModalOpen(false);

    // Update the orders array
    const updatedOrders = orders.map((order) => {
      if (order.orderNumber === selectedOrder?.orderNumber) {
        return {
          ...order,
          payment: "Paid",
          status: "Completed",
          paymentMethod,
        };
      } else {
        return order;
      }
    });

    setOrders(updatedOrders);
    // update tables array
    const updatedTables = tables.map((table) => {
      if (table.order.orderNumber === selectedOrder?.orderNumber) {
        return {
          ...table,
          order: {
            ...table.order, // keep existing properties
            payment: "Paid",
            status: "Completed",
            paymentMethod,
          },
        };
      } else {
        return table;
      }
    });

    setTables(updatedTables);
    setSelectedOrder((prevSelectedOrder) => {
      if (prevSelectedOrder.orderNumber === selectedOrder?.orderNumber) {
        return {
          ...prevSelectedOrder,
          payment: "Paid",
          status: "Completed",
          paymentMethod,
        };
      } else {
        return prevSelectedOrder;
      }
    });
    console.log(selectedOrder);

    // Reset paymentMethod back to "Cash"
    setPaymentMethod("Cash");
    toast.success("Payment Done'", {
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
            {/* <div className="text-center bg-green-800 rounded-md text-white py-6 px-4"> */}
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
          <div className="text-xl text-gray-800 leading-5 mt-6">Make payment now?</div>
          <div className="flex w-full space-x-2 my-2 justify-center items-center">
            <button
              className="flex-1 bg-green-800 text-sm text-white font-bold py-3 px-4 rounded-md"
              onClick={handlePaymentStatus}>
              Yes
            </button>
            {/* <div className="text-center text-white">OR</div> */}
            <button
              className="flex-1 bg-gray-700 text-sm text-white font-bold py-3 px-4 rounded-md"
              onClick={handleModalClose}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(PaymentModal);
