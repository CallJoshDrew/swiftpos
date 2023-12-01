"use client";
import { useEffect, useState } from "react";
import CartDetails from "../components/cartDetails";
import MenuCard from "../components/menuCard";

function CategoryButton({
  category,
  itemCount,
  selectedCategory,
  setSelectedCategory,
}) {
  const isSelected = selectedCategory === category;
  return (
    <button
      className={`rounded-lg flex items-center justify-center flex-col py-4 ${
        isSelected ? "bg-green-700 text-white" : "bg-white text-black"
      }`}
      onClick={() => setSelectedCategory(category)}>
      <div className="text-lg">{category}</div>
      <div className="text-xs">{itemCount} items</div>
    </button>
  );
}

export default function TakeAway() {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [taxRate, setTaxRate] = useState(0.1);
  const [selectMenu, setSelectMenu] = useState(false);
  console.log("Calling from TakeAway", cartItems); // Should log []

  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data));
  }, []);

  let itemCounts = menu.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

  console.log(itemCounts);

  return (
    <>
      {selectMenu ? (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10 px-4">
          <div className="grid grid-cols-5 grid-rows-1 gap-4">
            <CategoryButton
              category="All"
              itemCount={menu.length}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <CategoryButton
              category="Main"
              itemCount={itemCounts["Main"] || 0}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <CategoryButton
              category="Drinks"
              itemCount={itemCounts["Drinks"] || 0}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <CategoryButton
              category="Cakes"
              itemCount={itemCounts["Cakes"] || 0}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          {/* card begins here */}
          <MenuCard
            menu={menu}
            selectedCategory={selectedCategory}
            cartItems={cartItems}
            setCartItems={setCartItems}
            isOrderPlaced={isOrderPlaced}
          />
        </div>
      ) : (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-4 ">
          <div className="pb-1 ml-2 text-lg text-green-800 font-bold">
            Today Order
          </div>
          <div className="rounded-lg overflow-hidden border shadow-sm">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-green-800 text-white text-center">
                  <th className="px-4 py-4 border-b font-light">ID</th>
                  <th className="px-4 py-4 border-b font-light text-left">
                    P.0.
                  </th>
                  <th className="px-4 py-4 border-b font-light">Price</th>
                  <th className="px-4 py-4 border-b font-light">Qty</th>
                  <th className="px-4 py-4 border-b font-light">When</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white text-gray-600 text-center hover:bg-gray-200 transition-colors duration-200">
                    <td className="border px-4 py-2">{item.id}</td>
                    <td className="border px-4 py-2 text-left">{item.name}</td>
                    <td className="border px-4 py-2">
                      RM {(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">{item.orderTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <CartDetails
        cartItems={cartItems}
        setCartItems={setCartItems}
        taxRate={taxRate}
        isOrderPlaced={isOrderPlaced}
        setIsOrderPlaced={setIsOrderPlaced}
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      />
    </>
  );
}
