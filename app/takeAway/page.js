"use client";
import { useEffect, useState } from "react";
import CartDetails from "../components/cartDetails";
import MenuCard from "../components/menuCard";
import toast from "react-hot-toast";
import Modal from "../components/statusModal";

function CategoryButton({
  category,
  itemCount,
  selectedCategory,
  setSelectedCategory,
}) {
  const isSelected = selectedCategory === category;
  return (
    <button
      className={`rounded-lg flex items-center justify-center flex-col py-4 ${
        isSelected ? "bg-green-700 text-white" : "bg-white text-black"
      }`}
      onClick={() => setSelectedCategory(category)}>
      <div className="text-lg">{category}</div>
      <div className="text-xs">{itemCount} items</div>
    </button>
  );
}

export default function TakeAway() {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [taxRate, setTaxRate] = useState(0.1);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(true);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [orders, setOrders] = useState([]);
  const [orderCounter, setOrderCounter] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [orderTime, setOrderTime] = useState("");

  //Modal//
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleButtonClick = (orderID) => () => {
    const order = orders.find((order) => order.id === orderID);
    setSelectedOrderID(orderID);
    setSelectedStatus(order.status); // Set the selectedStatus state to the status of the selected order
    setModalOpen(true);
  };

  const handleModalClose = (orderID, selectedStatus) => {
    setModalOpen(false);

    // Update the order status in the orders array
    setOrders(
      orders.map((order) =>
        order.id === orderID ? { ...order, status: selectedStatus } : order
      )
    );
  };
  // end of Modal //

  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data));
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    if (today !== currentDate) {
      setOrderCounter(1);
      setCurrentDate(today);
    }
  }, [currentDate]);

  let itemCounts = menu.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

  const handleDetailBtn = (id) => {
    setSelectedOrderID(id);
    setShowEditBtn(false);
    setShowDetails(true);

    // Find the order with the clicked ID
    const order = orders.find((order) => order.id === id);
    setOrderTime(order.timestamp);
    // Add the order id to each item and set cartItems to the items of the order
    const itemsWithOrderID = order.items.map((item) => ({
      ...item,
      orderID: order.id,
    }));
    setCartItems(itemsWithOrderID);
    // console.log(cartItems);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
    setCartItems([]);
  };

  return (
    <>
      {showMenu ? (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10 px-4">
          {/* <div className="fixed bg-gray-100 top=0 z-10 w-1/2 pt-10 py-4"> */}
            <div className="flex justify-between w-full">
              <div className="pb-1 ml-2 text-lg text-green-800 font-bold">
                Our Menu
              </div>
              <button
                className="text-xs py-2 px-4 bg-red-700 text-white rounded-md"
                onClick={() => handleCloseMenu()}>
                x Close Menu
              </button>
            </div>
            <div className="grid grid-cols-5 grid-rows-1 gap-4">
              <CategoryButton
                category="All"
                itemCount={menu.length}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <CategoryButton
                category="Cakes"
                itemCount={itemCounts["Cakes"] || 0}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <CategoryButton
                category="Dish"
                itemCount={itemCounts["Dish"] || 0}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <CategoryButton
                category="Drinks"
                itemCount={itemCounts["Drinks"] || 0}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          {/* </div> */}
          {/* card begins here */}
          <MenuCard
            menu={menu}
            selectedCategory={selectedCategory}
            cartItems={cartItems}
            setCartItems={setCartItems}
            showEditBtn={showEditBtn}
          />
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
                    <td className="border px-4 py-2">{order.timestamp}</td>
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
                    {/* <td className="border px-4 py-2">{order.timestamp}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <CartDetails
        cartItems={cartItems}
        setCartItems={setCartItems}
        taxRate={taxRate}
        showEditBtn={showEditBtn}
        setShowEditBtn={setShowEditBtn}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        orderCompleted={orderCompleted}
        setOrderCompleted={setOrderCompleted}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        setOrders={setOrders}
        orderCounter={orderCounter}
        setOrderCounter={setOrderCounter}
        orderID={selectedOrderID}
        setSelectedOrderID={setSelectedOrderID}
        orderTime={orderTime}
        setOrderTime={setOrderTime}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        orderID={selectedOrderID}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </>
  );
}
