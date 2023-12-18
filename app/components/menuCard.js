import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function MenuItem({
  item,
  cartItems,
  setCartItems,
  isOrderPlaced,
}) {

  const handleClick = () => {
    if (!isOrderPlaced) {
      const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
  
      if (existingCartItem) {
        // If the item is already in the cart, increase its quantity
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
      toast.success("Added to Cart", {
        duration: 2000,
        position:"top-left",
        reverseOrder:false,
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
          onClick={handleClick}>
          Add to table
        </button>
      </div>
    </div>
  );
}

function MenuCard({
  menu,
  selectedCategory,
  cartItems,
  setCartItems,
  isOrderPlaced
}) {
  const [itemCounts, setItemCounts] = useState({});

  if (selectedCategory !== "All") {
    menu = menu.filter((item) => item.category === selectedCategory);
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {menu.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          itemCounts={itemCounts}
          setItemCounts={setItemCounts}
          cartItems={cartItems}
          setCartItems={setCartItems}
          isOrderPlaced={isOrderPlaced}
        />
      ))}
    </div>
  );
}

export default React.memo(MenuCard);