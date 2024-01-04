"use client";
import { useEffect, useState } from "react";
import TakeAwayOrderDetails from "../components/takeAwayOrderDetails";
import MenuCard from "../components/menuCard";
import CategoryCard from "../components/categoryCard";
import StatusModal from "../components/statusModal";
import ConfirmModal from "../components/confirmModal";
import PaymentModal from "../components/paymentModal";

export default function TakeAwayOverview() {
  // Menu related states
  const [showMenu, setShowMenu] = useState(false);
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [tempCartItems, setTempCartItems] = useState([]);
  const [showEditBtn, setShowEditBtn] = useState(true);

  // State for cart and order details

  const [serviceTax, setServiceTax] = useState(0);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderCounter, setOrderCounter] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  // temp
  const [tables, setTables] = useState("TAPAO");

  // Modal related states
  const [isPayModalOpen, setPayModalOpen] = useState(false);
  const [isMsgModalOpen, setMsgModalOpen] = useState(false);
  // const [isStatusModalOpen, setModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  // const [selectedStatus, setSelectedStatus] = useState(null);

  // Function to handle button click
  // const handleChangeStatusBtn = (orderNumber) => () => {
  //   const order = orders.find((order) => order.orderNumber === orderNumber);
  //   setSelectedStatus(order.status);
  //   setModalOpen(true);
  // };

  // Modal related functions
  const handlePaymentClick = (selectedOrderID) => () => {
    setSelectedOrder(orders.find((order) => order.orderNumber === selectedOrderID));
    setPayModalOpen(true);
  };

  const handleMsgModalClose = () => {
    setMsgModalOpen(false);
  };

  // Function to handle detail button click
  const handleSelectedOrderBtn = (orderNumber) => {
    const order = orders.find((order) => order.orderNumber === orderNumber);
    const itemsWithOrderID = order.items.map((item) => ({
      ...item,
    }));
    // need to set the selectedOrder with the latest selection. If not it will remain previous updated selected order.
    setSelectedOrder(order);
    setCartItems({ orderNumber, items: itemsWithOrderID }); // Set CartItems
    setTempCartItems({ orderNumber, items: itemsWithOrderID }); // Also set tempCartItems
    setShowEditBtn(false);
  };

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

  // console.log(orders);
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
              tempCartItems={tempCartItems}
              setTempCartItems={setTempCartItems}
              setOrderCompleted={setOrderCompleted}
              setShowMenu={setShowMenu}
              setShowEditBtn={setShowEditBtn}
              setMsgModalOpen={setMsgModalOpen}
            />
          </div>
          {/* card begins here */}
          <div className="mt-[130px] px-4">
            <MenuCard
              menu={menu}
              selectedCategory={selectedCategory}
              tempCartItems={tempCartItems}
              setTempCartItems={setTempCartItems}
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-4 z-9">
          <div className="flex justify-between w-full">
            <div className="pb-1 ml-2 text-lg text-green-800 font-bold">Today Order</div>
            <button
              className="text-xs py-2 px-4 bg-green-800 text-white rounded-md"
              onClick={() => {
                setShowMenu(true);
                setOrderCompleted(false);
                setCartItems({ orderNumber: null, items: [] });
                setTempCartItems({ orderNumber: null, items: [] });
                setShowEditBtn(true);
              }}>
              + New Order
            </button>
          </div>
          <div className="rounded-lg overflow-hidden border shadow-sm">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-green-800 text-white text-center">
                  <th className="px-4 py-4 border-b font-light">No.</th>
                  <th className="px-4 py-4 border-b font-light">Order Time</th>
                  <th className="px-4 py-4 border-b font-light">Qty</th>
                  <th className="px-4 py-4 border-b font-light">Price (RM)</th>
                  <th className="px-4 py-4 border-b font-light">Status</th>
                  {/* <th className="px-4 py-4 border-b font-light">Details</th> */}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className={`${
                      order.orderNumber === selectedOrder.orderNumber ? "bg-gray-100" : "bg-white"
                    } text-gray-600 text-center hover:bg-gray-200 transition-colors duration-200`}
                    onClick={() => handleSelectedOrderBtn(order.orderNumber)}>
                    <td className="border px-4 py-2">{orders.length - index}</td>
                    <td className="border px-4 py-2">{order.orderTime}</td>
                    <td className="border px-4 py-2">{order.quantity}</td>
                    <td className="border px-4 py-2">{order.totalPrice.toFixed(2)}</td>
                    <td
                      className={`border px-4 py-2 rounded-md underline text-sm ${
                        order.status === "Completed"
                          ? "text-green-800"
                          : order.status === "Placed Order"
                          ? "text-yellow-500"
                          : "text-red-700"
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
      <TakeAwayOrderDetails
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
        setCartItems={setCartItems}
      />
      {/* <StatusModal
        isStatusModalOpen={isStatusModalOpen}
        handleStsModalClose={handleStsModalClose}
        selectedOrder={selectedOrder}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      /> */}
      <ConfirmModal
        isOpenMsg={isMsgModalOpen}
        onCloseMsg={handleMsgModalClose}
        setShowMenu={setShowMenu}
        setShowEditBtn={setShowEditBtn}
        setOrderCompleted={setOrderCompleted}
        setTempCartItems={setTempCartItems}
        cartItems={cartItems}
      />
    </>
  );
}
