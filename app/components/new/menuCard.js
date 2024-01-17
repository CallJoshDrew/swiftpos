"use client";
import React, { useState } from "react";
import MenuItem from "./menuItem";
import SelectionModal from "../modal/selectionModal";

function MenuCard({ menu, selectedCategory, setSelectedOrder }) {
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
      choice: item.choices?.[0] || "",
      meatLevel: item.meat?.[0] || "",
      addOn: item.addOn?.[0] || "",
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
          setSelectedOrder={setSelectedOrder}
          handleItemSelection={handleItemSelection}
        />
      ))}
      <SelectionModal
        isSelectionModalOpen={isSelectionModalOpen}
        setSelectionModalOpen={setSelectionModalOpen}
        setSelectedOrder={setSelectedOrder}
        selectionModal={selectionModal}
        setSelectionModal={setSelectionModal}
      />
    </div>
  );
}

export default React.memo(MenuCard);
