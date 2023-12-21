"use client";
import React, { useState, useEffect, useCallback } from "react";
import TableOrderDetails from "../components/tableOrderDetails";
import CategoryCard from "../components/categoryCard";
import MenuCard from "../components/menuCard";
import PaymentModal from "../components/paymentModal";
import ConfirmModal from "../components/confirmModal";

export default function TablesOverview() {
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
  const [selectedOrder, setSelectedOrder]= useState([])

  // Modal related states
  const [isModalOpen, setModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [isMsgModalOpen, setMsgModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Table related states
  const [tables, setTables] = useState(
    Array.from({ length: 18 }, () => ({
      occupied: false,
      orderNumber: null,
      order: [],
    }))
  );
  const [selectedTable, setSelectedTable] = useState(null);
  // console.log(orders);

  // Modal related functions
  const handlePaymentClick = (selectedOrderID) => () => {
    setSelectedOrder(orders.find((order) => order.orderNumber === selectedOrderID));
    setModalOpen(true);
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
          orderNumber: tables[tableIndex].order.orderNumber,
        }));  
        setSelectedOrder(tables[tableIndex].order); // Set the selected order
        setCartItems(itemsWithOrderID);
        setShowEditBtn(false);
      } else {
        setSelectedOrder(null); // Clear the selected order
        setCartItems([]);
      }
    },
    [tables]
  );
   // dependencies

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
            <CategoryCard
              menu={menu}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              cartItems={cartItems}
              setCartItems={setCartItems}
              setShowEditBtn={setShowEditBtn}
              setMessage={setMessage} 
              setMsgModalOpen={setMsgModalOpen}
              setShowMenu={setShowMenu}
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
      <TableOrderDetails
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
        selectedOrder={selectedOrder}
        handlePaymentClick={handlePaymentClick}
        paymentStatus={paymentStatus}
      />
      <PaymentModal
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
        selectedOrder={selectedOrder}
        setPaymentStatus={setPaymentStatus}
        orders={orders}
        setOrders={setOrders}
      />
      <ConfirmModal
        message={message}
        isOpenMsg={isMsgModalOpen}
        onCloseMsg={handleMsgModalClose}
        setShowMenu={setShowMenu}
        setShowEditBtn={setShowEditBtn}
        setOrderCompleted={setOrderCompleted}
      />
    </>
  );
}
