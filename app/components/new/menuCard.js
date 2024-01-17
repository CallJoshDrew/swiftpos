"use client";
import React, { useState, useEffect } from "react";
import MenuItem from "./menuItem";

function MenuCard({ menu, selectedCategory, setSelectedOrder }) {
  if (selectedCategory !== "All") {
    menu = menu.filter((item) => item.category === selectedCategory);
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {menu.map((item) => (
        <MenuItem key={item.id} item={item} setSelectedOrder={setSelectedOrder}/>
      ))}
    </div>
  );
}

export default React.memo(MenuCard);
