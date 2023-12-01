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
  const [taxRate, setTaxRate] = useState(0.10);
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
        />
      </div>
      <CartDetails cartItems={cartItems} setCartItems={setCartItems} taxRate={taxRate}/>
    </>
  );
}
