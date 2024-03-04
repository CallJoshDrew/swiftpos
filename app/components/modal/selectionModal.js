"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { ordersAtom } from "../atoms/ordersAtom";
import { selectedTableOrderAtom } from "../atoms/selectedTableOrderAtom";
import { selectedTakeAwayOrderAtom } from "../atoms/selectedTakeAwayOrderAtom";

function SelectionModal({
  isSelectionModalOpen,
  setSelectionModalOpen,
  selectionModal,
  setSelectionModal,
  orderType,
}) {
  const [remarks, setRemarks] = useState("");
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);
  const options = ["No Vegetables", "No Coriander", "More Onion"];

  const handleAddRemarks = (option) => {
    setRemarks((prevRemarks) => {
      // Check if the option already exists in remarks
      if (prevRemarks.includes(option)) {
        // If it exists, remove it
        return prevRemarks.replace(`${option},`, "");
      } else {
        // If it doesn't exist, add it
        return `${prevRemarks} ${option},`;
      }
    });
  };

  const [orders, setOrders] = useAtom(ordersAtom);

  function useSelectedOrder(orderType) {
    const [selectedTableOrder, setSelectedTableOrder] = useAtom(selectedTableOrderAtom);
    const [selectedTakeAwayOrder, setSelectedTakeAwayOrder] = useAtom(selectedTakeAwayOrderAtom);

    const selectedOrder = orderType === "Dine-In" ? selectedTableOrder : selectedTakeAwayOrder;
    const setSelectedOrder =
      orderType === "Dine-In" ? setSelectedTableOrder : setSelectedTakeAwayOrder;

    return [selectedOrder, setSelectedOrder];
  }
  const [selectedOrder, setSelectedOrder] = useSelectedOrder(orderType);

  const updateOrders = (prevOrders, updatedOrder) => {
    const orderIndex = prevOrders.findIndex(
      (order) => order.orderNumber === updatedOrder.orderNumber
    );

    if (orderIndex === -1) {
      return [...prevOrders, updatedOrder];
    } else {
      const updatedOrders = [...prevOrders];
      updatedOrders[orderIndex] = updatedOrder;
      return updatedOrders;
    }
  };

  const handleSelectionBtn = () => {
    // Generate a unique ID based on the current time and a random number
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    setSelectedOrder((prevOrder) => {
      let newOrder;
      // Check if the item is already in the order
      const existingOrderItem = prevOrder.items.find(
        (orderItem) => orderItem.item.id === selectionModal.item.id
      );
      if (existingOrderItem) {
        // If the item is already in the order, increase its quantity by 1
        const updatedItems = prevOrder.items.map((orderItem) =>
          orderItem.item.id === selectionModal.item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
        // Find the updated item
        const updatedItem = updatedItems.find(
          (orderItem) => orderItem.item.id === selectionModal.item.id
        );
        // Filter out the updated item from the array
        const remainingItems = updatedItems.filter(
          (orderItem) => orderItem.item.id !== selectionModal.item.id
        );
        // Add the updated item at the beginning of the array
        newOrder = {
          ...prevOrder,
          items: [updatedItem, ...remainingItems],
        };
      } else {
        // If the item is not in the order, add it to the order with a quantity of 1
        newOrder = {
          ...prevOrder,
          items: [
            {
              item: {
                ...selectionModal.item,
                id: `${selectionModal.item.id}-${prevOrder.items.length}-${uniqueId}`,
              },
              quantity: 1,
              selectedChoice: selectionModal.choice,
              selectedFlavor: selectionModal.flavor,
              selectedType: selectionModal.type,
              selectedMeatLevel: selectionModal.meatLevel,
              selectedAddOn: selectionModal.addOn,
              remarks,
            },
            ...prevOrder.items,
          ],
        };
      }
      setOrders((prevOrders) => updateOrders(prevOrders, newOrder));
      return newOrder;
    });
    setSelectionModalOpen(false);
    setRemarks("");
    toast.success("Added to cart!", {
      duration: 500,
      position: "top-center",
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
        <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">
          <div className="flex flex-col gap-4">
            {selectionModal.item && (
              <div key={selectionModal.item.id} className="border rounded-md p-2 shadow-sm my-2">
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
                      setSelectionModal((prevSelectionModal) => ({
                        ...prevSelectionModal,
                        choice: selectedChoice,
                      }));
                    }}>
                    {selectionModal.item.choices.map((choice, index) => (
                      <option key={index} value={choice.name}>
                        {choice.name} + RM {choice.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                )}
                <div className="flex space-x-2">
                {selectionModal.item.flavor && (
                  <select
                    id="flavor"
                    className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                    onChange={(e) => {
                      const selectedFlavor = selectionModal.item.flavor[e.target.selectedIndex];
                      setSelectionModal((prevSelectionModal) => ({
                        ...prevSelectionModal,
                        flavor: selectedFlavor,
                      }));
                    }}>
                    {selectionModal.item.flavor.map((flavor, index) => (
                      <option key={index} value={flavor.name}>
                        {flavor.name}
                      </option>
                    ))}
                  </select>
                )}
                {selectionModal.item.types && (
                  <select
                    id="flavor"
                    className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                    onChange={(e) => {
                      const selectedType = selectionModal.item.types[e.target.selectedIndex];
                      setSelectionModal((prevSelectionModal) => ({
                        ...prevSelectionModal,
                        type: selectedType,
                      }));
                    }}>
                    {selectionModal.item.types.map((type, index) => (
                      <option key={index} value={type.name}>
                        {type.name} + RM {type.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                )}
                </div>
                {selectionModal.item.meat && (
                  <select
                    id="meat"
                    className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                    onChange={(e) => {
                      const selectedLevel = selectionModal.item.meat[e.target.selectedIndex];
                      console.log(selectedLevel);
                      setSelectionModal((prevSelectionModal) => ({
                        ...prevSelectionModal,
                        meatLevel: selectedLevel,
                      }));
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
                      setSelectionModal((prevSelectionModal) => ({
                        ...prevSelectionModal,
                        addOn: selectedAddOn,
                      }));
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
          <div className="flex flex-col items-center">
            <div className="mb-1 w-full">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="bg-yellow-500 hover:bg-green-800 text-white text-sm font-bold py-2 px-4 rounded m-2"
                  onClick={() => handleAddRemarks(option)}>
                  {option}
                </button>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              className="form-textarea mt-1 block w-full rounded-md border-gray-300 text-gray-500 p-2"
              rows="2"
              placeholder="Select or type remarks here..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
          <div className="flex w-full space-x-2 my-2 justify-center items-center">
            <button
              className="flex-1 bg-green-800 text-sm text-white font-bold py-3 px-4 rounded-md"
              onClick={handleSelectionBtn}>
              Confirm
            </button>
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
