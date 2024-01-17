import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function MenuItem({ item, setSelectedOrder, handleItemSelection }) {
  const handleAddtoCartBtn = () => {
    // Check if the item has choices, meat, or addOn properties
    if (item.selection === true) {
        console.log("true");
      // If it does, handle the selected item
      handleItemSelection(item);
    } else {
      // If the item doesn't have choices, meat, or addOn properties, we'll handle it here
      setSelectedOrder((prevOrder) => {
        // Check if the item is already in the order
        const existingOrderItem = prevOrder.items.find(
          (orderItem) => orderItem.item.id === item.id
        );
        if (existingOrderItem) {
          // If the item is already in the order, increase its quantity by 1
          return {
            ...prevOrder,
            items: prevOrder.items.map((orderItem) =>
              orderItem.item.id === item.id
                ? { ...orderItem, quantity: orderItem.quantity + 1 }
                : orderItem
            ),
          };
        } else {
          // If the item is not in the order, add it to the order with a quantity of 1
          return { ...prevOrder, items: [...prevOrder.items, { item, quantity: 1 }] };
        }
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
