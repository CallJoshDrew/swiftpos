"use client";
import React, { useState, useEffect, useCallback } from "react";
import CategoryCard from "../components/new/categoryCard";
import MenuCard from "../components/new/menuCard.js";
import TableOrderInfo from "../tableOrderInfo/page";
import ConfirmCloseModal from "../components/modal/confirmCloseModal";
import PaymentModal from "../components/modal/paymentModal";
import CheckOutModal from "../components/modal/checkOutModal";

export default function Tables({ menu }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [showEditControls, setShowEditControls] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState(null);

  const [orders, setOrders] = useState([]);
  const [tempCartItems, setTempCartItems] = useState([]);

  const [remarks, setRemarks] = useState(undefined);
  const [tempRemarks, setTempRemarks] = useState(undefined);
  const [remarkRows, setRemarkRows] = useState(1);
  const [showRemarksBtn, setShowRemarksBtn] = useState(false);
  const [showRemarksArea, setShowRemarksArea] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [selectedOrder, setSelectedOrder] = useState({
    orderNumber: "Order Number",
    tableName: "",
    orderType: "Dine-In",
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
    remarks: "No Remarks",
  });

  const [orderCounter, setOrderCounter] = useState(1);

  // State variables related to modals
  const [isPayModalOpen, setPayModalOpen] = useState(false); // Controls whether the payment modal is open
  const [isConfirmCloseModal, setIsConfirmCloseModal] = useState(false);
  const [isCheckOutModalOpen, setCheckOutModalOpen] = useState(false); // Controls whether the checkout modal is open

  useEffect(() => {
    fetch("/api/tableNames")
      .then((response) => response.json())
      .then((data) => setTables(data));
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

  const findOrder = (orderNumber) => {
    if (Array.isArray(orders)) {
      return orders.find((order) => order.orderNumber === orderNumber);
    }
  };

  const determineButtonStyle = (table, order, index) => {
    let buttonStyle = "bg-white text-black";
    if (index === tableNumber) {
      buttonStyle = "bg-green-800 text-white";
    } else if (table.occupied === true && order && order.status === "Completed") {
      buttonStyle = "bg-white text-black";
    } else if (table.occupied === true && order && order.status === "Check Out") {
      buttonStyle = "bg-gray-500 text-white";
    } else if (table.occupied === true && order && order.status === "Paid") {
      buttonStyle = "bg-gray-500 text-white";
    } else if (table.occupied === true) {
      buttonStyle = "bg-yellow-500 text-white";
    }
    return buttonStyle;
  };

  const displayTableStatus = (table, order) => {
    let tableStatus = "Empty";

    if (table.occupied) {
      tableStatus = "Seated";
      //   console.log(order.status);
      if (order && order.status === "Paid") {
        switch (order.paymentMethod) {
          case "Cash":
            tableStatus = "Paid by Cash";
            break;
          case "Boost":
            tableStatus = "Paid by Boost";
            break;
          default:
            tableStatus = "Paid";
            break;
        }
      }
    }
    return tableStatus;
  };

  const selectedTable = (tableIndex) => {
    setTableNumber(tableIndex);
    let orderNumber = tables[tableIndex].orderNumber;
    const generatedOrderID = (tableName) => {
      const paddedCounter = String(orderCounter).padStart(4, "0");
      orderNumber = `#${tableName}-${paddedCounter}`;
      // console.log("Calling OrderNumber after generatedOrderID", orderNumber);
      setOrderCounter((prevOrderCounter) => prevOrderCounter + 1);
    };
    if (tables[tableIndex].occupied) {
      // Find the order with the same orderNumber as the occupied table
      const existingOrder = orders.find(
        (order) => order.orderNumber === tables[tableIndex].orderNumber
      );
      setSelectedOrder(existingOrder);
      setTempCartItems(existingOrder.items);
      // have to set to true evertime and then use useEffect to set it false.
      setShowEditBtn(true);
    //   setRemarks((prevRemarks) => selectedOrder.remarks);
    } else {
      generatedOrderID(tables[tableIndex].name);
      setSelectedOrder((prevSelectedOrder) => ({
        orderNumber,
        tableName: tables[tableIndex].name,
        orderType: "Dine-In",
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
        remarks: "No Remarks",
      }));
      setTempCartItems([]);
      setTables((prevTables) =>
        prevTables.map((table, index) =>
          index === tableIndex
            ? { ...table, orderNumber, occupied: true, name: tables[tableIndex].name }
            : table
        )
      );
      // This is when no items added
      setShowMenu(true);
      setShowEditBtn(false);
    //   console.log("set to false from table when status is status");
      setShowEditControls(true);
    }
  };

  useEffect(() => {
    if (
        selectedOrder &&
        (selectedOrder.status === "Paid" ||
          selectedOrder.status === "Completed" ||
          selectedOrder.status === "Cancelled")
      ) {
        setShowEditBtn(false);
        // console.log("Set to false from useEffect");
      }
  }, [selectedOrder])

  

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
              setSelectedOrder={setSelectedOrder}
              tables={tables}
              setTables={setTables}
              setShowEditBtn={setShowEditBtn}
              setShowEditControls={setShowEditControls}
              tempCartItems={tempCartItems}
              setTempCartItems={setTempCartItems}
              setIsConfirmCloseModal={setIsConfirmCloseModal}
              setShowRemarksBtn={setShowRemarksBtn}
              setShowRemarksArea={setShowRemarksArea}
              remarks={remarks}
              tempRemarks={tempRemarks}
            />
          </div>
          <div className="mt-[130px] px-4">
            <MenuCard
              menu={menu}
              selectedCategory={selectedCategory}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              setShowEditBtn={setShowEditBtn}
              setShowEditControls={setShowEditControls}
              tempCartItems={tempCartItems}
              setTempCartItems={setTempCartItems}
              setShowRemarksBtn={setShowRemarksBtn}
            />
          </div>
        </div>
      ) : (
        // If the menu is not shown, render the table selection interface
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-10">
          <div className="pb-1 ml-2 text-lg text-gray-800 font-medium">Select Table</div>
          <div className="grid grid-cols-3 gap-9 grid-rows-6 ">
            {tables.map((table, index) => {
              let order = findOrder(table.orderNumber);
              let buttonStyle = determineButtonStyle(table, order, index);
              let tableStatus = displayTableStatus(table, order);

              return (
                <button
                  key={index}
                  className={`${buttonStyle} rounded-lg items-center flex justify-center flex-col py-3 shadow-md`}
                  onClick={() => selectedTable(index)}>
                  <div className="text-md ">Table {index + 1}</div>
                  <div className="text-sm ">
                    <div className="text-sm ">{tableStatus}</div>
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
          showEditControls={showEditControls}
          setShowEditControls={setShowEditControls}
          orders={orders}
          setOrders={setOrders}
          tempCartItems={tempCartItems}
          setTempCartItems={setTempCartItems}
          setPayModalOpen={setPayModalOpen}
          setCheckOutModalOpen={setCheckOutModalOpen}
          remarks={remarks}
          setRemarks={setRemarks}
          tempRemarks={tempRemarks}
          setTempRemarks={setTempRemarks}
          remarkRows={remarkRows}
          setRemarkRows={setRemarkRows}
          showRemarksBtn={showRemarksBtn}
          setShowRemarksBtn={setShowRemarksBtn}
          showRemarksArea={showRemarksArea} 
          setShowRemarksArea={setShowRemarksArea}
        />
      )}
      <ConfirmCloseModal
        isConfirmCloseModal={isConfirmCloseModal}
        setIsConfirmCloseModal={setIsConfirmCloseModal}
        setShowMenu={setShowMenu}
        setShowEditBtn={setShowEditBtn}
        setShowEditControls={setShowEditControls}
        tempCartItems={tempCartItems}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        setTables={setTables}
        setOrderCounter={setOrderCounter}
        setShowRemarksBtn={setShowRemarksBtn}
        setShowRemarksArea={setShowRemarksArea}
        remarks={remarks}
        setRemarks={setRemarks}
        tempRemarks={tempRemarks}
      />
      <PaymentModal
        isPayModalOpen={isPayModalOpen}
        setPayModalOpen={setPayModalOpen}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        orders={orders}
        setOrders={setOrders}
        setShowEditBtn={setShowEditBtn}
        setTables={setTables}
      />
      <CheckOutModal
        isCheckOutModalOpen={isCheckOutModalOpen}
        setCheckOutModalOpen={setCheckOutModalOpen}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        setTempCartItems={setTempCartItems}
        setOrders={setOrders}
        setTables={setTables}
      />
    </>
  );
}
