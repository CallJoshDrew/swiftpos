import React from "react";
import toast from "react-hot-toast";

export default function StatusModal({
  isStatusModalOpen,
  handleStsModalClose,
  setModalOpen,
  selectedOrder,
}) {

  const handleStatusSubmitBtn = () => {
    // console.log("clicked");
    handleStsModalClose(selectedOrder.orderNumber);
    toast.success("Order is Cancelled'", {
      duration: 1000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  if (!isStatusModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[340px] text-center">
          <div className="text-xl bg-red-700 rounded-md text-white p-4">
            Order ID: {selectedOrder.orderNumber}
          </div>
          <div className="text-lg text-gray-800 my-3">Do you want to cancel this order?</div>

          <div>
            <button
              className="mr-4 bg-green-800 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={handleStatusSubmitBtn}>
              Yes
            </button>
            <button
              className="bg-gray-700 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setModalOpen(false) ;
              }}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
