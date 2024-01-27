"use client";
import React, { useState } from "react";
import MenuItem from "./menuItem";
import SelectionModal from "../modal/selectionModal";

function MenuCard({ menu, selectedOrder, selectedCategory, setSelectedOrder, setShowEditBtn, tempCartItems, setTempCartItems, setShowRemarksBtn, }) {
  const [isSelectionModalOpen, setSelectionModalOpen] = useState(false);
  const [selectionModal, setSelectionModal] = useState({
    item: "",
    choice: "",
    meatLevel: "",
    addOn: "",
  });

  const handleItemSelection = (item) => {
    setSelectionModalOpen(true);
    setSelectionModal({
      item,
      choice: item.choices?.[0] || "Not Available",
      meatLevel: item.meat?.[0] || "Not Available",
      addOn: item.addOn?.[0] || "Not Available",
    });
  };
  
  if (selectedCategory !== "All") {
    menu = menu.filter((item) => item.category === selectedCategory);
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {menu.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          handleItemSelection={handleItemSelection}
          setShowEditBtn={setShowEditBtn}
          tempCartItems={tempCartItems}
          setTempCartItems={setTempCartItems}
          setShowRemarksBtn={setShowRemarksBtn}
        />
      ))}
      <SelectionModal
        isSelectionModalOpen={isSelectionModalOpen}
        setSelectionModalOpen={setSelectionModalOpen}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        selectionModal={selectionModal}
        setSelectionModal={setSelectionModal}
      />
    </div>
  );
}

export default React.memo(MenuCard);
