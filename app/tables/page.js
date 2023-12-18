"use client";
import React, { useState, useEffect, useCallback } from "react";
import TableDetails from "../components/tableDetails";
import MenuCard from "../components/menuCard";
import CategoryButton from "../components/categoryButton";
import PaymentModal from "../components/paymentModal";
import ConfirmModal from "../components/confirmModal";

export default function Tables() {
  // Menu related states
  const [showMenu, setShowMenu] = useState(false);
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [showEditBtn, setShowEditBtn] = useState(true);

  // Order related states
  const [taxRate, setTaxRate] = useState(0.1);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderCounter, setOrderCounter] = useState(1);
  const [orders, setOrders] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [orderTime, setOrderTime] = useState("");
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [order, setOrder] = useState([]);

  // Modal related states
  const [isModalOpen, setModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [isMsgModalOpen, setMsgModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Table related states
  const [tables, setTables] = useState(
    Array.from({ length: 18 }, () => ({
      occupied: false,
      orderID: null,
      order: [],
    }))
  );
  const [selectedTable, setSelectedTable] = useState(null);

  // Menu related functions
  const handleCloseMenu = () => {
    if (cartItems.length == 0) {
      setShowMenu(false);
      setShowEditBtn(false);
      setCartItems([]);
    } else {
      setMessage("Are you sure?");
      setMsgModalOpen(true);
    }
  };

  // Modal related functions
  const handlePaymentClick = (orderID) => () => {
    setOrder(orders.find((order) => order.id === orderID));
    setSelectedOrderID(orderID);
    setModalOpen(true);
  };

  const handleModalClose = (orderID, paymentStatus) => {
    setModalOpen(false);
    setOrders(
      orders.map((order) =>
        order.id === orderID
          ? { ...order, payment: paymentStatus, status: "Completed" }
          : order
      )
    );
  };

  const handleMsgModalClose = () => {
    setMsgModalOpen(false);
  };

  // Table related functions
  const selectTable = useCallback(
    (tableIndex) => {
      setSelectedTable(tableIndex);
      if (tables[tableIndex].occupied) {
        setOrderCompleted(true);
      } else {
        setOrderCompleted(false);
        setShowMenu(true);
        setShowEditBtn(true);
      }

      if (tables[tableIndex].order && tables[tableIndex].order.items) {
        const itemsWithOrderID = tables[tableIndex].order.items.map((item) => ({
          ...item,
          orderID: tables[tableIndex].order.id,
        }));

        setSelectedOrderID(tables[tableIndex].order.id);
        setCartItems(itemsWithOrderID);
        setShowEditBtn(false);
      } else {
        setSelectedOrderID(null);
        setCartItems([]);
      }
    },
    [tables]
  ); // dependencies

  // Fetch menu data
  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data));
  }, []);

  // Update order counter
  useEffect(() => {
    const today = new Date().toDateString();
    if (today !== currentDate) {
      setOrderCounter(1);
      setCurrentDate(today);
    }
  }, [currentDate]);

  return (
    <>
      {showMenu ? (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10">
          <div className="relative">
            <div className="bg-gray-100 flex justify-between w-3/6 fixed top-0 z-20 px-4 pt-9">
              <div className="pb-1 ml-2 text-lg text-green-800 font-bold">
                Our Menu
              </div>
              <button
                className="text-xs py-2 px-4 bg-red-700 text-white rounded-md z-10"
                onClick={() => handleCloseMenu()}>
                x Close Menu
              </button>
            </div>
            <CategoryButton
              menu={menu}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          {/* card begins here */}
          <div className="mt-[130px] px-4">
            <MenuCard
              menu={menu}
              selectedCategory={selectedCategory}
              cartItems={cartItems}
              setCartItems={setCartItems}
              showEditBtn={showEditBtn}
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-10">
          <div className="pb-1 ml-2 text-lg text-gray-800 font-medium">
            Select Table
          </div>
          <div className="grid grid-cols-3 gap-9 grid-rows-6 ">
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
        handlePaymentClick={handlePaymentClick}
        paymentStatus={paymentStatus}
      />
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        orderID={selectedOrderID}
        order={order}
        selectedTable={selectedTable}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
      />
      <ConfirmModal
        message={message}
        isOpenMsg={isMsgModalOpen}
        onCloseMsg={handleMsgModalClose}
        setShowMenu={setShowMenu}
        setShowEditBtn={setShowEditBtn}
        setCartItems={setCartItems}
      />
    </>
  );
}
