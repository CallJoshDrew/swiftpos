"use client";
import { useEffect, useState } from "react";
import CartDetails from "../components/cartDetails";
import MenuCard from "../components/menuCard";

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
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [taxRate, setTaxRate] = useState(0.1);
  const [selectMenu, setSelectMenu] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderCounter, setOrderCounter] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

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

  const handleRowClick = (id) => {
    // Find the order with the clicked ID
    const order = orders.find((order) => order.id === id);

    // Set cartItems to the items of the order
    setCartItems(order.items);
  };

  return (
    <>
      {selectMenu ? (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10 px-4">
          <div className="grid grid-cols-5 grid-rows-1 gap-4">
            <CategoryButton
              category="All"
              itemCount={menu.length}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <CategoryButton
              category="Main"
              itemCount={itemCounts["Main"] || 0}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <CategoryButton
              category="Drinks"
              itemCount={itemCounts["Drinks"] || 0}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <CategoryButton
              category="Cakes"
              itemCount={itemCounts["Cakes"] || 0}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          {/* card begins here */}
          <MenuCard
            menu={menu}
            selectedCategory={selectedCategory}
            cartItems={cartItems}
            setCartItems={setCartItems}
            isOrderPlaced={isOrderPlaced}
          />
        </div>
      ) : (
        <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-4 ">
          <div className="pb-1 ml-2 text-lg text-green-800 font-bold">
            Today Order
          </div>
          <div className="rounded-lg overflow-hidden border shadow-sm">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-green-800 text-white text-center">
                  <th className="px-4 py-4 border-b font-light">Order ID</th>
                  <th className="px-4 py-4 border-b font-light text-right">
                    RM
                  </th>
                  <th className="px-4 py-4 border-b font-light">Qty</th>
                  <th className="px-4 py-4 border-b font-light">Order Time</th>
                  <th className="px-4 py-4 border-b font-light">Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white text-gray-600 text-center hover:bg-gray-200 transition-colors duration-200">
                    <td className="border px-4 py-2">
                        {order.id}
                    </td>
                    <td className="border px-4 py-2 text-right">
                      {order.totalPrice.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">{order.quantity}</td>
                    <td className="border px-4 py-2">{order.timestamp}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleRowClick(order.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-green-800 pt-1">
                          <path
                            fillRule="evenodd"
                            d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
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
        isOrderPlaced={isOrderPlaced}
        setIsOrderPlaced={setIsOrderPlaced}
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
        setOrders={setOrders}
        orderCounter={orderCounter}
        setOrderCounter={setOrderCounter}
      />
    </>
  );
}
