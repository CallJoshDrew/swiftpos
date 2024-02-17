"use client";
import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { ordersAtom } from "../atoms/ordersAtom";
import { selectedTableOrderAtom } from "../atoms/selectedTableOrderAtom";
import { selectedTakeAwayOrderAtom } from "../atoms/selectedTakeAwayOrderAtom";

function MenuItem({ item, orderType, handleItemSelection, setShowRemarksBtn }) {
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

  // Helper function to update orders
  const updateOrders = (prevOrders, updatedOrder) => {
    const orderIndex = prevOrders.findIndex(
      (order) => order.orderNumber === updatedOrder.orderNumber
    );
    // -1 means the orderNumber is not found in orders array. Then it will add new array which is the updatedOrder.
    if (orderIndex === -1) {
      return [...prevOrders, updatedOrder];
    } else {
      // if founded, add the prevOrders key value into the updatedOrders.
      const updatedOrders = [...prevOrders];
      updatedOrders[orderIndex] = updatedOrder;
      return updatedOrders;
    }
  };
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
        // Find the item and increase its quantity
        const updatedItems = prevOrder.items.map((orderItem) =>
          orderItem.item.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
        const updatedItem = updatedItems.find((orderItem) => orderItem.item.id === item.id);
        // Filter out the updated item from the array
        const remainingItems = updatedItems.filter((orderItem) => orderItem.item.id !== item.id);
        // Add the updated item at the beginning of the array
        const newOrder = {
          ...prevOrder,
          items: [updatedItem, ...remainingItems],
        };
        setOrders((prevOrders) => updateOrders(prevOrders, newOrder));
        return newOrder;
      });
      setShowRemarksBtn(true);
      toast.success("Added to cart!", {
        duration: 500,
        position: "top-center",
        reverseOrder: false,
      });
    } else {
      // If item.selection is false and existingOrderItem is false, add it to the order with a quantity of 1
      setSelectedOrder((prevOrder) => {
        const newOrder = { ...prevOrder, items: [{ item, quantity: 1 }, ...prevOrder.items] };
        setOrders((prevOrders) => updateOrders(prevOrders, newOrder));
        return newOrder;
      });
      setShowRemarksBtn(true);
      toast.success("Added to cart!", {
        duration: 500,
        position: "top-center",
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
