"use client";
import React, { useState, useEffect } from "react";
import TableDetails from "../components/tableDetails";
import MenuCard from "../components/menuCard";
import CategoryButton from "../components/categoryButton";

export default function Tables() {
  const [showMenu, setShowMenu] = useState(false);
  const [taxRate, setTaxRate] = useState(0.1);
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [showEditBtn, setShowEditBtn] = useState(true);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const [orderCounter, setOrderCounter] = useState(1);
  const [orders, setOrders] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [orderTime, setOrderTime] = useState("");
  const [selectedOrderID, setSelectedOrderID] = useState(null);

  const [tables, setTables] = useState(
    Array.from({ length: 12 }, () => ({
      occupied: false,
      orderID: null,
      order: [],
    }))
  );
  const [selectedTable, setSelectedTable] = useState(null);

  const selectTable = (tableIndex) => {
    setSelectedTable(tableIndex);
    // Only show the menu if the table is occupied
    if (tables[tableIndex].occupied) {
      setOrderCompleted(true);
    } else {
      setOrderCompleted(false);
      setShowMenu(true);
      setShowEditBtn(true);
    }
  
    if (tables[tableIndex].order && tables[tableIndex].order.items) {
      // Add the order ID to each item
      const itemsWithOrderID = tables[tableIndex].order.items.map((item) => ({
        ...item,
        orderID: tables[tableIndex].order.id,
      }));
  
      // Update the cart items
      setSelectedOrderID(tables[tableIndex].order.id);
      setCartItems(itemsWithOrderID);
      setShowEditBtn(false);
    } else {
      // Reset cartItems and selectedOrderID when an empty table is selected
      setSelectedOrderID(null);
      setCartItems([]);
    }
  };
  

  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data));
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    if (today !== currentDate) {
      setOrderCounter(1);
      setCurrentDate(today);
    }
  }, [currentDate]);

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
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10 px-4 ">
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
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-10">
          <div className="pb-1 ml-2 text-lg text-gray-800 font-medium">
            Select Table
          </div>
          <div className="grid grid-cols-3 gap-10 grid-rows-5 ">
            {tables.map((table, index) => (
              <button
                key={index}
                className={`${
                  index === selectedTable
                    ? "bg-green-800 text-white"
                    : table.occupied === false
                    ? "bg-white text-black"
                    : "bg-yellow-500 text-white"
                } rounded-lg items-center flex justify-center flex-col py-3 shadow-md`}
                onClick={() => selectTable(index)}>
                <div className="text-md ">Table {index + 1}</div>
                <div className="text-sm ">
                  {table.occupied ? "Seated" : "Empty"}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <TableDetails
        tables={tables}
        setTables={setTables}
        tableNumber={selectedTable + 1}
        cartItems={cartItems}
        setCartItems={setCartItems}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        taxRate={taxRate}
        showEditBtn={showEditBtn}
        setShowEditBtn={setShowEditBtn}
        orderCompleted={orderCompleted}
        setOrderCompleted={setOrderCompleted}
        orderCounter={orderCounter}
        setOrderCounter={setOrderCounter}
        setOrders={setOrders}
        orderID={selectedOrderID}
        setSelectedOrderID={setSelectedOrderID}
        orderTime={orderTime}
        setOrderTime={setOrderTime}
      />
    </>
  );
}
