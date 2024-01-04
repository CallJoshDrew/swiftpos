import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function MenuItem({ item, setTempCartItems, handleSelectedItem }) {
  const handleAddtoCartBtn = () => {
    // Check if the item has choices, meat, or addOn properties
    if (item.choices || item.meat || item.addOn) {
      // If it does, handle the selected item (this could be a separate function that handles these types of items)
      handleSelectedItem(item);
    } else {
      // If the item doesn't have choices, meat, or addOn properties, we'll handle it here
      setTempCartItems((prevItems) => {
        // Check if the item is already in the cart
        const existingCartItem = prevItems.items.find((cartItem) => cartItem.id === item.id);
        if (existingCartItem) {
          // If the item is already in the cart, we'll increase its quantity by 1
          return {
            ...prevItems,
            items: prevItems.items.map((cartItem) =>
              cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ),
          };
        } else {
          // If the item is not in the cart, we'll add it to the cart with a quantity of 1
          return { ...prevItems, items: [...prevItems.items, { ...item, quantity: 1 }] };
        }
      });
      // Show a success message to the user
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
      className="flex flex-col items-center relative rounded-lg bg-white border-2 border-gray-100 shadow-sm cursor-pointer pt-3 h-[200px]">
      <Image
        src={item.image}
        alt={item.name}
        as="image"
        width="100"
        height="100"
        className="h-24 w-32 object-cover rounded-lg"
      />
      <div className="flex flex-col flex-start w-full px-3 py-1">
        <div className="text-xs text-gray-600">{item.name}</div>
        <div className="text-green-800 text-xs">RM {item.price.toFixed(2)}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-2 pb-2">
        <button
          className="block bg-[#cce9d4] text-black text-xs py-2 rounded-md w-full hover:bg-green-700 hover:text-white"
          onClick={() => handleAddtoCartBtn()}>
          Add to table
        </button>
      </div>
    </div>
  );
}

export default React.memo(MenuItem);
