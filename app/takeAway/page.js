"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { ordersAtom } from "../components/atoms/ordersAtom";
import { takeAwayOrderCountAtom } from "../components/atoms/takeAwayOrderCount";

import CategoryCard from "../components/new/categoryCard";
import MenuCard from "../components/new/menuCard";
import ConfirmCloseModal from "../components/modal/confirmCloseModal";
import PaymentModal from "../components/modal/paymentModal";
import CancelModal from "../components/modal/cancelModal";
import OrderDetails from "../components/new/orderDetails";

export default function TakeAwayOverview() {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data));
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const [orders, setOrders] = useAtom(ordersAtom);
  const [orderCounter, setOrderCounter] = useAtom(takeAwayOrderCountAtom);

  const [showEditBtn, setShowEditBtn] = useState(false);
  const [showEditControls, setShowEditControls] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [tempCartItems, setTempCartItems] = useState([]);

  const [remarks, setRemarks] = useState(undefined);
  const [tempRemarks, setTempRemarks] = useState(undefined);
  const [remarkRows, setRemarkRows] = useState(1);
  const [showRemarksBtn, setShowRemarksBtn] = useState(false);
  const [showRemarksArea, setShowRemarksArea] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [selectedOrder, setSelectedOrder] = useState({
    orderNumber: "Order Number",
    orderType: "TakeAway",
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
  });
  // State variables related to modals
  const [isPayModalOpen, setPayModalOpen] = useState(false);
  const [isConfirmCloseModal, setIsConfirmCloseModal] = useState(false);
  const [isCheckOutModalOpen, setCheckOutModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
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

  const handleAddNewOrderBtn = () => {
    setShowMenu(true);
    setSelectedCategory("All");
    setTempCartItems([]);
    setShowMenu(true);
    setShowEditBtn(false);
    setShowEditControls(true);
    let orderNumber;
    const generatedOrderID = () => {
      const paddedCounter = String(orderCounter).padStart(4, "0");
      orderNumber = `#TakeAwy-${paddedCounter}`;
      setOrderCounter((prevOrderCounter) => prevOrderCounter + 1);
    };
    generatedOrderID();
    setSelectedOrder((prevSelectedOrder) => ({
      orderNumber,
      orderType: "TakeAway",
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
  };
  const handleSelectedOrderBtn = (orderNumber) => {
    const order = orders.find((order) => order.orderNumber === orderNumber);
    const itemsWithOrderID = order.items.map((item) => ({
      ...item,
    }));
    setSelectedOrder(order);
    setTempCartItems(itemsWithOrderID);
    if (order.status === "Paid" || order.status === "Completed" || order.status === "Cancelled") {
      setShowEditBtn(false);
      setShowEditControls(false);
    } else {
      setShowEditBtn(true);
      setShowEditControls(false);
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
    setSelectedOrder((prevSelectedOrder) => {
      return {
        ...prevSelectedOrder,
        status: "Cancelled",
        cancellationTime: timeString,
      };
    });
  };
  const takeAwayOrders = [...orders].filter((order) => order.orderType === "TakeAway");
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
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
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
              tempCartItems={tempCartItems}
              setTempCartItems={setTempCartItems}
              setShowRemarksBtn={setShowRemarksBtn}
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-4 z-9">
          <div className="flex justify-between w-full">
            <div className="pb-1 ml-2 text-lg text-green-800 font-bold">Today Order</div>
            <button
              className="text-xs py-2 px-4 bg-green-800 text-white rounded-md"
              onClick={() => handleAddNewOrderBtn()}>
              + New Order
            </button>
          </div>
          <div className="rounded-lg overflow-hidden border shadow-sm">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-green-800 text-white text-center">
                  {/* <th className="px-4 py-4 border-b font-light">No.</th> */}
                  <th className="px-4 py-4 border-b font-light">Order No.</th>
                  <th className="px-4 py-4 border-b font-light">Qty</th>
                  <th className="px-4 py-4 border-b font-light">Price (RM)</th>
                  <th className="px-4 py-4 border-b font-light">Status</th>
                  {/* <th className="px-4 py-4 border-b font-light">Details</th> */}
                </tr>
              </thead>
              <tbody>
                {takeAwayOrders.reverse().map((order, index) => (
                  <tr
                    key={index}
                    className={`${
                      order.orderNumber === selectedOrder.orderNumber ? "bg-gray-100" : "bg-white"
                    } text-gray-600 text-center hover:bg-gray-200 transition-colors duration-200`}
                    onClick={() => handleSelectedOrderBtn(order.orderNumber)}>
                    {/* <td className="border px-4 py-2">{takeAwayOrders.length - index}</td> */}
                    <td className="border px-4 py-2">{order.orderNumber}</td>
                    <td
                      className={`border px-4 py-2 ${
                        order.status === "Cancelled" ? "line-through" : ""
                      }`}>
                      {order.quantity}
                    </td>
                    <td
                      className={`border px-4 py-2 ${
                        order.status === "Cancelled" ? "line-through" : ""
                      }`}>
                      {order.totalPrice.toFixed(2)}
                    </td>

                    <td
                      className={`border px-4 py-2 rounded-md text-sm ${
                        order.status === "Completed" || order.status === "Paid"
                          ? "text-green-800"
                          : order.status === "Cancelled"
                          ? "text-red-700"
                          : order.status === "Placed Order"
                          ? "text-yellow-500"
                          : ""
                      }`}>
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {selectedOrder && (
        <OrderDetails
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
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
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
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
        setShowEditBtn={setShowEditBtn}
      />
      <CancelModal
        isCancelModalOpen={isCancelModalOpen}
        setCancelModalOpen={setCancelModalOpen}
        handleCancelStatus={handleCancelStatus}
        selectedOrder={selectedOrder}
      />
    </>
  );
}
