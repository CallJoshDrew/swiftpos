"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAtom } from 'jotai';


function EditOrderDetails({
  isEditOrderModalOpen, 
  setEditOrderModalOpen,
  selectedOrder,
}) {
  console.log(selectedOrder);

  if (!isEditOrderModalOpen) {
    return null;
  }
  let orderStatus;
  let orderStatusCSS;
  let handleMethod;
  if (selectedOrder?.status == "Status" && selectedOrder?.items.length > 0) {
    orderStatus = "Place Order & Print";
    orderStatusCSS = "bg-green-800";
    handleMethod = handlePlaceOrderBtn;
  } else if (selectedOrder?.status === "Status") {
    orderStatus = "Empty Cart";
    orderStatusCSS = "bg-gray-500";
    handleMethod = "Disabled";
  } else if (selectedOrder?.status == "Placed Order" && !showEditBtn) {
    orderStatus = "Update Order & Print";
    isSameItems && remarks === tempRemarks
      ? (orderStatusCSS = "bg-gray-500")
      : (orderStatusCSS = "bg-green-800");
    isSameItems && remarks === tempRemarks
      ? (handleMethod = "Disabled")
      : (handleMethod = handleUpdateOrderBtn);
  } else if (selectedOrder?.status == "Placed Order") {
    orderStatus = "Make Payment";
    orderStatusCSS = "bg-green-800";
    handleMethod = handlePaymentBtn;
  } else if (selectedOrder?.status == "Paid") {
    orderStatus = "Check Out";
    orderStatusCSS = "bg-yellow-500";
    handleMethod = handleCheckOutBtn;
  } else if (selectedOrder?.status == "Check Out") {
    orderStatus = "Completed";
    orderStatusCSS = "bg-gray-500";
    handleMethod = "Disabled";
  } else if (selectedOrder?.status == "Completed") {
    orderStatus = "Completed";
    orderStatusCSS = "bg-gray-500";
    handleMethod = "Disabled";
  } else if (selectedOrder?.status == "Cancelled") {
    orderStatus = "Cancelled";
    orderStatusCSS = "bg-gray-500";
    handleMethod = "Disabled";
  }
  return (
    <> 
      <div className="fixed inset-0 bg-gray-500 opacity-80 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full h-full mt-10 mx-4">
        <div className="rounded-lg flex my-2 justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <div
              className={`flex items-center text-lg font-bold ${
                selectedOrder?.status === "Cancelled" ? "text-gray-500" : "text-green-800"
              }`}>
              {selectedOrder?.orderNumber}
              {selectedOrder?.status === "Placed Order" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-800 pl-1">
                  {/* onClick={() => handleCancelOrder()}> */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0" />
        <div className="flex px-2 items-center justify-between">
          <div
            className={`text-sm font-bold leading-none ${
              selectedOrder?.status === "Cancelled" ? "text-gray-500" : "text-green-800"
            }`}>
            {selectedOrder?.status}
          </div>
          <div
            className={`text-sm ${
              selectedOrder?.status === "Cancelled" ? "text-gray-500" : "text-green-800"
            }`}>
            {selectedOrder?.status === "Placed Order"
              ? `${selectedOrder?.orderTime}, ${selectedOrder?.orderDate}`
              : selectedOrder?.paymentTime}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {Array.isArray(selectedOrder?.items) &&
            selectedOrder?.items.map((itemObj) => {
              const { item, quantity, selectedChoice, selectedMeatLevel, selectedAddOn } = itemObj; // Destructure from itemObj
              const itemTotalAddOn =
                (selectedChoice && selectedChoice.price ? parseFloat(selectedChoice.price) : 0) +
                (selectedMeatLevel && selectedMeatLevel.price
                  ? parseFloat(selectedMeatLevel.price)
                  : 0) +
                (selectedAddOn && selectedAddOn.price ? parseFloat(selectedAddOn.price) : 0);
              return (
                <div key={`${item.id}`} className="border rounded-md p-2 shadow-sm">
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
                      <div className="flex w-full justify-between px-1 space-x-2">
                        <div
                          className={`text-base ${
                            selectedOrder?.status === "Cancelled" ? "text-gray-500" : "text-black"
                          }`}>
                          {item.name} x {quantity}
                        </div>
                        <div
                          className={`text-base font-bold ${
                            selectedOrder?.status === "Cancelled"
                              ? "text-gray-500"
                              : "text-green-800"
                          }`}>
                          {(parseFloat(item.price) * quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {item.choices && (
                    <select
                      id="choices"
                      className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                      onChange={(e) => handleChoiceChange(item.id, e.target.value)}
                      value={selectedChoice.name} // Use selectedChoice.name here
                      disabled={showEditControls ? false : true}>
                      {item.choices.map((choice, index) => (
                        <option key={index} value={choice.name}>
                          {choice.name} + RM {choice.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  )}
                  {item.meat && (
                    <select
                      id="meat"
                      className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                      onChange={(e) => handleMeatLevel(item.id, e.target.value)}
                      value={selectedMeatLevel.level}
                      disabled={showEditControls ? false : true}>
                      {item.meat.map((meat, index) => (
                        <option key={index} value={meat.level}>
                          {meat.level} + RM {meat.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  )}
                  {item.addOn && (
                    <select
                      id="meat"
                      className="block appearance-none w-full py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                      onChange={(e) => handleAddOn(item.id, e.target.value)}
                      value={selectedAddOn.type}
                      disabled={showEditControls ? false : true}>
                      {item.addOn.map((addOn, index) => (
                        <option key={index} value={addOn.type}>
                          {addOn.type} + RM {addOn.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  )}
                  {/* {selectedChoice && ( */}
                    <div className="text-green-800 text-sm font-bold text-right px-2 pt-2">
                      Add On x {quantity}: RM {(parseFloat(itemTotalAddOn) * quantity).toFixed(2)}
                    </div>
                  {/* )} */}
                </div>
              );
            })}
        </div>
      </div>
      <div className="fixed w-2/6 bottom-0 right-0 overflow-y-scroll bg-gray-100 mt-8 mx-4 pt-3 px-6">
          <div className="bg-gray-100 py-2 rounded-md">
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-sm">Subtotal</div>
              <div className="text-gray-600 text-sm">{selectedOrder?.subTotal?.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-sm">Service Charge</div>
              <div className="text-gray-600 text-sm">{selectedOrder?.serviceCharge?.toFixed(2)}</div>
            </div>
            {selectedOrder?.amountReceived && (
              <div className="flex justify-between items-center">
                <div className="text-gray-600 text-sm">Amount Received</div>
                <div className="text-gray-600 text-sm">
                  {selectedOrder?.amountReceived.toFixed(2)}
                </div>
              </div>
            )}
            {selectedOrder?.amountChange !== undefined && selectedOrder?.amountChange !== null && (
              <div className="flex justify-between items-center">
                <div className="text-gray-600 text-sm">Change</div>
                <div className="text-gray-600 text-sm">
                  {selectedOrder?.amountChange.toFixed(2)}
                </div>
              </div>
            )}
            <hr className="h-px my-3 bg-black border-dashed" />
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-base font-bold">Total Sales</div>
              <div className="text-gray-600 text-base font-bold">RM {selectedOrder?.totalPrice?.toFixed(2)}</div>
            </div>
          </div>
          <button
            className={`${orderStatusCSS} text-white w-full mb-4 mt-2 rounded-md p-2 text-sm font-medium`}
            onClick={handleMethod !== "Disabled" ? handleMethod : undefined}
            disabled={handleMethod === "Disabled"}>
            {/* {/* The disabled attribute is true if handleMethod is "Disabled" */}
            {orderStatus}
          </button>
        </div>
    </div>
  </>
  );
}

export default React.memo(EditOrderDetails);

// showEditBtn
// Status === "Placed Order" && payment !=="Paid"
// setShowEditBtn(true);
// esle setShowEditBtn(false);
