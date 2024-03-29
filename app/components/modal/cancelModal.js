import React from "react";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { selectedTableOrderAtom } from "../atoms/selectedTableOrderAtom";
import { selectedTakeAwayOrderAtom } from "../atoms/selectedTakeAwayOrderAtom";

export default function CancelModal({
  isCancelModalOpen,
  setCancelModalOpen,
  handleCancelStatus,
  orderType, 
}) {
  function useSelectedOrder(orderType) {
    const [selectedTableOrder, setSelectedTableOrder] = useAtom(selectedTableOrderAtom);
    const [selectedTakeAwayOrder, setSelectedTakeAwayOrder] = useAtom(selectedTakeAwayOrderAtom);

    const selectedOrder = orderType === "Dine-In" ? selectedTableOrder : selectedTakeAwayOrder;
    const setSelectedOrder =
      orderType === "Dine-In" ? setSelectedTableOrder : setSelectedTakeAwayOrder;

    return [selectedOrder, setSelectedOrder];
  }
  const [selectedOrder, setSelectedOrder] = useSelectedOrder(orderType);
  const handleStatusSubmitBtn = () => {
    handleCancelStatus(selectedOrder.orderNumber);
    toast.success("Order is Cancelled", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };

  if (!isCancelModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 -top-10 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[340px] text-center">
          <div className="text-xl bg-gray-700 rounded-md text-white p-4">
            Order ID: {selectedOrder.orderNumber}
          </div>
          <div className="text-lg text-gray-800 my-3">Do you want to cancel this order?</div>

          <div>
            <button
              className="mr-4 bg-red-600 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={handleStatusSubmitBtn}>
              Yes
            </button>
            <button
              className="bg-gray-700 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setCancelModalOpen(false);
              }}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
