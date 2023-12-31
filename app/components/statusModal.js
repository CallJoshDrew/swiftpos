import React from "react";
import toast from "react-hot-toast";

export default function StatusModal({
  isStatusModalOpen,
  handleStsModalClose,
  selectedOrder,
  selectedStatus,
  setSelectedStatus,
}) {
  console.log(selectedOrder);
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleStatusSubmitBtn =() => {
    // console.log("clicked");
    handleStsModalClose(selectedOrder.orderNumber, selectedStatus);
    toast.success("Status Changed Successfully'", {
      duration: 2000,
      position:"top-left",
      reverseOrder:false,
    });
  };

  if (!isStatusModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <div className="text-xl bg-gray-700 rounded-md text-white p-4">
            Order ID: {selectedOrder.orderNumber}
          </div>
          <form className="flex justify-between px-2 my-3 items-center">
            <input
              type="radio"
              value="Completed"
              checked={selectedStatus === "Completed"}
              onChange={handleStatusChange}
              className="form-checkbox h-4 w-4 rounded-full ring-1 ring-black text-white checked:text-green-800 focus:ring-1 mr-1"
            />
            <label className="text-lg text-black mr-2">Completed</label>
            <input
              type="radio"
              value="Placed Order"
              checked={selectedStatus === "Placed Order"}
              onChange={handleStatusChange}
              className="form-checkbox h-4 w-4 rounded-full ring-1 ring-black text-white checked:text-green-800 focus:ring-1 ml-2 mr-1"
            />
            <label className="text-lg text-black">Placed Order</label>
            <input
              type="radio"
              value="Cancel"
              checked={selectedStatus === "Cancel"}
              onChange={handleStatusChange}
              className="form-checkbox h-4 w-4 rounded-full ring-1 ring-black text-white checked:text-green-800 focus:ring-1 ml-2 mr-1"
            />
            <label className="text-lg text-black">Cancel Order</label>
          </form>

          <div>
            <button
              className="mr-4 bg-green-800 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={handleStatusSubmitBtn}>
              Change
            </button>
            <button
              className="bg-gray-700 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={() => {handleStsModalClose(selectedOrder.orderNumber, selectedOrder.status)}}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
