"use client";
import { useEffect, useState } from "react";
import TakeAwayOrderDetails from "../components/takeAwayOrderDetails";
import MenuCard from "../components/menuCard";
import CategoryCard from "../components/categoryCard";
import ConfirmModal from "../components/confirmModal";
import PaymentModal from "../components/paymentModal";

export default function TakeAwayOverview() {
  // States related to the menu and cart
  const [showMenu, setShowMenu] = useState(false); // State to control the visibility of the menu
  const [menu, setMenu] = useState([]); // State to store the menu items
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [cartItems, setCartItems] = useState([]); 
  const [tempCartItems, setTempCartItems] = useState([]); 
  const [showEditBtn, setShowEditBtn] = useState(true); // State to control the visibility of the edit button

  // States related to the order details
  const [serviceTax, setServiceTax] = useState(0); // State to store the service tax or service charges
  const [orderCompleted, setOrderCompleted] = useState(false); 
  const [orders, setOrders] = useState([]); 
  const [orderCounter, setOrderCounter] = useState(1); // State to count the number of orders
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  // States related to the modals
  const [isPayModalOpen, setPayModalOpen] = useState(false); // State to control the visibility of the payment modal
  const [isMsgModalOpen, setMsgModalOpen] = useState(false); // State to control the visibility of the message modal
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store the selected order

  // Function to handle the click event of the payment button
  const handlePaymentClick = (selectedOrderID) => () => {
    setSelectedOrder(orders.find((order) => order.orderNumber === selectedOrderID));
    setPayModalOpen(true);
  };

  // Function to handle the close event of the message modal
  const handleMsgModalClose = () => {
    setMsgModalOpen(false);
  };

  // Function to handle the click event of the order button
  const handleSelectedOrderBtn = (orderNumber) => {
    const order = orders.find((order) => order.orderNumber === orderNumber);
    const itemsWithOrderID = order.items.map((item) => ({
      ...item,
    }));
    setSelectedOrder(order);
    setCartItems({ orderNumber, items: itemsWithOrderID });
    setTempCartItems({ orderNumber, items: itemsWithOrderID });
    setShowEditBtn(false);
  };

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
      {showMenu ? (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10">
          <div className="relative">
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
      />
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
