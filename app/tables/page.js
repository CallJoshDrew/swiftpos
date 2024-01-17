"use client";
import React, { useState, useEffect, useCallback } from "react";
import CategoryCard from "../components/new/categoryCard";
import MenuCard from "../components/new/menuCard.js";
import TableOrderInfo from "../tableOrderInfo/page";

export default function Tables({ menu }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [selectedOrder, setSelectedOrder] = useState({
    orderNumber: "Order Number",
    tableName: "",
    orderTime: null,
    orderDate: null,
    status: "Status",
    items: [],
    subTotal: 0,
    serviceCharge: 0,
    totalPrice: 0,
    quantity: 0,
    payment: 0,
    paymentMethod: "",
    remarks: "",
  });

  const [orderCounter, setOrderCounter] = useState(1);

  useEffect(() => {
    fetch("/api/tableNames")
      .then((response) => response.json())
      .then((data) => {
        const newTables = data.map((table) => ({
          name: table.name,
          occupied: false,
          orderNumber: null,
          order: [],
        }));
        setTables(newTables);
      });
  }, []);

  // Update the order counter when the date changes
  // It only runs when the parent or this component render, unless setCurrentDate is used in another component.
  useEffect(() => {
    const today = new Date().toDateString();
    if (today !== currentDate) {
      setOrderCounter(1);
      setCurrentDate(today);
    }
  }, [currentDate]);

  const selectedTable = useCallback(
    (tableIndex) => {
      setTableNumber(tableIndex);
      let orderNumber;
      const generatedOrderID = (tableName) => {
        const paddedCounter = String(orderCounter).padStart(4, "0");
        orderNumber = `#${tableName}-${paddedCounter}`;
        setOrderCounter((prevOrderCounter) => prevOrderCounter + 1);
      };
      if (tables[tableIndex].occupied) {
        console.log("Table is Occupied");
        setShowEditBtn(true);
      } else {
        generatedOrderID(tables[tableIndex].name);
        setSelectedOrder((prevSelectedOrder) => ({
          ...prevSelectedOrder,
          orderNumber: orderNumber,
        }));
        setShowMenu(true);
      }
    },
    [tables, orderCounter]
  );

  return (
    <>
      {showMenu ? (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10">
          <div className="relative">
            <CategoryCard
              menu={menu}
              setShowMenu={setShowMenu}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setOrderCounter={setOrderCounter}
              selectedOrder={selectedOrder}
            />
          </div>
          <div className="mt-[130px] px-4">
            <MenuCard
              menu={menu}
              selectedCategory={selectedCategory}
              setSelectedOrder={setSelectedOrder}
            />
          </div>
        </div>
      ) : (
        // If the menu is not shown, render the table selection interface
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-10">
          <div className="pb-1 ml-2 text-lg text-gray-800 font-medium">Select Table</div>
          <div className="grid grid-cols-3 gap-9 grid-rows-6 ">
            {/* Map over the tables and render a button for each one */}
            {tables.map((table, index) => {
              // Determine the button style based on the table's state
              let buttonStyle = "bg-yellow-500 text-white";
              if (index === tableNumber) {
                buttonStyle = "bg-green-800 text-white";
              } else if (table.occupied === false) {
                buttonStyle = "bg-white text-black";
              } else if (table.occupied === true && table.order.payment === "Paid") {
                buttonStyle = "bg-gray-500 text-white";
              }
              return (
                <button
                  key={index}
                  className={`${buttonStyle} rounded-lg items-center flex justify-center flex-col py-3 shadow-md`}
                  onClick={() => selectedTable(index)}>
                  <div className="text-md ">Table {index + 1}</div>
                  <div className="text-sm ">
                    <div className="text-sm ">
                      {/* Display the table's status */}
                      {table.occupied
                        ? table.order.payment === "Paid"
                          ? table.order.paymentMethod === "Cash"
                            ? "Paid by Cash"
                            : table.order.paymentMethod === "Boost"
                            ? "Paid by Boost"
                            : "Paid"
                          : "Seated"
                        : "Empty"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {selectedOrder && (
        <TableOrderInfo
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          tables={tables}
          setTables={setTables}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          showEditBtn={showEditBtn}
          setShowEditBtn={setShowEditBtn}
        />
      )}
    </>
  );
}
