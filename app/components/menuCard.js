"use client";
import React, { useState, useEffect } from "react";
import SelectionModal from "./selectionModal";
import MenuItem from "./menuItem";

function MenuCard({ menu, selectedCategory, tempCartItems, setTempCartItems }) {
  const [isSelectionModalOpen, setSelectionModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [selectedMeatLevel, setSelectedMeatLevel] = useState("");
  const [selectedAddOn, setSelectedAddOn] = useState("");
  const handleSelectedItem = (item) => {
    setSelectedItem(item);
    setSelectedChoice(item.choices?.[0] || "");
    setSelectedMeatLevel(item.meat?.[0] || "");
    setSelectedAddOn(item.addOn?.[0] || "");
    setSelectionModalOpen(true);
};

  if (selectedCategory !== "All") {
    menu = menu.filter((item) => item.category === selectedCategory);
  }
  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  return (
    <div className="grid grid-cols-3 gap-2">
      {menu.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          setTempCartItems={setTempCartItems}
          handleSelectedItem={handleSelectedItem}
        />
      ))}
      <SelectionModal
        isSelectionModalOpen={isSelectionModalOpen}
        setSelectionModalOpen={setSelectionModalOpen}
        tempCartItems={tempCartItems}
        setTempCartItems={setTempCartItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        selectedChoice={selectedChoice}
        setSelectedChoice={setSelectedChoice}
        selectedMeatLevel={selectedMeatLevel}
        setSelectedMeatLevel={setSelectedMeatLevel}
        selectedAddOn={selectedAddOn}
        setSelectedAddOn={setSelectedAddOn}
      />
    </div>
  );
}

export default React.memo(MenuCard);
