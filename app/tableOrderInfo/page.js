"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function TableOrderInfo({
  selectedOrder,
  setSelectedOrder,
  tables,
  setTables,
  showMenu,
  setShowMenu,
  showEditBtn,
  setShowEditBtn,
  showEditControls,
  setShowEditControls,
  orders,
  setOrders,
  tempCartItems,
  setTempCartItems,
  setPayModalOpen,
  setCheckOutModalOpen,
  remarks,
  setRemarks,
  remarkRows,
  setRemarkRows,
  tempRemarks,
  setTempRemarks,
  showRemarksBtn,
  setShowRemarksBtn,
  showRemarksArea,
  setShowRemarksArea,
}) {
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
  const handleChoiceChange = (itemId, choiceName) => {
    // Update the item's selected choice
    setSelectedOrder((prevOrder) => {
      return {
        ...prevOrder,
        items: prevOrder.items.map((itemObj) =>
          itemObj.item.id === itemId
            ? {
                ...itemObj,
                selectedChoice: itemObj.item.choices.find((choice) => choice.name === choiceName),
              }
            : itemObj
        ),
      };
    });
  };

  // Function to handle the change of an item's meat level
  const handleMeatLevel = (itemId, level) => {
    // Update the item's selected meat level
    setSelectedOrder((prevOrder) => {
      return {
        ...prevOrder,
        items: prevOrder.items.map((itemObj) =>
          itemObj.item.id === itemId
            ? {
                ...itemObj,
                selectedMeatLevel: itemObj.item.meat.find((meat) => meat.level === level),
              }
            : itemObj
        ),
      };
    });
  };

  // Function to handle the addition of an add-on to an item
  const handleAddOn = (itemId, type) => {
    // Update the item's selected add-on
    setSelectedOrder((prevOrder) => {
      return {
        ...prevOrder,
        items: prevOrder.items.map((itemObj) =>
          itemObj.item.id === itemId
            ? { ...itemObj, selectedAddOn: itemObj.item.addOn.find((addOn) => addOn.type === type) }
            : itemObj
        ),
      };
    });
  };

  const handleIncreaseItem = (id) => {
    setSelectedOrder((prevOrder) => {
      return {
        ...prevOrder,
        items: prevOrder.items.map((itemObj) =>
          itemObj.item.id === id ? { ...itemObj, quantity: itemObj.quantity + 1 } : itemObj
        ),
      };
    });
    toast.success("Added to Cart!", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };

  const handleDecreaseItem = (id) => {
    // Decrease the item's quantity by 1, but not less than 1
    setSelectedOrder((prevOrder) => {
      return {
        ...prevOrder,
        items: prevOrder.items.map((itemObj) =>
          itemObj.item.id === id
            ? { ...itemObj, quantity: itemObj.quantity > 1 ? itemObj.quantity - 1 : 1 }
            : itemObj
        ),
      };
    });
    toast.error("Removed from Cart!", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };

  const handleRemoveItem = (id) => {
    setSelectedOrder((prevOrder) => {
      return {
        ...prevOrder,
        items: prevOrder.items.filter((itemObj) => itemObj.item.id !== id),
      };
    });
    toast.error("Removed from Cart!", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };
  const handleAddRemarks = () => {
    setSelectedOrder({
      ...selectedOrder,
      // reason why it is empty string is convenience for user to type straight away wihtout removing the words
      remarks: "",
    });
    setShowRemarksArea(true);
    setShowRemarksBtn(false);
    toast.success("Added to Remarks", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };
  const handleRemoveRemarks = () => {
    // setSelectedOrder((prevOrder) => {
    //   if (prevOrder) {
    //     const newOrder = { ...prevOrder };
    //     delete newOrder.remarks;
    //     return newOrder;
    //   }
    //   return {};
    // });
    setSelectedOrder({
        ...selectedOrder,
        remarks: "No Remarks",
      });
    setShowRemarksArea(false);
    setShowRemarksBtn(true);
    toast.error("Remarks is removed", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };
  const handleEditOrder = () => {
    setShowEditBtn(false);
    // console.log("set to false from handleEditOrder");
    setShowEditControls(true);
    setShowMenu(true);
  };
  let subTotal = 0;
  let serviceCharge = 0;
  let totalPrice = 0;

  // Calculate the subtotal, service charge, and total if there are items in the cart
  if (selectedOrder && selectedOrder.items && selectedOrder.items.length > 0) {
    // Check whether selectedChoice, selectedMeatLevel, and selectedAddOn exist and have a price property before trying to parse it as a float. If they don’t exist or don’t have a price property, I’m defaulting to 0.
    subTotal = selectedOrder.items.reduce((total, itemObj) => {
      const { item, quantity, selectedChoice, selectedMeatLevel, selectedAddOn } = itemObj;
      return (
        total +
        parseFloat(item.price) * quantity +
        (selectedChoice && selectedChoice.price ? parseFloat(selectedChoice.price) * quantity : 0) +
        (selectedMeatLevel && selectedMeatLevel.price
          ? parseFloat(selectedMeatLevel.price) * quantity
          : 0) +
        (selectedAddOn && selectedAddOn.price ? parseFloat(selectedAddOn.price) * quantity : 0)
      );
    }, 0);

    subTotal = parseFloat(subTotal.toFixed(2)); // Round to 2 decimal places

    // Calculate the service charge
    serviceCharge = subTotal * 0;
    serviceCharge = parseFloat(serviceCharge.toFixed(2)); // Round to 2 decimal places

    // Calculate the total
    totalPrice = subTotal + serviceCharge;
    totalPrice = parseFloat(totalPrice.toFixed(2)); // Round to 2 decimal places
  }

  const getFormattedDateAndTime = () => {
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

    return { timeString, dateString };
  };

  const calculateTotalQuantity = (items) => {
    let totalQuantity = 0;
    items.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  const handlePlaceOrderBtn = () => {
    const { timeString, dateString } = getFormattedDateAndTime();
    const totalQuantity = calculateTotalQuantity(selectedOrder?.items);

    const newOrder = {
      ...selectedOrder,
      orderTime: timeString,
      orderDate: dateString,
      status: "Placed Order",
      items: selectedOrder?.items,
      subTotal,
      serviceCharge,
      totalPrice,
      quantity: totalQuantity,
      payment: 0,
      paymentMethod: "",
      remarks: remarks === "" ? "No Remarks" : remarks,
    };

    setSelectedOrder(newOrder);
    setTempCartItems(newOrder.items);
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setShowMenu(false);
    setShowEditControls(false);
    setShowRemarksBtn(false);
    // Only want to show the Edit Btn when client already placed order but haven't pay yet.
    // check newOrder.status instead of selectedOrder.status for the latest status
    if (newOrder.status === "Placed Order" && newOrder.payment !== "Paid") {
      setShowEditBtn(true);
    //   console.log("set to true from handlePlaceOrderBtn");
    } else {
      setShowEditBtn(false);
    //   console.log("set to false from handlePlaceOrderBtn");
    }
    toast.success("Placed Order & Printing Now", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };

  function compareQuantities(items1, items2) {
    if (items1.length !== items2.length) {
      return false;
    }
    for (let i = 0; i < items1.length; i++) {
      // Find the corresponding item in items2
      const correspondingItem = items2.find((item2) => item2.item.id === items1[i].item.id);
      // If there's no corresponding item or the quantities are not the same, return false
      if (!correspondingItem || items1[i].quantity !== correspondingItem.quantity) {
        return false;
      }
    }
    // If we've made it this far, the quantities are the same for all items
    return true;
  }
  let isSameItems = false;

  if (tempCartItems && selectedOrder && selectedOrder.items) {
    const sortedTempCartItems = [...tempCartItems].sort((a, b) => a.item.id - b.item.id);
    const sortedSelectedOrderItems = [...selectedOrder.items].sort((a, b) => a.item.id - b.item.id);

    isSameItems = compareQuantities(sortedTempCartItems, sortedSelectedOrderItems);
  }

  const handleUpdateOrderBtn = () => {
    const totalQuantity = calculateTotalQuantity(selectedOrder?.items);
    const newOrder = {
      ...selectedOrder,
      items: selectedOrder?.items,
      subTotal,
      serviceCharge,
      totalPrice,
      quantity: totalQuantity,
      remarks,
    };
    setSelectedOrder(newOrder);
    setTempCartItems(newOrder.items);
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.orderNumber === selectedOrder.orderNumber) {
          return {
            ...order,
            items: selectedOrder?.items,
            subTotal,
            serviceCharge,
            totalPrice,
            quantity: totalQuantity,
            remarks: remarks === "" ? "No Remarks" : remarks,
          };
        } else {
          return order;
        }
      });
    });
    setShowMenu(false);
    setShowEditControls(false);
    setShowRemarksBtn(false);
    if (newOrder.status === "Placed Order" && newOrder.payment !== "Paid") {
      setShowEditBtn(true);
    //   console.log("set to true from update button");
    } else {
      setShowEditBtn(false);
    //   console.log("set to false from update button");
    }
    toast.success("Successfully Updated Order", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };

  const handlePaymentBtn = () => {
    setPayModalOpen(true);
  };
  const handleCheckOutBtn = () => {
    setCheckOutModalOpen(true);
  };
  let orderStatus;
  let orderStatusCSS;
  let handleMethod;
  if (selectedOrder?.status == "Status" && selectedOrder?.items.length > 0) {
    orderStatus = "Place Order & Print";
    orderStatusCSS = "bg-green-800";
    handleMethod = handlePlaceOrderBtn;
  } else if (selectedOrder?.status === "Status") {
    orderStatus = "Empty Cart";
    orderStatusCSS = "bg-gray-500";
    handleMethod = "Disabled";
  } else if (selectedOrder?.status == "Placed Order" && !showEditBtn) {
    orderStatus = "Update Order & Print";
    isSameItems && remarks === tempRemarks
      ? (orderStatusCSS = "bg-gray-500")
      : (orderStatusCSS = "bg-green-800");
    isSameItems && remarks === tempRemarks
      ? (handleMethod = "Disabled")
      : (handleMethod = handleUpdateOrderBtn);
  } else if (selectedOrder?.status == "Placed Order") {
    orderStatus = "Make Payment";
    orderStatusCSS = "bg-green-800";
    handleMethod = handlePaymentBtn;
  } else if (selectedOrder?.status == "Paid") {
    orderStatus = "Check Out";
    orderStatusCSS = "bg-yellow-500";
    handleMethod = handleCheckOutBtn;
  } else if (selectedOrder?.status == "Check Out") {
    orderStatus = "Completed";
    orderStatusCSS = "bg-gray-500";
    handleMethod = "Disabled";
  } else if (selectedOrder?.status == "Cancelled") {
    orderStatus = "Cancelled";
    orderStatusCSS = "bg-gray-500";
    handleMethod = "Disabled";
  }

  useEffect(() => {
    // console.log("Remarks Btn initial is false NOW is", showRemarksBtn)
    if (selectedOrder?.remarks ==="No Remarks"){
        setShowRemarksBtn(true);
        setShowRemarksArea(false);
    } else {
        setShowRemarksArea(true);
    }
  }, [selectedOrder?.remarks, setShowRemarksArea, setShowRemarksBtn, showRemarksBtn])
  
  // Status => Placed Order => Make Payment => Check Out => Completed
  useEffect(() => {
    console.log("SelectedOrder Remarks Now is", selectedOrder.remarks);
    console.log("Remarks Now is", remarks);
    console.log("tempRemarks Now is", tempRemarks);
    
    if (selectedOrder && selectedOrder.remarks !== tempRemarks) {
      setRemarks((prevRemarks) => selectedOrder.remarks);
      setTempRemarks((prevRemarks) => selectedOrder.remarks);
    }
  }, [selectedOrder, setRemarks, remarks, tempRemarks, setTempRemarks, setShowRemarksArea]);
  // selectedOrder Object is this {orderNumber: '#Table1-0001', tableName: 'Table1', items:[0: {item: {id: 2, name: 'UFO Tart', category: 'Cakes', price: 2.6, image: '/ufoTart.png'}, quantity: 1}]
  //   {orderNumber: '#Table1-0001', tableName: 'Table1', items:[0: {item: {id: 17, name: 'Goreng Kering', category: 'Dish', price: 9, image: '/gorengKering.png', price:"9", selection:true}, quantity: 1, selectedChoice: {name: 'Campur', price: 0}, selectedMeatLevel: 'Not Available', selectedAddOn:"Not Available"}]}
  // items is an array of objects, and each object has an item property which itself is an object with an id property.
  // To access the id of each item, you would need to first iterate over the items array, then access the item property of each object in the array, and finally access the id property of the item object.
  // method: selectedOrder.items.map(itemObject => console.log(itemObject.item.id));
  useEffect(() => {
    // selectedOrder.items.map(itemObject => console.log(itemObject.item.id));
    // console.log("Tables Now is", tables);
    // console.log("Orders Now is", orders);
    // console.log("showEdit Button Initial State is False But Now is", showEditBtn);
    // console.log("showEdit Button Initial State is True But Now is", showEditControls);
    // console.log("SelectedOrder Items Now is", selectedOrder.items);
    // console.log("TempCartItems Now is", tempCartItems);
  }, [selectedOrder, tables, orders, showEditBtn, showEditControls, tempCartItems, remarks]);
  return (
    <div className="pt-4 pb-6 w-2/6 flex-auto flex flex-col relative z-20">
      <div className="fixed h-screen w-2/6 overflow-y-scroll pb-20 px-6 space-y-4">
        <div className="rounded-lg flex my-2 justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <div className="text-green-800 text-lg font-bold">{selectedOrder?.orderNumber}</div>
            <div className="flex">
              {!showEditBtn && showRemarksBtn && (selectedOrder?.items.length > 0) && (
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
              {Array.isArray(selectedOrder?.items) &&
                showEditBtn &&
                selectedOrder?.status !== "Paid" &&
                selectedOrder?.status !== "Completed" &&
                selectedOrder?.status !== "Cancelled" && (
                  <div onClick={() => handleEditOrder()}>
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
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0" />
        <div className="flex px-2 items-center justify-between">
          <div className="text-green-800 text-sm font-bold leading-none">
            {selectedOrder?.status}
          </div>
          <div className="text-green-800 text-sm">{selectedOrder?.orderTime}</div>
        </div>
        <div className="flex flex-col gap-4">
          {Array.isArray(selectedOrder?.items) &&
            selectedOrder?.items.map((itemObj) => {
              const { item, quantity, selectedChoice, selectedMeatLevel, selectedAddOn } = itemObj; // Destructure from itemObj
              const itemTotalAddOn =
                (selectedChoice && selectedChoice.price ? parseFloat(selectedChoice.price) : 0) +
                (selectedMeatLevel && selectedMeatLevel.price
                  ? parseFloat(selectedMeatLevel.price)
                  : 0) +
                (selectedAddOn && selectedAddOn.price ? parseFloat(selectedAddOn.price) : 0);

              return (
                <div key={`${item.id}-${uniqueId}`} className="border rounded-md p-2 shadow-sm">
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
                          {item.name} x {quantity}
                        </div>
                        <div className="text-green-800 font-bold text-base ">
                          {(parseFloat(item.price) * quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {item.choices && (
                    <select
                      id="choices"
                      className="block appearance-none w-full my-2 py-2 text-right bg-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 text-sm text-gray-600 focus:bg-white"
                      onChange={(e) => handleChoiceChange(item.id, e.target.value)}
                      value={selectedChoice.name} // Use selectedChoice.name here
                      disabled={showEditControls ? false : true}>
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
                      value={selectedMeatLevel.level}
                      disabled={showEditControls ? false : true}>
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
                      value={selectedAddOn.type}
                      disabled={showEditControls ? false : true}>
                      {item.addOn.map((addOn, index) => (
                        <option key={index} value={addOn.type}>
                          {addOn.type} + RM {addOn.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  )}
                  {selectedChoice && (
                    <div className="text-green-800 text-sm font-bold text-right px-2 pt-2">
                      Add On x {quantity}: RM {(parseFloat(itemTotalAddOn) * quantity).toFixed(2)}
                    </div>
                  )}
                  {showEditControls && (
                    <div className="flex justify-between px-2 py-2 bg-gray-200 rounded-md mt-3 w-full">
                      <div className="flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-green-800"
                          onClick={() => handleIncreaseItem(item.id)}>
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="text-sm text-black">{quantity}</div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={
                            quantity > 1 ? "w-6 h-6 text-green-800" : "w-6 h-6 text-gray-200"
                          }
                          onClick={quantity > 1 ? () => handleDecreaseItem(item.id) : null}>
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-red-700"
                        onClick={() => handleRemoveItem(item.id)}>
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
        {showRemarksArea && (
          <div className={`bg-gray-100 rounded-md ${showEditControls === true ? "p-2" : "p-0"}`}>
            <textarea
              rows={remarkRows}
              value={remarks || ""}
              onChange={(e) => setRemarks(e.target.value)}
              className={` block w-full text-sm text-black rounded-md border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 ${
                showEditControls === true ? "bg-white " : "bg-gray-100 text-gray-600"
              }`}
              placeholder="Type Remarks here..."
              disabled={showEditControls ? false : true}
            />
            {showEditControls && (
              <div className="flex justify-between px-1 mt-2">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-green-800"
                    onClick={() => setRemarkRows(remarkRows + 1)}>
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-sm text-gray-600 px-1">Row</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={remarkRows > 1 ? "w-6 h-6 text-green-800" : "w-6 h-6 text-gray-100"}
                    onClick={() => setRemarkRows(remarkRows > 1 ? remarkRows - 1 : null)}>
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
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
        <div className="bg-gray-100 py-4 px-5 mb-10 rounded-md">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Subtotal</div>
            <div className="text-gray-600 text-sm">{subTotal.toFixed(2)}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Service Charge</div>
            <div className="text-gray-600 text-sm">{serviceCharge.toFixed(2)}</div>
          </div>
          <hr className="h-px my-6 bg-black border-dashed" />
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-base font-bold">Total Sales</div>
            <div className="text-gray-600 text-base font-bold">RM {totalPrice.toFixed(2)}</div>
          </div>
        </div>
        <button
          className={`${orderStatusCSS} text-white w-full my-4 rounded-md p-2 text-sm font-medium`}
          onClick={handleMethod !== "Disabled" ? handleMethod : undefined}
          disabled={handleMethod === "Disabled"}>
          {/* The disabled attribute is true if handleMethod is "Disabled" */}
          {orderStatus}
        </button>
      </div>
    </div>
  );
}

export default React.memo(TableOrderInfo);

// showEditBtn
// Status === "Placed Order" && payment !=="Paid"
// setShowEditBtn(true);
// esle setShowEditBtn(false);
