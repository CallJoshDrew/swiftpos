"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function TakeAwayOrderDetails({
  cartItems,
  setCartItems,
  tempCartItems,
  setTempCartItems,
  showMenu,
  setShowMenu,
  serviceTax,
  showEditBtn,
  setShowEditBtn,
  orderCompleted,
  setOrderCompleted,
  orderCounter,
  setOrderCounter,
  orders,
  setOrders,
  selectedOrder,
  setSelectedOrder,
  handlePaymentClick,
}) {
  // console.log(selectedOrder);
  // Cart related variables and functions
  let subtotal = 0;
  let serviceCharge = 0;
  let total = 0;

  if (tempCartItems.length > 0) {
    subtotal = tempCartItems.reduce(
      (total, item) =>
        total +
        parseFloat(item.price) * item.quantity +
        (item.selectedChoice ? item.selectedChoice.price * item.quantity : 0) +
        (item.selectedMeatLevel ? item.selectedMeatLevel.price * item.quantity : 0) +
        (item.selectedAddOn ? item.selectedAddOn.price * item.quantity : 0),
      0
    );
    subtotal = parseFloat(subtotal.toFixed(2)); // Round to 2 decimal places
    serviceCharge = subtotal * serviceTax;
    serviceCharge = parseFloat(serviceCharge.toFixed(2)); // Round to 2 decimal places
    total = subtotal + serviceCharge;
    total = parseFloat(total.toFixed(2)); // Round to 2 decimal places
  }
  const handleChoiceChange = (itemId, choiceName) => {
    // console.log(itemId);
    setTempCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              selectedChoice: item.choices.find((choice) => choice.name === choiceName),
            }
          : item
      )
    );
  };
  const handleMeatLevel = (itemId, level) => {
    setTempCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, selectedMeatLevel: item.meat.find((meat) => meat.level === level) }
          : item
      )
    );
  };
  const handleAddOn = (itemId, type) => {
    setTempCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, selectedAddOn: item.addOn.find((addOn) => addOn.type === type) }
          : item
      )
    );
  };

  const handleIncrease = (id) => {
    setTempCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecrease = (id) => {
    setTempCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
      )
    );
  };
  const handleRemove = (id) => {
    setTempCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.success("Item is removed!", {
      duration: 2000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  const calculateTotalQuantity = (tempCartItems) => {
    let totalQuantity = 0;
    tempCartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  const updateOrders = (prevOrders, order) => {
    const orderIndex = prevOrders.findIndex(
      (prevOrder) => prevOrder.orderNumber === order.orderNumber
    );
    if (orderIndex !== -1) {
      const updatedOrders = [...prevOrders];
      updatedOrders[orderIndex] = order;
      return updatedOrders;
    } else {
      return [order, ...prevOrders];
    }
  };

  // Refactored handlePlaceOrderBtn function
  const handlePlaceOrderBtn = () => {
    // console.log("handlePlaceOrderBtn called, orderCounter is", orderCounter);
    setShowMenu(false);

    // Find an existing order number
    const existingOrderItem = tempCartItems.find((item) => item.orderNumber);
   
    let orderNumber;

    // If an existing order number is found, use it
    if (existingOrderItem) {
      orderNumber = existingOrderItem.orderNumber;
    } else {
      // If no existing order number is found, generate a new one
      const paddedCounter = String(orderCounter).padStart(4, "0");
      orderNumber = `#TAPAO-${paddedCounter}`;
      setOrderCounter((prevOrderCounter) => prevOrderCounter + 1);
    }

    // Assign the order number to all items
    const updatedTempCartItems = tempCartItems.map((item) => {
      return { ...item, orderNumber: orderNumber };
    });
    // console.log(existingOrderItem);
    setCartItems(updatedTempCartItems);
    setTempCartItems(updatedTempCartItems);

    setOrderCompleted(true);
    setShowEditBtn(false);

    const now = new Date();
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kuala_Lumpur",
    };
    const dateOptions = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: "Asia/Kuala_Lumpur",
    };

    const timeString = now.toLocaleTimeString("en-US", timeOptions);
    const dateString = now.toLocaleDateString("en-US", dateOptions);
    const totalQuantity = calculateTotalQuantity(tempCartItems);
    const order = {
      orderNumber,
      orderTime: timeString,
      orderDate: dateString,
      items: tempCartItems,
      subtotal,
      serviceCharge,
      totalPrice: total,
      quantity: totalQuantity,
      status: "Placed Order",
      payment: "Pending",
      paymentMethod: "Cash",
    };
    setSelectedOrder(order);
    setOrders((prevOrders) => updateOrders(prevOrders, order));

    toast.success("Order Accepted", {
      duration: 3000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  let orderStatusBtn;

  if (tempCartItems.length === 0) {
    orderStatusBtn = (
      <button
        className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
        disabled>
        Empty Cart
      </button>
    );
  } else if (!orderCompleted) {
    orderStatusBtn = (
      <button
        className="bg-green-700 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
        onClick={handlePlaceOrderBtn}>
        Place Order & Print
      </button>
    );
  } else if (orderCompleted && selectedOrder?.payment != "Paid") {
    orderStatusBtn = (
      <button
        className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
        disabled>
        Placed Order
      </button>
    );
  } else if (orderCompleted && selectedOrder?.payment == "Paid") {
    orderStatusBtn = (
      <button
        className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
        disabled>
        Completed
      </button>
    );
  }
  let paymentStatusBtn;
  if (tempCartItems.length > 0 && orderCompleted && !showEditBtn) {
    if (selectedOrder?.payment != "Paid") {
      paymentStatusBtn = (
        <button
          className="bg-green-800 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
          onClick={handlePaymentClick(selectedOrder?.orderNumber)}>
          Make Payment
        </button>
      );
    } else {
      paymentStatusBtn = (
        <>
          <button
            className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
            disabled>
            Paid by {selectedOrder ? selectedOrder.paymentMethod : null}
          </button>
        </>
      );
    }
  }

  useEffect(() => {
    // console.log("Selected Order is ", selectedOrder?.items);
    // console.log("tempCartItems: ", tempCartItems);
    // console.log("Orders list is:", orders);
  }, [selectedOrder, tempCartItems, orders]);

  return (
    <div className="py-10 w-2/6 flex-auto flex flex-col relative">
      <div className="fixed h-screen w-2/6 overflow-y-scroll pb-20 px-6 space-y-4">
        <div className="rounded-lg px-2 flex my-1 justify-between items-center">
          <div className="flex flex-col space-y-0">
            <div className="text-green-800 text-lg font-bold leading-none">Take Away</div>
            <div className="text-green-800 text-sm">
              {selectedOrder ? selectedOrder.orderNumber : null}
            </div>
          </div>
          {tempCartItems.length > 0 && !showEditBtn && selectedOrder?.payment != "Paid" && (
            <div
              onClick={() => {
                setShowMenu(true);
                setShowEditBtn(true);
                setOrderCompleted(false);
              }}>
              <div className="bg-green-800 flex items-center pt-1 pb-2 px-3 rounded-md">
                <div className="text-white cursor-pointer pt-1 pr-1 text-sm">Edit</div>
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
        </div>
        <hr className="h-px bg-gray-200 border-0" />
        {tempCartItems.length > 0 ? (
          <div className="flex space-y-0 px-2 items-center justify-between">
            <div className="text-green-800 text-sm font-bold leading-none">Order Time</div>
            <div className="text-green-800 text-sm">
              {" "}
              {selectedOrder ? `${selectedOrder.orderTime}, ${selectedOrder.orderDate}` : null}
            </div>
          </div>
        ) : null}
        {/* Each item card */}
        <div className="flex flex-col gap-4">
          {tempCartItems.map((item) => (
            <div key={item.id} className="border rounded-md p-2 shadow-sm">
              <div className="flex">
                <Image
                  src={item.image}
                  alt="stew"
                  width="100"
                  height="100"
                  className="sm:h-18 w-20 object-cover rounded-lg"
                />
                <div className="flex w-full items-center py-1 pl-2 pr-1">
                  <div className="flex w-full justify-between px-1 space-x-2">
                    <div className="text-black text-base ">
                      {item.name} x {item.quantity}
                    </div>
                    <div className="text-green-800 font-bold text-base ">
                      {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              {item.choices && (
                <select
                  id="choices"
                  className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                  onChange={(e) => handleChoiceChange(item.id, e.target.value)}
                  disabled={
                    !(tempCartItems.length > 0 && showEditBtn && selectedOrder?.payment !== "Paid")
                  }>
                  {item.choices.map((choice, index) => (
                    <option key={index} value={choice.name}>
                      {choice.name} + RM {choice.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              )}
              {item.meat && (
                <select
                  id="meat"
                  className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                  onChange={(e) => handleMeatLevel(item.id, e.target.value)}
                  disabled={
                    !(tempCartItems.length > 0 && showEditBtn && selectedOrder?.payment !== "Paid")
                  }>
                  {item.meat.map((meat, index) => (
                    <option key={index} value={meat.level}>
                      {meat.level} + RM {meat.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              )}
              {item.addOn && (
                <select
                  id="meat"
                  className="block appearance-none w-full py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                  onChange={(e) => handleAddOn(item.id, e.target.value)}
                  disabled={
                    !(tempCartItems.length > 0 && showEditBtn && selectedOrder?.payment !== "Paid")
                  }>
                  {item.addOn.map((addOn, index) => (
                    <option key={index} value={addOn.type}>
                      {addOn.type} + RM {addOn.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              )}
              {showEditBtn && (
                <div className="flex justify-between px-2 py-2 bg-gray-200 rounded-md mt-3 w-full">
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
        {/* Subtotal, serviceCharge and Total Section */}
        <div className="bg-gray-100 py-4 px-5 mb-10 rounded-md">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Subtotal</div>
            <div className="text-gray-600 text-sm">RM {subtotal.toFixed(2)}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Service Charge</div>
            <div className="text-gray-600 text-sm">RM {serviceCharge.toFixed(2)}</div>
          </div>
          <hr className="h-px my-6 bg-black border-dashed" />
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-base font-bold">Total</div>
            <div className="text-gray-600 text-base font-bold">RM {total.toFixed(2)}</div>
          </div>
        </div>
        {orderStatusBtn}
        {paymentStatusBtn}
      </div>
    </div>
  );
}

export default React.memo(TakeAwayOrderDetails);
