"use client";
import React, { useState, useEffect } from "react";
import SelectionModal from "./selectionModal";
import MenuItem from "./menuItem";

function MenuCard({ menu, selectedCategory, tempCartItems, setTempCartItems }) {
  const [isSelectionModalOpen, setSelectionModalOpen] = useState(false);
  const [selectedItemID, setSelectedItemID] = useState("");
  const handleSelectedItem = (item) => {
    setSelectedItemID(item);
    setSelectionModalOpen(true);
  }

  if (selectedCategory !== "All") {
    menu = menu.filter((item) => item.category === selectedCategory);
  }
  useEffect(() => {
    console.log(selectedItemID);
  }, [selectedItemID])

  return (
    <div className="grid grid-cols-3 gap-2">
      {menu.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          tempCartItems={tempCartItems}
          setTempCartItems={setTempCartItems}
          handleSelectedItem={handleSelectedItem}
        />
      ))}
      <SelectionModal
        isSelectionModalOpen={isSelectionModalOpen}
        setSelectionModalOpen={setSelectionModalOpen}
        tempCartItems={tempCartItems}
        setTempCartItems={setTempCartItems}
        selectedItemID={selectedItemID}
      />
    </div>
  );
}

export default React.memo(MenuCard);
