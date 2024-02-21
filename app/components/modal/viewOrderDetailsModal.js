"use client";
import React from "react";
import Image from "next/image";

function ViewOrderDetailsModal({ isEditOrderModalOpen, setEditOrderModalOpen, selectedOrder, setChangeStatusModalOpen }) {
  console.log(selectedOrder);
  const totalItems = selectedOrder?.items?.length;
  const totalQuantity = selectedOrder?.items?.reduce(
    (total, itemObj) => total + itemObj.quantity,
    0
  );

  if (!isEditOrderModalOpen) {
    return null;
  }
  let orderStatus;
  if (selectedOrder?.status == "Completed") {
    orderStatus = "STATUS: COMPLETED";
  } else if (selectedOrder?.status === "Cancelled") {
    orderStatus = "STATUS: CANCELLED";
  }
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 opacity-80 z-20"></div>
      <div className="fixed inset-0 flex items-center justify-center z-30 ">
        <div className="bg-white p-8 rounded-l-lg shadow-lg w-4/6 h-full mt-10 ml-4 overflow-y-scroll">
          <div className="rounded-lg flex my-2 justify-between items-center">
            <div className="flex justify-between items-center w-full">
              <div
                className={`flex items-center text-lg font-bold ${
                  selectedOrder?.status === "Cancelled" ? "text-gray-500" : "text-green-800"
                }`}>
                {selectedOrder?.orderNumber}
              </div>
              <div className="flex justify-start">
                <div
                  className={`text-sm my-2 ml-2 ${
                    selectedOrder?.status === "Cancelled" ? "text-gray-500" : "text-green-800"
                  }`}>
                  {selectedOrder?.status === "Completed"
                    ? `Completion Time: ${selectedOrder?.paymentTime}`
                    : `Cancellation Time: ${selectedOrder?.cancellationTime}, ${selectedOrder?.orderDate}`}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-1">
            {Array.isArray(selectedOrder?.items) &&
              selectedOrder?.items.map((itemObj, index) => {
                const { item, quantity, selectedChoice, selectedMeatLevel, selectedAddOn } =
                  itemObj; // Destructure from itemObj
                const itemTotalAddOn =
                  (selectedChoice && selectedChoice.price ? parseFloat(selectedChoice.price) : 0) +
                  (selectedMeatLevel && selectedMeatLevel.price
                    ? parseFloat(selectedMeatLevel.price)
                    : 0) +
                  (selectedAddOn && selectedAddOn.price ? parseFloat(selectedAddOn.price) : 0);
                return (
                  <div key={`${item.id}`} className="border rounded-md p-2 shadow-sm relative">
                    <div
                      className={`absolute -ml-2 -mt-2 text-xs rounded-br-md px-2 py-1 z-10 ${
                        selectedOrder?.status === "Cancelled"
                          ? "bg-red-700 text-white"
                          : "bg-green-800 text-white bg-opacity-90"
                      }`}>
                      {index + 1}
                    </div>
                    <div className="flex">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width="100"
                        height="100"
                        className={`sm:h-18 w-20 object-cover rounded-lg ${
                          selectedOrder?.status === "Cancelled" ? "filter grayscale" : ""
                        }`}
                      />
                      <div className="flex w-full items-center py-1 pl-2 pr-1">
                        <div className="flex w-full justify-between px-1 space-x-2 items-center">
                          <div className="flex justify-between flex-col">
                            <div
                              className={`text-base ${
                                selectedOrder?.status === "Cancelled"
                                  ? "text-gray-500"
                                  : "text-black"
                              }`}>
                              {item.name} x {quantity}
                            </div>
                            <div className="flex space-x-2">
                              <div
                                className={`text-sm ${
                                  selectedOrder?.status === "Cancelled"
                                    ? "text-gray-500"
                                    : "text-green-800"
                                }`}>
                                {selectedChoice &&
                                selectedChoice.name &&
                                selectedChoice.name !== "Not Available"
                                  ? `${selectedChoice.name} (${selectedChoice.price.toFixed(2)})`
                                  : null}
                              </div>
                              <div
                                className={`text-sm ${
                                  selectedOrder?.status === "Cancelled"
                                    ? "text-gray-500"
                                    : "text-green-800"
                                }`}>
                                {selectedMeatLevel &&
                                selectedMeatLevel.level &&
                                selectedMeatLevel.level !== "Not Available"
                                  ? `${selectedMeatLevel.level} (${selectedMeatLevel.price.toFixed(
                                      2
                                    )})`
                                  : null}
                              </div>
                              <div
                                className={`text-sm ${
                                  selectedOrder?.status === "Cancelled"
                                    ? "text-gray-500"
                                    : "text-green-800"
                                }`}>
                                {selectedAddOn &&
                                selectedAddOn.type &&
                                selectedAddOn.type !== "Not Available"
                                  ? `${selectedAddOn.type} (${selectedAddOn.price.toFixed(2)})`
                                  : null}
                              </div>
                            </div>
                          </div>
                          <div className="w-[50px] text-right">
                            <div
                              className={`text-base font-bold ${
                                selectedOrder?.status === "Cancelled"
                                  ? "text-gray-500"
                                  : "text-green-800"
                              }`}>
                              {(parseFloat(item.price) * quantity).toFixed(2)}
                            </div>
                            {selectedChoice && (
                              <div className="text-green-800 text-base font-semibold">
                                + {(parseFloat(itemTotalAddOn) * quantity).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-2/6 h-full rounded-r-lg shadow-lg bg-gray-100 mt-10 mr-4 pt-6 px-4">
          <div className={`flex ${selectedOrder?.status === "Cancelled" ? "justify-end" : "justify-end"}`}>
          {/* {selectedOrder?.status === "Cancelled" && (
              <button
                className="text-sm text-white bg-green-800 px-4 py-2 rounded-lg"
                onClick={() => {
                  setChangeStatusModalOpen(true);
                }}>
                Change Status
              </button>
            )} */}
            <button
              className="text-sm text-white bg-red-700 px-4 py-2 rounded-lg"
              onClick={() => {
                setEditOrderModalOpen(false);
              }}>
              Close
            </button>
          </div>
          <div className="rounded-lg overflow-hidden border shadow-sm mt-4">
            <table className="table-auto w-full">
              <thead className="rounded-lg">
                <tr
                  className={`text-center ${
                    selectedOrder?.status === "Cancelled"
                      ? "bg-gray-500 text-white"
                      : "bg-green-800 text-white"
                  }`}>
                  <th className="text-sm py-3 border-b font-light">Total Items</th>
                  <th className="text-sm py-3 border-b font-light">Total Quantity</th>
                  <th className="text-sm py-3 border-b font-light">Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white text-gray-600 text-center">
                  <td
                    className={`text-sm border py-2 font-semibold ${
                      selectedOrder?.status === "Cancelled" ? "line-through text-red-700" : ""
                    }`}>
                    {totalItems}
                  </td>
                  <td
                    className={`text-sm border py-2 font-semibold ${
                      selectedOrder?.status === "Cancelled" ? "line-through text-red-700" : ""
                    }`}>
                    {totalQuantity}
                  </td>
                  <td
                    className={`text-sm border py-2 font-semibold ${
                      selectedOrder?.status === "Cancelled" ? "line-through text-red-700" : ""
                    }`}>
                    {selectedOrder?.paymentMethod ? selectedOrder.paymentMethod : "None"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-md border shadow-sm py-4 px-4 mt-1">
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-md">Subtotal</div>
              <div
                className={`text-gray-600 text-md ${
                  selectedOrder?.status === "Cancelled" ? "line-through text-red-700" : ""
                }`}>
                {selectedOrder?.subTotal?.toFixed(2)}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-md">Service Charge</div>
              <div
                className={`text-gray-600 text-md ${
                  selectedOrder?.status === "Cancelled" ? "line-through text-red-700" : ""
                }`}>
                {selectedOrder?.serviceCharge?.toFixed(2)}
              </div>
            </div>
            {selectedOrder?.amountReceived && (
              <div className="flex justify-between items-center">
                <div className="text-gray-600 text-md">Amount Received</div>
                <div
                  className={`text-gray-600 text-md ${
                    selectedOrder?.status === "Cancelled" ? "line-through text-red-700" : ""
                  }`}>
                  {selectedOrder?.amountReceived.toFixed(2)}
                </div>
              </div>
            )}
            {selectedOrder?.amountChange !== undefined && selectedOrder?.amountChange !== null && (
              <div className="flex justify-between items-center">
                <div className="text-gray-600 text-md">Change</div>
                <div
                  className={`text-gray-600 text-md ${
                    selectedOrder?.status === "Cancelled" ? "line-through text-red-700" : ""
                  }`}>
                  {selectedOrder?.amountChange.toFixed(2)}
                </div>
              </div>
            )}
            <hr className="h-px my-3 bg-black border-dashed" />
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-base font-bold">Total Sales</div>
              <div
                className={`text-gray-600 text-base font-bold ${
                  selectedOrder?.status === "Cancelled" ? "line-through text-red-700" : ""
                }`}>
                RM {selectedOrder?.totalPrice?.toFixed(2)}
              </div>
            </div>
          </div>
          <div
            className={`w-full mb-4 mt-2 rounded-md p-2 text-sm font-medium text-center ${
              selectedOrder?.status === "Cancelled" ? "text-red-700" : "text-green-800"
            }`}>
            {orderStatus}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(ViewOrderDetailsModal);

// showEditBtn
// Status === "Placed Order" && payment !=="Paid"
// setShowEditBtn(true);
// esle setShowEditBtn(false);
