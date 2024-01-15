"use client";
import React, { useState, useEffect, useCallback } from "react";
import TableOrderDetails from "../components/tableOrderDetails";
import CategoryCard from "../components/categoryCard";
import MenuCard from "../components/menuCard";
import PaymentModal from "../components/paymentModal";
import ConfirmModal from "../components/confirmModal";
import CheckOutModal from "../components/checkOutModal";

export default function TablesOverview() {
  // State variables related to the menu
  const [showMenu, setShowMenu] = useState(false); // Controls whether the menu is shown
  const [menu, setMenu] = useState([]); // Stores the menu items
  const [selectedCategory, setSelectedCategory] = useState("All"); // Stores the currently selected category
  const [cartItems, setCartItems] = useState({ orderNumber: null, items: [] });
  const [tempCartItems, setTempCartItems] = useState({ orderNumber: null, items: [] });
  const [showEditBtn, setShowEditBtn] = useState(true); // Controls whether the edit button is shown

  // State variables related to orders
  const [serviceTax, setServiceTax] = useState(0); // Stores the service tax or service charges
  const [orderCompleted, setOrderCompleted] = useState(false); // Indicates whether the order is completed
  const [orderCounter, setOrderCounter] = useState(1);
  const [orders, setOrders] = useState([]); // Stores the orders
  const [currentDate, setCurrentDate] = useState(new Date().toDateString()); // Stores the current date
  const [selectedOrder, setSelectedOrder] = useState([]); // Stores the currently selected order

  // State variables related to modals
  const [isPayModalOpen, setPayModalOpen] = useState(false); // Controls whether the payment modal is open
  const [isMsgModalOpen, setMsgModalOpen] = useState(false); // Controls whether the message modal is open
  const [isCheckOutModalOpen, setCheckOutModalOpen] = useState(false); // Controls whether the checkout modal is open

  // State variables related to remarks
  const [remarks, setRemarks] = useState(undefined);
  const [showRemarksText, setShowRemarksText] = useState(false);
  const [isEditingRemarks, setIsEditingRemarks] = useState(false);
  const [showRemarksBtn, setShowRemarksBtn] = useState(true);
  const [isEmptyString, setEmptyString] = useState(false);

  // State variables related to tables
  const [tables, setTables] = useState(
    Array.from({ length: 18 }, () => ({
      occupied: false,
      orderNumber: null,
      order: [],
    }))
  ); // Stores the tables
  const [tableNumber, setTableNumber] = useState(null); // Stores the currently selected table number

  // Functions related to modals
  const handlePaymentClick = (selectedOrderID) => () => {
    // Find the selected order in the orders array and set it as the selected order
    setSelectedOrder(orders.find((order) => order.orderNumber === selectedOrderID));
    // Open the payment modal
    setPayModalOpen(true);
  };

  const handleMsgModalClose = () => {
    // Close the message modal
    setMsgModalOpen(false);
  };

  const handleCheckOutClick = (selectedOrderID) => () => {
    // Find the selected order in the orders array and set it as the selected order
    setSelectedOrder(orders.find((order) => order.orderNumber === selectedOrderID));
    // Open the checkout modal
    setCheckOutModalOpen(true);
  };

  // Functions related to tables
  const selectedTable = useCallback(
    (tableIndex) => {
      // Set the selected table number
      setTableNumber(tableIndex);
      // If the table is occupied, set orderCompleted to true and hide the menu and edit button
      // If the table is not occupied, set orderCompleted to false and show the menu and edit button
      if (tables[tableIndex].occupied) {
        setOrderCompleted(true);
        // if (tables[tableIndex].order?.remarks) {
        //   setShowRemarksText(true);
        // }
      } else {
        setOrderCompleted(false);
        setShowMenu(true);
        setShowEditBtn(true);
        setShowRemarksText(false);
        setRemarks(undefined);
      }

      // If the table is occupied, show the table info
      if (tables[tableIndex].order && Array.isArray(tables[tableIndex].order.items)) {
        const itemsWithOrderID = tables[tableIndex].order.items.map((item) => ({
          ...item,
        }));
        setSelectedOrder(tables[tableIndex].order);
        if (tables[tableIndex].order.remarks) {
          setShowRemarksText(true);
        }
        setCartItems({
          orderNumber: tables[tableIndex].order.orderNumber,
          items: itemsWithOrderID,
        }); // Set CartItems
        setTempCartItems({
          orderNumber: tables[tableIndex].order.orderNumber,
          items: itemsWithOrderID,
        }); // Also set tempCartItems
        setShowEditBtn(false);
      } else {
        // If the table is not occupied, clear the selected order and cart items
        setSelectedOrder(null);
        setCartItems({ orderNumber: null, items: [] });
        setTempCartItems({ orderNumber: null, items: [] });
      }
    },
    [tables]
  );

  // Fetch the menu data when the component mounts
  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data));
  }, []);

  // Update the order counter when the date changes
  useEffect(() => {
    const today = new Date().toDateString();
    if (today !== currentDate) {
      setOrderCounter(1);
      setCurrentDate(today);
    }
  }, [currentDate]);

  return (
    <>
      {/* // If the menu is shown, render the menu and category cards */}
      {showMenu ? (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10">
          <div className="relative">
            {/* Category card component with various props */}
            <CategoryCard
              menu={menu}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              cartItems={cartItems}
              tempCartItems={tempCartItems}
              setOrderCompleted={setOrderCompleted}
              setShowMenu={setShowMenu}
              setShowEditBtn={setShowEditBtn}
              setMsgModalOpen={setMsgModalOpen}
              setShowRemarksText={setShowRemarksText}
              isEditingRemarks={isEditingRemarks}
              setIsEditingRemarks={setIsEditingRemarks}
              remarks={remarks}
              selectedOrder={selectedOrder}
              setShowRemarksBtn={setShowRemarksBtn}
            />
          </div>
          {/* Menu card component begins here */}
          <div className="mt-[130px] px-4">
            {/* Menu card component with various props */}
            <MenuCard
              menu={menu}
              selectedCategory={selectedCategory}
              tempCartItems={tempCartItems}
              setTempCartItems={setTempCartItems}
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
      <TableOrderDetails
        tables={tables}
        setTables={setTables}
        tableNumber={tableNumber + 1}
        cartItems={cartItems}
        setCartItems={setCartItems}
        tempCartItems={tempCartItems}
        setTempCartItems={setTempCartItems}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        serviceTax={serviceTax}
        showEditBtn={showEditBtn}
        setShowEditBtn={setShowEditBtn}
        orderCompleted={orderCompleted}
        setOrderCompleted={setOrderCompleted}
        orderCounter={orderCounter}
        setOrderCounter={setOrderCounter}
        orders={orders}
        setOrders={setOrders}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        handlePaymentClick={handlePaymentClick}
        handleCheckOutClick={handleCheckOutClick}
        remarks={remarks}
        setRemarks={setRemarks}
        showRemarksText={showRemarksText}
        setShowRemarksText={setShowRemarksText}
        isEditingRemarks={isEditingRemarks}
        setIsEditingRemarks={setIsEditingRemarks}
        showRemarksBtn={showRemarksBtn}
        setShowRemarksBtn={setShowRemarksBtn}
        isEmptyString={isEmptyString}
        setEmptyString={setEmptyString}
      />
      <PaymentModal
        isPayModalOpen={isPayModalOpen}
        setPayModalOpen={setPayModalOpen}
        selectedOrder={selectedOrder}
        orders={orders}
        setOrders={setOrders}
        setSelectedOrder={setSelectedOrder}
        tables={tables}
        setTables={setTables}
      />
      <ConfirmModal
        isOpenMsg={isMsgModalOpen}
        onCloseMsg={handleMsgModalClose}
        setShowMenu={setShowMenu}
        setShowEditBtn={setShowEditBtn}
        setOrderCompleted={setOrderCompleted}
        setTempCartItems={setTempCartItems}
        cartItems={cartItems}
        setIsEditingRemarks={setIsEditingRemarks}
        setShowRemarksText={setShowRemarksText}
        setRemarks={setRemarks}
        remarks={remarks}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        isEmptyString={isEmptyString}
        setEmptyString={setEmptyString}
        setShowRemarksBtn={setShowRemarksBtn}
      />
      <CheckOutModal
        isCheckOutModalOpen={isCheckOutModalOpen}
        setCheckOutModalOpen={setCheckOutModalOpen}
        tables={tables}
        setTables={setTables}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        setTempCartItems={setTempCartItems}
        orders={orders}
        setOrders={setOrders}
      />
    </>
  );
}
