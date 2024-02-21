"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { ordersAtom } from "../components/atoms/ordersAtom";
import { takeAwayOrderCountAtom } from "../components/atoms/takeAwayOrderCountAtom";
import { isLinkDisabledAtom } from "../components/atoms/linkDisableAtom";
import { selectedTakeAwayOrderAtom } from "../components/atoms/selectedTakeAwayOrderAtom";

import CategoryCard from "../components/new/categoryCard";
import MenuCard from "../components/new/menuCard";
import ConfirmCloseModal from "../components/modal/confirmCloseModal";
import PaymentModal from "../components/modal/paymentModal";
import CancelModal from "../components/modal/cancelModal";
import OrderDetails from "../components/new/orderDetails";
import { useRouter } from "next/navigation";
import { todayRegisteredAtom } from "../components/atoms/todayRegisteredAtom";

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
  const [, setIsLinkDisabled] = useAtom(isLinkDisabledAtom);
  const [selectedOrder, setSelectedOrder] = useAtom(selectedTakeAwayOrderAtom);
  const [todayRegistered, setTodayRegistered] = useAtom(todayRegisteredAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [showEditControls, setShowEditControls] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [tempCartItems, setTempCartItems] = useState([]);

  const [remarks, setRemarks] = useState(undefined);
  const [tempRemarks, setTempRemarks] = useState(undefined);
  const [remarkRows, setRemarkRows] = useState(1);
  const [showRemarksBtn, setShowRemarksBtn] = useState(false);
  const [showRemarksArea, setShowRemarksArea] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

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

  const updateOrders = (prevOrders, updatedOrder) => {
    // Find the orderNumber
    const orderIndex = prevOrders.findIndex(
      (order) => order.orderNumber === updatedOrder.orderNumber
    );

    if (orderIndex === -1) {
      return [...prevOrders, updatedOrder];
    } else {
      const updatedOrders = [...prevOrders];
      updatedOrders[orderIndex] = updatedOrder;
      return updatedOrders;
    }
  };
  const handleAddNewOrderBtn = () => {
    // setIsLinkDisabled(true);Debugging now, thus disabled this.
    setShowMenu(true);
    setSelectedCategory("All");
    setTempCartItems([]);
    setShowMenu(true);
    // setShowEditBtn(false);
    setShowEditControls(true);
    let orderNumber;
    const generatedOrderID = () => {
      const paddedCounter = String(orderCounter).padStart(4, "0");
      orderNumber = `#TakeAwy-${paddedCounter}`;
      setOrderCounter((prevOrderCounter) => prevOrderCounter + 1);
    };
    generatedOrderID();
    const newOrder = {
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
      showEditBtn: false,
    };
    setSelectedOrder(newOrder);
    setOrders((prevOrders) => updateOrders(prevOrders, newOrder));
  };
  const handleSelectedOrderBtn = (orderNumber) => {
    const order = orders.find((order) => order.orderNumber === orderNumber);
    const itemsWithOrderID = order.items.map((item) => ({
      ...item,
    }));
    // Add the showEditBtn key to the order object
    order.showEditBtn = true;
    setSelectedOrder(order);
    setTempCartItems(itemsWithOrderID);
  };
  // if (order.status === "Paid" || order.status === "Completed" || order.status === "Cancelled") {
  //   setShowEditBtn(false);
  //   setShowEditControls(false);
  // } else {
  //   setShowEditBtn(true);
  //   setShowEditControls(false);
  // }

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
          ? { ...order, status: "Cancelled", cancellationTime: timeString, showEditBtn: false }
          : order
      )
    );
    setSelectedOrder((prevSelectedOrder) => {
      return {
        ...prevSelectedOrder,
        status: "Cancelled",
        cancellationTime: timeString,
        showEditBtn: false,
      };
    });
  };
  const takeAwayOrders = [...orders].filter((order) => order.orderType === "TakeAway");
  useEffect(() => {
    if (todayRegistered.openForRegister === false) {
      setLoading(true);
      // toast.success("Please Register First", {
      //   duration: 1000,
      //   position: "top-center",
      //   reverseOrder: false,
      // });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [todayRegistered, router]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-w-full min-h-screen flex items-center justify-center z-10">
        <div className="loader ease-linear rounded-full border-4 h-12 w-12 mb-4"></div>
      </div>
    );
  }
  return (
    <>
      {showMenu ? (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10">
          <div className="relative">
            <CategoryCard
              menu={menu}
              orderType="TakeAway"
              setShowMenu={setShowMenu}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
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
              orderType="TakeAway"
              selectedCategory={selectedCategory}
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
                  <th className="px-4 py-4 border-b font-light">Order No.</th>
                  <th className="px-4 py-4 border-b font-light">Qty</th>
                  <th className="px-4 py-4 border-b font-light">Price (RM)</th>
                  <th className="px-4 py-4 border-b font-light">Status</th>
                </tr>
              </thead>
              <tbody>
                {takeAwayOrders.length === 0 ? (
                  <tr className="bg-white">
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No data is available / Please place your first order.
                    </td>
                  </tr>
                ) : (
                  takeAwayOrders.reverse().map((order, index) => (
                    <tr
                      key={index}
                      className={`${
                        order.orderNumber === selectedOrder.orderNumber ? "bg-gray-100" : "bg-white"
                      } text-gray-600 text-center hover:bg-gray-200 transition-colors duration-200`}
                      onClick={() => handleSelectedOrderBtn(order.orderNumber)}>
                      <td
                        className={`border px-4 py-2 ${
                          order.status === "Cancelled" ? "line-through text-red-700" : ""
                        } ${order.status === "Status" ? "text-red-700" : ""}`}>
                        {order.orderNumber}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          order.status === "Cancelled" ? "line-through text-red-700" : ""
                        } ${order.status === "Status" ? "text-red-700" : ""}`}>
                        {order.status !== "Status"
                          ? order.quantity
                          : order.items.length === 0
                          ? "Order First"
                          : "Print First"}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          order.status === "Cancelled" ? "line-through text-red-700" : ""
                        } ${order.status === "Status" ? "text-red-700" : ""}`}>
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
                            : order.status === "Status"
                            ? "text-red-700"
                            : ""
                        }`}>
                        {order.status === "Status" ? "Waiting" : order.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {selectedOrder && (
        <OrderDetails
          orderType="TakeAway"
          setShowMenu={setShowMenu}
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
        setShowEditControls={setShowEditControls}
        tempCartItems={tempCartItems}
        orderType="TakeAway"
        setShowRemarksBtn={setShowRemarksBtn}
        setShowRemarksArea={setShowRemarksArea}
        remarks={remarks}
        setRemarks={setRemarks}
        tempRemarks={tempRemarks}
      />
      <PaymentModal
        isPayModalOpen={isPayModalOpen}
        setPayModalOpen={setPayModalOpen}
        orderType="TakeAway"
      />
      <CancelModal
        isCancelModalOpen={isCancelModalOpen}
        setCancelModalOpen={setCancelModalOpen}
        handleCancelStatus={handleCancelStatus}
        orderType="TakeAway"
      />
    </>
  );
}
