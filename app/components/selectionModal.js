"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function SelectionModal({
  isSelectionModalOpen,
  setSelectionModalOpen,
  tempCartItems,
  setTempCartItems,
  selectedItemID,
}) {
  console.log("TempCartItems is ",tempCartItems);
//   console.log(selectedItemID);
  const handleChoiceChange = (itemId, choiceName) => {
    // console.log(itemId);
    setTempCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedItemID.id
          ? {
              ...selectedItemID,
              selectedChoice: item.choices.find((choice) => choice.name === choiceName),
            }
          : item
      )
    );
  };
  const handleMeatLevel = (itemId, level) => {
    setTempCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedItemID.id
          ? { ...item, selectedMeatLevel: selectedItemID.meat.find((meat) => meat.level === level) }
          : item
      )
    );
  };
  const handleAddOn = (itemId, type) => {
    setTempCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedItemID.id
          ? { ...item, selectedAddOn: selectedItemID.addOn.find((addOn) => addOn.type === type) }
          : item
      )
    );
  };
  const handleSelectionBtn = () => {
    setTempCartItems([...tempCartItems, { ...selectedItemID, quantity: 1, id: `${selectedItemID.id}-${tempCartItems.length}` }]);
    setSelectionModalOpen(false);
    toast.success("Added to Cart", {
      duration: 2000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  const handleModalClose = () => {
    setSelectionModalOpen(false);
  };

  if (!isSelectionModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
          <div className="flex flex-col gap-4">
            {selectedItemID && (
              <div key={selectedItemID.id} className="border rounded-md p-2 shadow-sm my-2">
                <div className="flex">
                  <Image
                    src={selectedItemID.image}
                    alt="stew"
                    width="100"
                    height="100"
                    className="sm:h-20 w-20 object-cover rounded-lg my-2"
                  />
                  <div className="flex w-full items-center py-1 pl-2 pr-1">
                    <div className="flex w-full justify-between px-1 space-x-2">
                      <div className="text-black text-base ">{selectedItemID.name} x 1</div>
                      <div className="text-green-800 font-bold text-base ">
                        {parseFloat(selectedItemID.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                {selectedItemID.choices && (
                  <select
                    id="choices"
                    className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                    onChange={(e) => handleChoiceChange(selectedItemID.id, e.target.value)}>
                    {selectedItemID.choices.map((choice, index) => (
                      <option key={index} value={choice.name}>
                        {choice.name} + RM {choice.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                )}
                {selectedItemID.meat && (
                  <select
                    id="meat"
                    className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                    onChange={(e) => handleMeatLevel(selectedItemID.id, e.target.value)}>
                    {selectedItemID.meat.map((meat, index) => (
                      <option key={index} value={meat.level}>
                        {meat.level} + RM {meat.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                )}
                {selectedItemID.addOn && (
                  <select
                    id="meat"
                    className="block appearance-none w-full py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                    onChange={(e) => handleAddOn(selectedItemID.id, e.target.value)}>
                    {selectedItemID.addOn.map((addOn, index) => (
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