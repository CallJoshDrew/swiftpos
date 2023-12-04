import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function CartDetails({
  cartItems,
  taxRate,
  showMenu,
  setShowMenu,
  setCartItems,
  showEditBtn,
  setShowEditBtn,
  orderCompleted,
  setOrderCompleted,
  showDetails,
  setShowDetails,
  setOrders,
  orderCounter,
  setOrderCounter,
}) {
  let subtotal = 0;
  let tax = 0;
  let total = 0;

  if (cartItems.length > 0) {
    subtotal = cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    tax = subtotal * taxRate;
    total = subtotal + tax;
  }
  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    //return all the items that are not equal to the id provided(which is the item which need to be removed)
  };

  const handleOrder = () => {
    setShowMenu(false);

    // Get the current date and time
    const now = new Date();

    // Check if an order ID already exists in cartItems
    const existingOrder = cartItems.find((item) => item.orderId);

    // Use the existing ID if it exists, otherwise generate a new one
    let id;
    if (existingOrder) {
      id = existingOrder.orderId;
    } else {
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
      const day = String(now.getDate()).padStart(2, "0");
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");

      // Generate the ID
      id = `${year}${month}${day}-${hours}${minutes}-${orderCounter}`;

      // Increment the order counter
      setOrderCounter(orderCounter + 1);
    }

    // Convert the timestamp to a readable format
    const timestamp = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kuala_Lumpur",
    });

    // Calculate the total price and quantity of all items in the cart
    let subtotal = 0;
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    // Calculate tax and total price
    const tax = subtotal * taxRate; // Assuming a tax rate of 6%
    const totalPrice = subtotal + tax;

    // Create a new order object
    const order = {
      id, // Use the existing or generated ID
      timestamp, // Use the formatted timestamp
      items: cartItems, // Save the details of each item
      subtotal,
      tax,
      totalPrice,
      quantity: totalQuantity,
      status: "Completed",
    };

    // If an order with the same ID already exists, update it. Otherwise, add a new order.
    setOrders((prevOrders) => {
      const orderIndex = prevOrders.findIndex((order) => order.id === id);
      if (orderIndex !== -1) {
        // Update the existing order
        const updatedOrders = [...prevOrders];
        updatedOrders[orderIndex] = order;
        return updatedOrders;
      } else {
        // Add a new order at the beginning of the array
        return [order, ...prevOrders];
      }
    });

    console.log(order);
    toast.success(
      "Order Success",
      {
        duration: 2000,
      }
    );

    // Clear the cartItems array
    setCartItems([]);
  };

  return (
    <div className="py-10 w-2/6 flex-auto flex flex-col relative">
      <div className="fixed h-screen w-2/6 overflow-y-scroll pb-10 px-6 space-y-4">
        <div className="rounded-lg px-2 flex my-1 justify-between items-center">
          <div className="text-green-800 text-lg font-bold">Take Away</div>
          {showDetails && cartItems.length > 0 && !showEditBtn && (
            <div
              onClick={() => {
                setShowMenu(true);
                setShowEditBtn(true);
                setOrderCompleted(false);
                setShowDetails(false);
              }}>
              <div className="bg-green-800 flex items-center pt-1 pb-2 px-3 rounded-md">
                <div className="text-white cursor-pointer pt-1 pr-1 text-sm">
                  Edit
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-white cursor-pointer">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </div>
            </div>
          )}
          {cartItems.length > 0 &&
            orderCompleted == false &&
            showDetails == false && (
              <button
                className="text-xs py-2 px-4 bg-red-700 text-white rounded-md"
                onClick={() => {
                  setShowMenu(false);
                  setCartItems([]);
                }}>
                Close
              </button>
            )}
        </div>
        {cartItems.length > 0 && cartItems.map((item) => (
  <div key={item.id}>{item.id}</div>
))}
        <hr className="h-px mt-4 mb-5 bg-gray-200 border-0" />
        {/* Each item card */}
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col border rounded-md p-2 shadow-sm">
              <div className="flex relative">
                <Image
                  src="/sample.png"
                  alt="stew"
                  width="100"
                  height="100"
                  className="sm:h-20 w-20 object-cover rounded-lg"
                />
                <div className="flex flex-col py-1 px-4">
                  <div className="text-black text-base leading-4">
                    {item.name}
                  </div>
                  <div className="text-green-800 text-xs">
                    RM {item.price.toFixed(2)} x {item.quantity}
                  </div>
                  <div className="text-green-800 font-bold text-sm absolute bottom-0 right-2">
                    {(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              {showEditBtn && (
                <div className="flex justify-between px-2 py-1 bg-gray-200 rounded-md mt-3 w-full">
                  <div className="flex items-center gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-green-800"
                      onClick={() => handleDecrease(item.id)}>
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-sm text-black">{item.quantity}</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-green-800"
                      onClick={() => handleIncrease(item.id)}>
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-red-700"
                    onClick={() => handleRemove(item.id)}>
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Subtotal, Tax and Total Section */}
        <div className="bg-gray-100 py-4 px-5 rounded-md">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Subtotal</div>
            <div className="text-gray-600 text-sm">
              RM {subtotal.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Tax</div>
            <div className="text-gray-600 text-sm">RM {tax.toFixed(2)}</div>
          </div>
          <hr className="h-px my-6 bg-black border-dashed" />
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-base font-bold">Total</div>
            <div className="text-gray-600 text-base font-bold">
              RM {total.toFixed(2)}
            </div>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <button
            className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
            disabled>
            Empty Cart
          </button>
        ) : showMenu && !orderCompleted ? (
          <button
            className="bg-green-700 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
            onClick={handleOrder}>
            Place Order
          </button>
        ) : orderCompleted && cartItems.length > 0 ? (
          <button
            className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
            disabled>
            Empty Cart
          </button>
        ) : showDetails && cartItems.length > 0 ? (
          <button
            className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
            disabled>
            Completed
          </button>
        ) : null}

        {/* {!showEditBtn ? (
          cartItems.length > 0 ? (
            <button
              className="bg-green-700 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
              onClick={handleOrder}>
              Place Order
            </button>
          ) : (
            <button
              className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
              disabled>
              Empty Cart
            </button>
          )
        ) : (
          <button className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium">
            Done
          </button>
        )} */}
      </div>
    </div>
  );
}
