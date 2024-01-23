"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function MenuItem({ item, selectedOrder, setSelectedOrder, handleItemSelection, setShowEditBtn, tempCartItems, setTempCartItems }) {
    const handleAddtoCartBtn = () => {
    // Check if the item is already in the order
    const existingOrderItem = selectedOrder.items.find(
      (orderItem) => orderItem.item.id === item.id
    );
    if (item.selection === true) {
      // If item.selection is true, handle the selected item
      handleItemSelection(item);
    } else if (existingOrderItem) {
      // If item.selection is false and existingOrderItem is true, increase its quantity by 1
      setSelectedOrder((prevOrder) => {
        return {
          ...prevOrder,
          items: prevOrder.items.map((orderItem) =>
            orderItem.item.id === item.id
              ? { ...orderItem, quantity: orderItem.quantity + 1 }
              : orderItem
          ),
        };
      });
    } else {
      // If item.selection is false and existingOrderItem is false, add it to the order with a quantity of 1
      setSelectedOrder((prevOrder) => {
        return { ...prevOrder, items: [...prevOrder.items, { item, quantity: 1 }] };
      });
      toast.success("Added to Cart!", {
        duration: 1000,
        position: "top-left",
        reverseOrder: false,
      });
    }
  };
  
  return (
    <div
      key={item.id}
      className="flex flex-col items-center relative rounded-lg bg-white border-2 border-gray-100 shadow-sm cursor-pointer pt-3 h-[165px]"
      onClick={() => handleAddtoCartBtn()}>
      <Image
        src={item.image}
        alt={item.name}
        as="image"
        width="100"
        height="100"
        className="h-24 w-32 object-cover rounded-lg"
      />
      <div className="flex flex-col flex-start w-full px-3 py-1">
        <div className="text-sm text-gray-600">{item.name}</div>
        <div className="text-green-800 text-xs">RM {item.price.toFixed(2)}</div>
      </div>
    </div>
  );
}
export default React.memo(MenuItem);
