"use client"
import React, {useState} from "react";
import toast from "react-hot-toast";

export default function RemarksModal({
  isRemarksModalOpen,
  handleRemarksModalClose,
  setRemarksOpen,
  remarks,
  setRemarks,
  selectedOrder,
}) {

  const handleRemarksSubmitBtn = () => {
    handleRemarksModalClose(remarks);
    toast.success("Remarks is Added", {
      duration: 1000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  if (!isRemarksModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 -top-10 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[340px] text-center">
          <div className="text-lg text-left text-gray-800 pl-2 my-3">Customer&apos;s Remarks:</div>
          <div>
            <textarea
              rows="5"
              value={remarks}
              onInput={(e) => setRemarks(e.target.value)}
              className="mt-1 block w-full text-black rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Type remarks here..."
            />
          </div>
          <div className="mt-4">
            <button
              className="mr-4 bg-green-800 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={handleRemarksSubmitBtn}>
              Confirm
            </button>
            <button
              className="bg-gray-700 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setRemarksOpen(false);
                // console.log(remarks);
              }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
