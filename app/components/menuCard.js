import { useState } from "react";
import Image from "next/image";

function MenuItem({
  item,
  itemCounts,
  setItemCounts,
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
    }
  };
  
  const increaseCount = () => {
    setItemCounts({ ...itemCounts, [item.id]: (itemCounts[item.id] || 1) + 1 });
  };

  const decreaseCount = () => {
    if (itemCounts[item.id] > 0) {
      setItemCounts({ ...itemCounts, [item.id]: itemCounts[item.id] - 1 });
    }
  };

  return (
    <div
      key={item.id}
      className="flex flex-col relative rounded-lg bg-white border-2 border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:border-green-600">
      <Image
        src="/sample.png"
        alt={item.name}
        width="100"
        height="100"
        className="sm:h24 w-32 object-cover m-2 rounded-lg"
      />
      <div className="mb-10 mx-2">
        <div className="text-xs text-gray-600 ml-1">{item.name}</div>
        <div className="block text-green-800 text-xs ml-1">RM {item.price.toFixed(2)}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-2 pb-2">
        <button
          className="block bg-[#cce9d4] text-black text-xs p-1 rounded-md w-full"
          onClick={handleClick}>
          add to table
        </button>
      </div>
    </div>
  );
}

export default function MenuCard({
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
    <div className="group rounded-lg grid grid-cols-3 gap-2">
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
