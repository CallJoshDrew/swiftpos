import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import StatusModal from "./statusModal";
import { saveOrder } from "./crudLocalStorage";
import RemarksModal from "./reMarksModal";

function TableOrderDetails({
  tables,
  setTables,
  tableNumber,
  cartItems,
  setCartItems,
  tempCartItems,
  setTempCartItems,
  serviceTax,
  setShowMenu,
  showEditBtn,
  setShowEditBtn,
  orderCompleted,
  setOrderCompleted,
  orders,
  setOrders,
  orderCounter,
  setOrderCounter,
  selectedOrder,
  setSelectedOrder,
  handlePaymentClick,
  handleCheckOutClick,
  remarks,
  setRemarks,
  isRemarksModalOpen,
  setRemarksOpen,
  isEditing,
  setIsEditing,
  showRemarksBtn,
  setShowRemarksBtn,
}) {
  // console.log("Remarks is now ", remarks);
  // State to control the visibility of the status modal
  const [isStatusModalOpen, setModalOpen] = useState(false);

  // Function to handle the closing of the status modal
  const handleStsModalClose = (orderID) => {
    // Close the modal
    setModalOpen(false);

    // Update the status of the order to "Cancel"
    setOrders(
      orders.map((order) =>
        order.orderNumber === orderID ? { ...order, status: "Cancel" } : order
      )
    );

    // Update the table's order and status
    setTables(
      tables.map((table) =>
        table.orderNumber === orderID
          ? { ...table, order: [], orderNumber: null, occupied: false }
          : table
      )
    );

    // Update the selected order's status
    setSelectedOrder({
      ...selectedOrder,
      status: "Cancel",
    });
  };
  
  const [rows, setRows] = useState(1);

  // Remove Remarks
  const handleRemoveRemarks = () => {
    setSelectedOrder((prevOrder) => {
      if (prevOrder) {
        const newOrder = { ...prevOrder };
        delete newOrder.remarks;
        return newOrder;
      }
      return null;
    });
    setRemarksOpen(false);
    setIsEditing(false);
    setRemarks("Initial");
    setShowRemarksBtn(true);
  };

  const handleAddRemarks = () => {
    setSelectedOrder({
      ...selectedOrder,
      // reason why it is empty string is convenience for user to type straight away wihtout removing the words
      remarks: "",
    });
    setRemarksOpen(true);
    setIsEditing(true);
    setShowRemarksBtn(false);
  };

  // Variables to hold the subtotal, service charge, and total
  let subtotal = 0;
  let serviceCharge = 0;
  let total = 0;

  // Calculate the subtotal, service charge, and total if there are items in the cart
  if (tempCartItems && tempCartItems.items && tempCartItems.items.length > 0) {
    // Calculate the subtotal
    subtotal = tempCartItems.items.reduce(
      (total, item) =>
        total +
        parseFloat(item.price) * item.quantity +
        (item.selectedChoice ? item.selectedChoice.price * item.quantity : 0) +
        (item.selectedMeatLevel ? item.selectedMeatLevel.price * item.quantity : 0) +
        (item.selectedAddOn ? item.selectedAddOn.price * item.quantity : 0),
      0
    );
    subtotal = parseFloat(subtotal.toFixed(2)); // Round to 2 decimal places

    // Calculate the service charge
    serviceCharge = subtotal * serviceTax;
    serviceCharge = parseFloat(serviceCharge.toFixed(2)); // Round to 2 decimal places

    // Calculate the total
    total = subtotal + serviceCharge;
    total = parseFloat(total.toFixed(2)); // Round to 2 decimal places
  }

  // Function to handle the increase of an item's quantity
  const handleIncrease = (id) => {
    // Increase the item's quantity by 1
    setTempCartItems((prevItems) => {
      return {
        ...prevItems,
        items: prevItems.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    });

    // Show a success toast
    toast.success("Added to Cart!", {
      duration: 1000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  // Function to handle the decrease of an item's quantity
  const handleDecrease = (id) => {
    // Decrease the item's quantity by 1, but not less than 1
    setTempCartItems((prevItems) => {
      return {
        ...prevItems,
        items: prevItems.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
        ),
      };
    });

    // Show an error toast
    toast.error("Item is removed!", {
      duration: 1000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  // Function to handle the removal of an item
  const handleRemove = (id) => {
    // Remove the item from the cart
    setTempCartItems((prevItems) => {
      return {
        ...prevItems,
        items: prevItems.items.filter((item) => item.id !== id),
      };
    });

    // Show an error toast
    toast.error("Item is removed!", {
      duration: 1000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  // Function to handle the change of an item's choice
  const handleChoiceChange = (itemId, choiceName) => {
    // Update the item's selected choice
    setTempCartItems((prevItems) => {
      return {
        ...prevItems,
        items: prevItems.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                selectedChoice: item.choices.find((choice) => choice.name === choiceName),
              }
            : item
        ),
      };
    });
  };

  // Function to handle the change of an item's meat level
  const handleMeatLevel = (itemId, level) => {
    // Update the item's selected meat level
    setTempCartItems((prevItems) => {
      return {
        ...prevItems,
        items: prevItems.items.map((item) =>
          item.id === itemId
            ? { ...item, selectedMeatLevel: item.meat.find((meat) => meat.level === level) }
            : item
        ),
      };
    });
  };

  // Function to handle the addition of an add-on to an item
  const handleAddOn = (itemId, type) => {
    // Update the item's selected add-on
    setTempCartItems((prevItems) => {
      return {
        ...prevItems,
        items: prevItems.items.map((item) =>
          item.id === itemId
            ? { ...item, selectedAddOn: item.addOn.find((addOn) => addOn.type === type) }
            : item
        ),
      };
    });
  };

  // Function to calculate the total quantity of items in the cart
  const calculateTotalQuantity = (tempCartItems) => {
    let totalQuantity = 0;
    tempCartItems.items.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  // Function to update the orders
  const updateOrders = (prevOrders, order) => {
    // Find the index of the order in the previous orders
    const orderIndex = prevOrders.findIndex(
      (prevOrder) => prevOrder.orderNumber === order.orderNumber
    );

    // If the order is found, update it
    if (orderIndex !== -1) {
      const updatedOrders = [...prevOrders];
      updatedOrders[orderIndex] = order;
      return updatedOrders;
    } else {
      // If the order is not found, add it to the beginning of the orders array
      return [order, ...prevOrders];
    }
  };

  // Function to update the tables
  const updateTables = (prevTables, tableNumber, order) => {
    const updatedTables = [...prevTables];
    // Update the table with the given table number
    updatedTables[tableNumber - 1] = {
      ...updatedTables[tableNumber - 1],
      orderNumber: order.orderNumber,
      occupied: true,
      order,
    };
    return updatedTables;
  };

  // Function to handle the click event of the "Place Order" button
  const handlePlaceOrderBtn = () => {
    // Hide the menu
    setShowMenu(false);

    // Find an existing order number
    const existingOrderNumber = tempCartItems.orderNumber;
    let orderNumber;

    // If an existing order number is found, use it
    if (existingOrderNumber) {
      orderNumber = existingOrderNumber;
    } else {
      // If no existing order number is found, generate a new one
      const paddedCounter = String(orderCounter).padStart(4, "0");
      orderNumber = `#T${tableNumber}-${paddedCounter}`;
      setOrderCounter((prevOrderCounter) => prevOrderCounter + 1);
    }

    // Function to update the items
    const updatedItems = (prevItems) => {
      return { ...prevItems, orderNumber };
    };

    // Update the cart items and temporary cart items
    setCartItems(updatedItems(tempCartItems));
    setTempCartItems(updatedItems(tempCartItems));

    // Mark the order as completed and hide the edit button
    setOrderCompleted(true);
    setShowEditBtn(false);

    // Get the current date and time
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

    // Calculate the total quantity of items in the cart
    const totalQuantity = calculateTotalQuantity(tempCartItems);

    // Create the order
    const order = {
      orderNumber,
      tableNumber,
      orderTime: timeString,
      orderDate: dateString,
      items: tempCartItems.items,
      subtotal,
      serviceCharge,
      totalPrice: total,
      quantity: totalQuantity,
      status: "Placed Order",
      payment: "Pending",
      paymentMethod: "Cash",
    };
    if (remarks !== "Initial") {
      order.remarks = remarks;
    }
    // Set the selected order and update the orders and tables
    setSelectedOrder(order);
    console.log(remarks);
    setShowRemarksBtn(true);
    setOrders((prevOrders) => updateOrders(prevOrders, order));
    setTables((prevTables) => updateTables(prevTables, tableNumber, order));
    // setRemarks("No Remarks");
    setIsEditing(false);
    // console.log("Remarks from update Order is", remarks);
    // Show a success toast
    toast.success("Order has been accepted", {
      duration: 3000,
      position: "top-left",
      reverseOrder: false,
    });
  };

  // Variable to hold the order status button
  let orderStatusBtn;
  // If the cart is empty, show the "Empty Cart" button
  if (tempCartItems && tempCartItems.items && tempCartItems.items.length === 0) {
    orderStatusBtn = (
      <button
        className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
        disabled>
        Empty Cart
      </button>
    );
  } else if (!orderCompleted) {
    // If the order is not completed, show the "Place Order & Print" button
    orderStatusBtn = (
      <button
        className="bg-green-700 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
        onClick={handlePlaceOrderBtn}>
        Place Order & Print
      </button>
    );
  } else if (selectedOrder?.status === "Cancel") {
    // If the order is cancelled, show the "Cancelled Order" button
    orderStatusBtn = (
      <button
        className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
        disabled>
        {selectedOrder ? "Cancelled Order" : "Cancel"}
      </button>
    );
  } else if (
    orderCompleted &&
    selectedOrder?.payment != "Paid" &&
    selectedOrder?.status !== "Completed"
  ) {
    // If the order is completed but not paid, show the order status button and the cancel button
    orderStatusBtn = (
      <div className="flex space-x-2">
        <button
          className={`flex-1  rounded-md p-2 text-white text-sm font-medium bg-gray-500 ${
            selectedOrder?.status === "Completed" ? "text-green-800" : "text-red-700"
          }`}
          disabled>
          {selectedOrder?.status}
        </button>
        <button
          className="bg-red-700 px-2 rounded-md"
          onClick={() => {
            setModalOpen(true);
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-white cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  } else if (orderCompleted && selectedOrder?.status == "Completed") {
    // If the order is completed, show the "Completed" button
    orderStatusBtn = (
      <button
        className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
        disabled>
        Completed ({selectedOrder?.paymentMethod})
      </button>
    );
  }
  // Variable to hold the payment status button
  let paymentStatusBtn;
  // If there are items in the cart, the order is completed, and the edit button is not shown
  if (
    tempCartItems &&
    tempCartItems.items &&
    tempCartItems.items.length > 0 &&
    orderCompleted &&
    !showEditBtn
  ) {
    if (selectedOrder?.status === "Cancel") {
      // If the order is cancelled, don't show the payment status button
      paymentStatusBtn = null;
    } else if (selectedOrder?.payment != "Paid") {
      // If the order is not paid, show the "Make Payment" button
      paymentStatusBtn = (
        <button
          className="bg-green-800 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
          onClick={handlePaymentClick(selectedOrder?.orderNumber)}>
          Make Payment
        </button>
      );
    } else if (selectedOrder?.payment === "Paid") {
      // If the order is paid, show the "Check Out" button
      paymentStatusBtn = (
        <button
          className="bg-yellow-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
          onClick={handleCheckOutClick(selectedOrder?.orderNumber)}>
          Check Out
        </button>
      );
    }
  }
  useEffect(() => {
    setRemarks(selectedOrder?.remarks);
    console.log("Selected Order is", selectedOrder?.remarks);
  }, [selectedOrder?.remarks, setRemarks]);

  useEffect(() => {
    // setRemarks(selectedOrder?.remarks);
    // console.log("tempCartItems: ", tempCartItems);
    // console.log("cartItems: ", cartItems);
    // console.log("Orders list is:", orders);
    // console.log("Tables list is", tables);
    // console.log(orderCounter);
  }, [selectedOrder, tables, cartItems, tempCartItems, orders, orderCounter]);

  return (
    <div className="py-10 w-2/6 flex-auto flex flex-col relative z-20">
      <div className="fixed h-screen w-2/6 overflow-y-scroll pb-20 px-6 space-y-4">
        <div className="rounded-lg px-2 flex my-1 justify-between items-center">
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="text-green-800 text-xl font-bold">Table</div>
                <div className="bg-green-800 text-white px-2 py-1 rounded-full text-xs ml-2">
                  {selectedOrder ? selectedOrder.tableNumber : tableNumber}
                </div>
              </div>
              <div className="text-green-800 text-sm">
                {selectedOrder ? selectedOrder.orderNumber : null}
              </div>
            </div>
          </div>
          {tempCartItems &&
            tempCartItems.items &&
            tempCartItems.items.length > 0 &&
            showEditBtn && showRemarksBtn && (
              <div
                className="bg-green-800 flex items-center pt-2 pb-2 px-3 rounded-md"
                onClick={() => handleAddRemarks()}>
                <div className="text-white cursor-pointer pr-1 text-sm">Add Remarks</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white cursor-pointer">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </div>
            )}
          {tempCartItems &&
            tempCartItems.items &&
            tempCartItems.items.length > 0 &&
            !showEditBtn &&
            selectedOrder?.payment != "Paid" &&
            selectedOrder?.status === "Placed Order" && (
              <div
                onClick={() => {
                  setShowMenu(true);
                  setShowEditBtn(true);
                  setOrderCompleted(false);
                  setIsEditing(true);
                  // if first time selectedOrder don't have remarks, during edit the value of remarks will be undefined.
                  setRemarks(selectedOrder?.remarks);
                  setShowRemarksBtn(true);
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
        {tempCartItems && tempCartItems.items && tempCartItems.items.length > 0 ? (
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
          {Array.isArray(tempCartItems.items) &&
            tempCartItems.items.map((item) => {
              // Calculate total price for the add-ons
              const itemTotalAddOn =
                (item.selectedChoice ? item.selectedChoice.price : 0) +
                (item.selectedMeatLevel ? item.selectedMeatLevel.price : 0) +
                (item.selectedAddOn ? item.selectedAddOn.price : 0);
              return (
                <div key={item.id} className="border rounded-md p-2 shadow-sm">
                  <div className="flex">
                    <Image
                      src={item.image}
                      alt={item.name}
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
                      value={item.selectedChoice.name} // Set the value attribute to item.selectedChoice
                      disabled={
                        !(
                          tempCartItems &&
                          tempCartItems.items &&
                          tempCartItems.items.length > 0 &&
                          showEditBtn &&
                          selectedOrder?.payment !== "Paid"
                        )
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
                      value={item.selectedMeatLevel.level}
                      disabled={
                        !(
                          tempCartItems &&
                          tempCartItems.items &&
                          tempCartItems.items.length > 0 &&
                          showEditBtn &&
                          selectedOrder?.payment !== "Paid"
                        )
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
                      value={item.selectedAddOn.type}
                      disabled={
                        !(
                          tempCartItems &&
                          tempCartItems.items &&
                          tempCartItems.items.length > 0 &&
                          showEditBtn &&
                          selectedOrder?.payment !== "Paid"
                        )
                      }>
                      {item.addOn.map((addOn, index) => (
                        <option key={index} value={addOn.type}>
                          {addOn.type} + RM {addOn.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  )}
                  {item.selectedChoice && (
                    <div className="text-green-800 text-sm font-bold text-right px-2 pt-2">
                      Add On x {item.quantity}: RM{" "}
                      {(parseFloat(itemTotalAddOn) * item.quantity).toFixed(2)}
                    </div>
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
              );
            })}
        </div>
        {isRemarksModalOpen &&
          ((isEditing && selectedOrder === undefined) || selectedOrder?.remarks !== undefined) && (
            <div className="bg-gray-100 p-2 rounded-md">
              {/* <div className="flex justify-between items-center">
                <div
                  className={`text-sm font-bold text-left text-gray-600 pl-2 ${
                    isEditing === true ? "mt-0" : "my-1"
                  }`}>
                  Remarks
                </div>
              </div> */}
              <textarea
                rows={rows}
                value={remarks || ""}
                onChange={(e) => setRemarks(e.target.value)}
                className={` block w-full text-sm text-black rounded-md border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 ${
                  isEditing === true ? "bg-white " : "bg-gray-500 text-white"
                }`}
                placeholder="Type Remarks here..."
                disabled={isEditing ? false : true}
              />
              {isEditing && (
                <div className="flex justify-between px-1 mt-2">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-green-800"
                      onClick={() => setRows(rows > 1 ? rows - 1 : 1)}>
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-sm text-gray-600 px-1">Row</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-green-800"
                      onClick={() => setRows(rows + 1)}>
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
                    onClick={() => handleRemoveRemarks()}>
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          )}

        {/* Subtotal, serviceCharge and Total Section */}
        <div className="bg-gray-100 py-4 px-5 mb-10 rounded-md">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Subtotal</div>
            <div className="text-gray-600 text-sm">{subtotal.toFixed(2)}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Service Charge</div>
            <div className="text-gray-600 text-sm">{serviceCharge.toFixed(2)}</div>
          </div>
          {selectedOrder?.amountReceived && (
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-sm">Amount Received</div>
              <div className="text-gray-600 text-sm">
                {selectedOrder?.amountReceived.toFixed(2)}
              </div>
            </div>
          )}
          {selectedOrder?.amountChange !== undefined && selectedOrder?.amountChange !== null && (
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-sm">Change</div>
              <div className="text-gray-600 text-sm">{selectedOrder?.amountChange.toFixed(2)}</div>
            </div>
          )}
          <hr className="h-px my-6 bg-black border-dashed" />
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-base font-bold">Total Sales</div>
            <div className="text-gray-600 text-base font-bold">RM {total.toFixed(2)}</div>
          </div>
          {selectedOrder?.paymentTime && (
            <div className="text-green-800 text-sm font-bold leading-none">
              Payment Time ({selectedOrder?.paymentTime.split(",")[0]})
            </div>
          )}
        </div>
        {orderStatusBtn}
        {paymentStatusBtn}
        {/* <RemarksModal
          isRemarksModalOpen={isRemarksModalOpen}
          handleRemarksModalClose={handleRemarksModalClose}
          setRemarksOpen={setRemarksOpen}
          setRemarks={setRemarks}
          remarks={remarks}
          selectedOrder={selectedOrder}
        /> */}
        <StatusModal
          isStatusModalOpen={isStatusModalOpen}
          handleStsModalClose={handleStsModalClose}
          setModalOpen={setModalOpen}
          selectedOrder={selectedOrder}
        />
      </div>
    </div>
  );
}
export default React.memo(TableOrderDetails);

// Address & Contact Info

// Order Number or Invoice Number
// Date
// Table Number

// item
// quantity
// Amount

// subtotal
// discount in %???? How do you want to give discount?
// serviceCharge
// received Cash
// change

// Payment Method

// Thank You for Your Order!
// Powered By Josiah
// Wifi Password
