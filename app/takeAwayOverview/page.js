"use client";
import { useEffect, useState } from "react";
import TakeAwayOrderDetails from "../components/takeAwayOrderDetails";
import MenuCard from "../components/menuCard";
import CategoryCard from "../components/categoryCard";
import StatusModal from "../components/statusModal";
import ConfirmModal from "../components/confirmModal";

export default function TakeAwayOverview() {
  // State for menu and category
const [menu, setMenu] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("All");

// State for cart and order details
const [cartItems, setCartItems] = useState([]);
const [taxRate, setTaxRate] = useState(0.1);
const [orderCompleted, setOrderCompleted] = useState(false);
const [orders, setOrders] = useState([]);
const [orderCounter, setOrderCounter] = useState(1);
const [currentDate, setCurrentDate] = useState(new Date().toDateString());

// State for UI elements
const [showMenu, setShowMenu] = useState(false);
const [showEditBtn, setShowEditBtn] = useState(true);

// State for modal
const [isModalOpen, setModalOpen] = useState(false);
const [selectedOrderID, setSelectedOrderID] = useState(null);
const [selectedStatus, setSelectedStatus] = useState(null);
const [isMsgModalOpen, setMsgModalOpen] = useState(false);
const [message, setMessage] = useState("");

// Function to handle button click
const handleButtonClick = (orderID) => () => {
  const order = orders.find((order) => order.id === orderID);
  setSelectedOrderID(orderID);
  setSelectedStatus(order.status);
  setModalOpen(true);
};

// Function to handle modal close
const handleModalClose = (orderID, selectedStatus) => {
  setModalOpen(false);
  setOrders(
    orders.map((order) =>
      order.id === orderID ? { ...order, status: selectedStatus } : order
    )
  );
};

// Function to handle detail button click
const handleDetailBtn = (id) => {
  setSelectedOrderID(id);
  setShowEditBtn(false);
  const order = orders.find((order) => order.id === id);
  const itemsWithOrderID = order.items.map((item) => ({
    ...item,
    orderID: order.id,
  }));
  setCartItems(itemsWithOrderID);
};

// Function to handle message modal close
const handleMsgModalClose = () => {
  setMsgModalOpen(false);
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

  console.log(orders);
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
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-4 z-9">
          <div className="flex justify-between w-full">
            <div className="pb-1 ml-2 text-lg text-green-800 font-bold">
              Today Order
            </div>
            <button
              className="text-xs py-2 px-4 bg-green-800 text-white rounded-md"
              onClick={() => {
                setShowMenu(true);
                setCartItems([]);
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
                  <th className="px-4 py-4 border-b font-light">Time</th>
                  <th className="px-4 py-4 border-b font-light">Qty</th>
                  <th className="px-4 py-4 border-b font-light">Price (RM)</th>
                  <th className="px-4 py-4 border-b font-light">Status</th>
                  {/* <th className="px-4 py-4 border-b font-light">Details</th> */}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`${
                      order.id === selectedOrderID ? "bg-gray-100" : "bg-white"
                    } text-gray-600 text-center hover:bg-gray-200 transition-colors duration-200`}
                    onClick={() => handleDetailBtn(order.id)}>
                    <td className="border px-4 py-2">
                      {orders.length - index}
                    </td>
                    <td className="border px-4 py-2">{order.orderTime}</td>
                    <td className="border px-4 py-2">{order.quantity}</td>
                    <td className="border px-4 py-2">
                      {order.totalPrice.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={handleButtonClick(order.id)}
                        className={`rounded-md text-sm underline ${
                          order.status === "Completed"
                            ? "text-green-800"
                            : "text-red-700"
                        }`}>
                        {order.status}
                      </button>
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
        taxRate={taxRate}
        showEditBtn={showEditBtn}
        setShowEditBtn={setShowEditBtn}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        orderCompleted={orderCompleted}
        setOrderCompleted={setOrderCompleted}
        setOrders={setOrders}
        orderCounter={orderCounter}
        setOrderCounter={setOrderCounter}
        orderID={selectedOrderID}
        setSelectedOrderID={setSelectedOrderID}
      />
      <StatusModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        orderID={selectedOrderID}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
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
