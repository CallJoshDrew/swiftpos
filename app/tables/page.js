"use client";
import React, { useState, useEffect } from "react";
import TableDetails from "../components/tableDetails";
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

export default function Tables() {
  const [selectedTable, setSelectedTable] = useState("1");
  const [showMenu, setShowMenu] = useState(false);
  const [taxRate, setTaxRate] = useState(0.1);
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [showEditBtn, setShowEditBtn] = useState(true);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [orderCounter, setOrderCounter] = useState(1);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data));
  }, []);

  let itemCounts = menu.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

  const handleCloseMenu = () => {
    setShowMenu(false);
    setCartItems([]);
  };

  return (
    <>
      {showMenu ? (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10 px-4">
          <div className="flex justify-between w-full">
            <div className="pb-1 ml-2 text-lg text-green-800 font-bold">
              Our Menu
            </div>
            <button
              className="text-xs py-2 px-4 bg-red-700 text-white rounded-md"
              onClick={() => handleCloseMenu()}>
              x Close Menu
            </button>
          </div>
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
            showEditBtn={showEditBtn}
          />
        </div>
      ) : (
        <div className="bg-gray-200 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-10">
          <div className="text-lg p-2 mb-1 font-medium text-black">
            Select Table
          </div>
          <div className="grid grid-cols-3 gap-10 grid-rows-5 ">
            <button
              className="group hover:bg-green-800 bg-yellow-500 rounded-lg text-white flex items-center justify-center flex-col py-4"
              onClick={() => setSelectedTable("1")}>
              <div className="text-md group-hover:text-white">Table 1</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("2")}>
              <div className="text-md group-hover:text-white">Table 2</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("3")}>
              <div className="text-md group-hover:text-white">Table 3</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("4")}>
              <div className="text-md group-hover:text-white">Table 4</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("5")}>
              <div className="text-md group-hover:text-white">Table 5</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("6")}>
              <div className="text-md group-hover:text-white">Table 6</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("7")}>
              <div className="text-md group-hover:text-white">Table 7</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("8")}>
              <div className="text-md group-hover:text-white">Table 8</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("9")}>
              <div className="text-md group-hover:text-white">Table 9</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("10")}>
              <div className="text-md group-hover:text-white">Table 10</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("11")}>
              <div className="text-md group-hover:text-white">Table 11</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white  items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("12")}>
              <div className="text-md group-hover:text-white">Table 12</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
          </div>
        </div>
      )}
      <TableDetails
        table={selectedTable}
        cartItems={cartItems}
        setCartItems={setCartItems}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        taxRate={taxRate}
        showEditBtn={showEditBtn}
        setShowEditBtn={setShowEditBtn}
        orderCompleted={orderCompleted}
        setOrderCompleted={setOrderCompleted}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        orderCounter={orderCounter}
        setOrderCounter={setOrderCounter}
        setOrders={setOrders}
      />
    </>
  );
}
