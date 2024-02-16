"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { ordersAtom } from "../components/atoms/ordersAtom";
import { tablesAtom } from "../components/atoms/tablesAtom";
import { fetchTablesAtom } from "../components/atoms/tablesAtom";
import { tableOrderCountAtom } from "../components/atoms/tableOrderCount";
import { isLinkDisabledAtom } from "../components/atoms/linkDisableAtom";
import { selectedTableOrderAtom } from "../components/atoms/selectedTableOrderAtom";

import CategoryCard from "../components/new/categoryCard";
import MenuCard from "../components/new/menuCard.js";
import ConfirmCloseModal from "../components/modal/confirmCloseModal";
import PaymentModal from "../components/modal/paymentModal";
import CheckOutModal from "../components/modal/checkOutModal";
import CancelModal from "../components/modal/cancelModal";
import OrderDetails from "../components/new/orderDetails";

export default function Tables({ menu }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(true);
  const [showEditControls, setShowEditControls] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [tableNumber, setTableNumber] = useState(null);

  const [, fetchTables] = useAtom(fetchTablesAtom);
  const [tables, setTables] = useAtom(tablesAtom);
  const [orders, setOrders] = useAtom(ordersAtom);
  const [orderCounter, setOrderCounter] = useAtom(tableOrderCountAtom);
  const [, setIsLinkDisabled] = useAtom(isLinkDisabledAtom);
  const [selectedOrder, setSelectedOrder] = useAtom(selectedTableOrderAtom);

  const [tempCartItems, setTempCartItems] = useState([]);

  const [remarks, setRemarks] = useState(undefined);
  const [tempRemarks, setTempRemarks] = useState(undefined);
  const [remarkRows, setRemarkRows] = useState(1);
  const [showRemarksBtn, setShowRemarksBtn] = useState(false);
  const [showRemarksArea, setShowRemarksArea] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  // State variables related to modals
  const [isPayModalOpen, setPayModalOpen] = useState(false); // Controls whether the payment modal is open
  const [isConfirmCloseModal, setIsConfirmCloseModal] = useState(false);
  const [isCheckOutModalOpen, setCheckOutModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  useEffect(() => {
    fetchTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update the order counter when the date changes
  // It only runs when the parent or this component render, unless setCurrentDate is used in another component.
  useEffect(() => {
    // Define the function that checks the date and updates state
    const checkDate = () => {
      const today = new Date().toDateString();
      if (today !== currentDate) {
        setOrderCounter(1);
        setCurrentDate(today);
      }
    };
    // Run the check immediately when the component mounts
    checkDate();
    // Then set up the interval to run the check every hour
    const interval = setInterval(checkDate, 3600000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentDate, setOrderCounter]);

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
    if (!tables) {
      console.error("Tables is undefined");
    } else {
      console.log(tables);
    }
    setSelectedCategory("All");
    setTableNumber(tableIndex);
    let orderNumber = tables[tableIndex].orderNumber;
    const generatedOrderID = (tableName) => {
      const paddedCounter = String(orderCounter).padStart(4, "0");
      let tableNameWithoutSpace = tableName.replace(/\s/g, "");
      orderNumber = `#${tableNameWithoutSpace}-${paddedCounter}`;
      // console.log("Calling OrderNumber after generatedOrderID", orderNumber);
      setOrderCounter((prevOrderCounter) => prevOrderCounter + 1);
    };
    if (tables[tableIndex].occupied) {
      // Find the order with the same orderNumber as the occupied table
      const existingOrder = orders.find(
        (order) => order.orderNumber === tables[tableIndex].orderNumber
      );
      if (existingOrder) {
        setSelectedOrder(existingOrder);
        setTempCartItems(existingOrder.items);
        // have to set to true evertime and then use useEffect to set it false.
        setShowEditBtn(true);
        setShowEditControls(false);
        //   setRemarks((prevRemarks) => selectedOrder.remarks);
      } else {
        console.error("No order found with orderNumber:", tables[tableIndex].orderNumber);
        // Handle the case when no existing order is found
        setTables((prevTables) => {
          return prevTables.map((table) => {
            if (table.orderNumber === selectedOrder?.orderNumber) {
              const { orderNumber, occupied, ...rest } = table;
              return rest;
            } else {
              return table;
            }
          });
        });
        setOrderCounter((prevOrderCounter) => prevOrderCounter - 1);
        setSelectedOrder((prevSelectedOrder) => ({
          ...prevSelectedOrder,
          orderNumber: "Order Number",
          tableName: "",
          items: [],
        }));
      }
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
        paymentMethod: "",
        remarks: "No Remarks",
      }));
      setTempCartItems([]);
      setTables((prevTables) =>
        prevTables.map((table, index) =>
          index === tableIndex
            ? {
                ...table,
                orderNumber,
                occupied: true,
                name: tables[tableIndex].name,
              }
            : table
        )
      );
      setIsLinkDisabled(true);
      // This is when no items added
      setShowMenu(true);
      setShowEditBtn(false);
      //   console.log("set to false from table when status is status");
      setShowEditControls(true);
    }
  };
  const getFormattedTime = () => {
    const now = new Date();
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kuala_Lumpur",
    };
    const timeString = now.toLocaleTimeString("en-US", timeOptions);
    return { timeString };
  };

  const handleCancelStatus = (orderNumber) => {
    const { timeString } = getFormattedTime();
    setCancelModalOpen(false);
    setOrders(
      orders.map((order) =>
        order.orderNumber === orderNumber
          ? { ...order, status: "Cancelled", cancellationTime: timeString }
          : order
      )
    );
    setTables((prevTables) => {
      return prevTables.map((table) => {
        if (table.orderNumber === orderNumber) {
          const { orderNumber, occupied, ...rest } = table;
          // extracting the orderNumber and occupied properties from the table object and assigning them to
          // new variables with the same names
          return rest;
          // returns a new object rest that doesn’t include the orderNumber and occupied properties.
        } else {
          return table;
        }
      });
    });
    setSelectedOrder((prevSelectedOrder) => {
      return {
        ...prevSelectedOrder,
        status: "Cancelled",
        cancellationTime: timeString,
      };
    });
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
  }, [selectedOrder]);
  return (
    <>
      {showMenu ? (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10">
          <div className="relative">
            <CategoryCard
              menu={menu}
              orderType="Dine-In"
              setShowMenu={setShowMenu}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
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
              orderType="Dine-In"
              selectedCategory={selectedCategory}
              setShowEditBtn={setShowEditBtn}
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
                  <div className="text-md ">{table.name}</div>
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
        <OrderDetails
          orderType="Dine-In"
          setShowMenu={setShowMenu}
          showEditBtn={showEditBtn}
          setShowEditBtn={setShowEditBtn}
          showEditControls={showEditControls}
          setShowEditControls={setShowEditControls}
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
          setCancelModalOpen={setCancelModalOpen}
        />
      )}
      <ConfirmCloseModal
        isConfirmCloseModal={isConfirmCloseModal}
        setIsConfirmCloseModal={setIsConfirmCloseModal}
        setShowMenu={setShowMenu}
        setShowEditBtn={setShowEditBtn}
        setShowEditControls={setShowEditControls}
        tempCartItems={tempCartItems}
        orderType="Dine-In"
        setShowRemarksBtn={setShowRemarksBtn}
        setShowRemarksArea={setShowRemarksArea}
        remarks={remarks}
        setRemarks={setRemarks}
        tempRemarks={tempRemarks}
      />
      <PaymentModal
        isPayModalOpen={isPayModalOpen}
        setPayModalOpen={setPayModalOpen}
        orderType="Dine-In"
        setShowEditBtn={setShowEditBtn}
      />
      <CheckOutModal
        isCheckOutModalOpen={isCheckOutModalOpen}
        setCheckOutModalOpen={setCheckOutModalOpen}
        setTempCartItems={setTempCartItems}
        orderType="Dine-In"
      />
      <CancelModal
        isCancelModalOpen={isCancelModalOpen}
        setCancelModalOpen={setCancelModalOpen}
        handleCancelStatus={handleCancelStatus}
        orderType="Dine-In"
      />
    </>
  );
}
