import React, { useEffect } from "react";
import toast from "react-hot-toast";

function PaymentModal({
  isOpen,
  setModalOpen,
  selectedOrder,
  setPaymentStatus,
  orders,
  setOrders,
}) {
  const handlePaymentStatus = () => {
    setModalOpen(false);
    setOrders(
      orders.map((order) =>
        order.orderNumber === selectedOrder?.orderNumber
          ? { ...order, payment: "Paid", status: "Completed" }
          : order
      )
    );
    setPaymentStatus("Paid");
    toast.success("Payment Done'", {
      duration: 2000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[300px]">
          <div className="text-2xl text-center font-bold text-green-800 mb-1">
            Table {selectedOrder?.tableNumber}
          </div>
          <div className="text-center bg-green-800 rounded-md text-white py-6 px-4">
            <div className="text-2xl">
              Total : RM {selectedOrder?.totalPrice}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl text-gray-800 text-center leading-5 my-4">
              Make payment now?
            </div>
            <button
              className="mr-4 bg-green-800 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={handlePaymentStatus}>
              Yes
            </button>
            <button
              className="bg-gray-700 text-sm text-white font-bold py-2 px-4 rounded"
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
