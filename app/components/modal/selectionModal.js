"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function SelectionModal({
  isSelectionModalOpen,
  setSelectionModalOpen,
  selectedOrder,
  setSelectedOrder,
  selectionModal,
  setSelectionModal,
}) {
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
  const handleSelectionBtn = () => {
    // Generate a unique ID based on the current time and a random number
    

    setSelectedOrder((prevOrder) => {
      // Check if the item is already in the order
      const existingOrderItem = prevOrder.items.find(
        (orderItem) =>
          orderItem.item.id === selectionModal.item.id &&
          orderItem.selectedChoice === selectionModal.choice &&
          orderItem.selectedMeatLevel === selectionModal.meatLevel &&
          orderItem.selectedAddOn === selectionModal.addOn
      );selectedOrder
      const matchingItem = selectedOrder.items.find(
        (orderItem) =>
          orderItem.selectedChoice === selectionModal.choice &&
          orderItem.selectedMeatLevel === selectionModal.meatLevel &&
          orderItem.selectedAddOn === selectionModal.addOn
      );
        console.log(matchingItem);
       if (matchingItem === existingOrderItem){
        console.log("true");
       }

      // Check if the selectedChoice, selectedMeatLevel, and selectedAddOn are at their default values
    //   const isDefaultSelection =
    //     selectionModal.choice === selectionModal?.item?.choices?.[0] &&
    //     selectionModal.meatLevel ===
    //       (Array.isArray(selectionModal?.item?.meat)
    //         ? selectionModal.item.meat[0]
    //         : "Not Available") &&
    //     selectionModal.addOn ===
    //       (Array.isArray(selectionModal?.item?.addOn)
    //         ? selectionModal.item.addOn[0]
    //         : "Not Available");
      //   console.log(selectionModal.choice);
      //   console.log(selectionModal.meatLevel);
      //   console.log(selectionModal.addOn);
      //   console.log(isDefaultSelection);
      if ( existingOrderItem ) {
        // If the item is already in the order or has default selections, increase its quantity by 1
        return {
          ...prevOrder,
          items: prevOrder.items.map((orderItem) =>
            orderItem.item.id === selectionModal.item.id
              ? { ...orderItem, quantity: orderItem.quantity + 1 }
              : orderItem
          ),
        };
      } else {
        // If the item is not in the order, add it to the order with a quantity of 1
        return {
          ...prevOrder,
          items: [
            ...prevOrder.items,
            {
              item: selectionModal.item,
                // id: `${selectionModal.item.id}-${prevOrder.items.length}-${uniqueId}`,
              quantity: 1,
              selectedChoice: selectionModal.choice,
              selectedMeatLevel: selectionModal.meatLevel,
              selectedAddOn: selectionModal.addOn,
            },
          ],
        };
      }
    });

    setSelectionModalOpen(false);
    toast.success("Added to cart!", {
      duration: 1000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  const handleModalClose = () => {
    // Close the selection modal
    setSelectionModalOpen(false);
  };

  // If the selection modal is not open, don't render anything
  if (!isSelectionModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
          <div className="flex flex-col gap-4">
            {selectionModal.item && (
              <div key={`${selectionModal.item.id}-Selection-${uniqueId}`} className="border rounded-md p-2 shadow-sm my-2">
                <div className="flex">
                  <Image
                    src={selectionModal.item.image}
                    alt="stew"
                    width="100"
                    height="100"
                    className="sm:h-20 w-20 object-cover rounded-lg my-2"
                  />
                  <div className="flex w-full items-center py-1 pl-2 pr-1">
                    <div className="flex w-full justify-between px-1 space-x-2">
                      <div className="text-black text-base ">{selectionModal.item.name} x 1</div>
                      <div className="text-green-800 font-bold text-base ">
                        {parseFloat(selectionModal.item.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                {selectionModal.item.choices && (
                  <select
                    id="choices"
                    className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                    onChange={(e) => {
                      const selectedChoice = selectionModal.item.choices[e.target.selectedIndex];
                      console.log(selectedChoice);
                    }}>
                    {selectionModal.item.choices.map((choice, index) => (
                      <option key={index} value={choice.name}>
                        {choice.name} + RM {choice.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                )}
                {selectionModal.item.meat && (
                  <select
                    id="meat"
                    className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                    onChange={(e) => {
                      const selectedLevel = selectionModal.item.meat[e.target.selectedIndex];
                      console.log(selectedLevel);
                    }}>
                    {selectionModal.item.meat.map((meat, index) => (
                      <option key={index} value={meat.level}>
                        {meat.level} + RM {meat.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                )}
                {selectionModal.item.addOn && (
                  <select
                    id="meat"
                    className="block appearance-none w-full py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                    onChange={(e) => {
                      const selectedAddOn = selectionModal.item.addOn[e.target.selectedIndex];
                      console.log(selectedAddOn);
                    }}>
                    {selectionModal.item.addOn.map((addOn, index) => (
                      <option key={index} value={addOn.type}>
                        {addOn.type} + RM {addOn.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
          <div className="flex w-full space-x-2 my-2 justify-center items-center">
            <button
              className="flex-1 bg-green-800 text-sm text-white font-bold py-3 px-4 rounded-md"
              onClick={handleSelectionBtn}>
              Confirm
            </button>
            {/* <div className="text-center text-white">OR</div> */}
            <button
              className="flex-1 bg-gray-700 text-sm text-white font-bold py-3 px-4 rounded-md"
              onClick={handleModalClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(SelectionModal);
