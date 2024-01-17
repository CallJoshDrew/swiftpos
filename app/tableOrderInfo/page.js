"use client"
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
}) {
//   const {
//     orderNumber,
//     tableName,
//     orderTime,
//     orderDate,
//     status,
//     items,
//     subTotal,
//     serviceCharge,
//     totalPrice,
//     quantity,
//     payment,
//     paymentMethod,
//     remarks,
//   } = selectedOrder;

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
      position: "top-left",
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
      position: "top-left",
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
      position: "top-left",
      reverseOrder: false,
    });
  };
  const calculateTotalQuantity = (items) => {
    let totalQuantity = 0;
    items.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  const handlePlaceOrderBtn = () => {
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
    const totalQuantity = calculateTotalQuantity(selectedOrder.items);

    setSelectedOrder((prevOrder) => {
      return {
        ...prevOrder,
        tableName: "",
        orderTime: timeString,
        orderDate: dateString,
        status: "Placed Order",
        items: selectedOrder.items,
        subTotal: 0,
        serviceCharge: 0,
        totalPrice: 0,
        quantity: totalQuantity,
        payment: 0,
        paymentMethod: "",
        remarks: "",
      };
    });
    setShowMenu(false);
    setShowEditBtn(false);
    toast.success("Placed Order & Printing Now", {
      duration: 1000,
      position: "top-left",
      reverseOrder: false,
    });
  };
  const handlePaymentBtn = () => {
    setSelectedOrder((prevOrder) => {
      return {
        ...prevOrder,
        status: "Paid",
      };
    });
    toast.success("Payment Done", {
      duration: 1000,
      position: "top-left",
      reverseOrder: false,
    });
  };
  const handleCheckOutBtn = () => {
    setSelectedOrder((prevOrder) => {
      return {
        ...prevOrder,
        status: "Completed",
      };
    });
    toast.success("Check Out", {
      duration: 1000,
      position: "top-left",
      reverseOrder: false,
    });
  };
  let orderStatus;
  let orderStatusCSS;
  let handleMethod;
  if (selectedOrder.status == "Status" && selectedOrder.items.length > 0) {
    orderStatus = "Place Order & Print";
    orderStatusCSS = "bg-green-800";
    handleMethod = handlePlaceOrderBtn;
  } else if (selectedOrder.status === "Status") {
    orderStatus = "Empty Cart";
    orderStatusCSS = "bg-gray-500";
    handleMethod = "Disabled";
  } else if (selectedOrder.status == "Placed Order") {
    orderStatus = "Make Payment";
    orderStatusCSS = "bg-green-800";
    handleMethod = handlePaymentBtn;
  } else if (selectedOrder.status == "Paid") {
    orderStatus = "Check Out";
    orderStatusCSS = "bg-yellow-500";
    handleMethod = handleCheckOutBtn;
  } else if (selectedOrder.status == "Check Out") {
    orderStatus = "Completed";
    orderStatusCSS = "bg-gray-500";
    handleMethod = "Disabled";
  } else if (selectedOrder.status == "Cancelled") {
    orderStatus = "Cancelled";
    orderStatusCSS = "bg-gray-500";
    handleMethod = "Disabled";
  }
  // Status => Placed Order => Make Payment => Check Out => Completed

  useEffect(() => {
    console.log("selectedOrder now is", selectedOrder);
  }, [selectedOrder]);
  return (
    <div className="pt-4 pb-6 w-2/6 flex-auto flex flex-col relative z-20">
      <div className="fixed h-screen w-2/6 overflow-y-scroll pb-20 px-6 space-y-4">
        <div className="rounded-lg px-2 flex my-2 justify-between items-center">
          <div className="flex">
            <div className="flex flex-col">
              <div className="text-green-800 text-lg font-bold">{selectedOrder.orderNumber}</div>
            </div>
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0" />
        <div className="flex px-2 items-center justify-between">
          <div className="text-green-800 text-sm font-bold leading-none">{selectedOrder.status}</div>
          <div className="text-green-800 text-sm">{selectedOrder.orderTime}</div>
        </div>
        <div className="flex flex-col gap-4">
          {Array.isArray(selectedOrder.items) &&
            selectedOrder.items.map((itemObj) => {
              const { item, quantity } = itemObj;
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
                          {item.name} x {quantity}
                        </div>
                        <div className="text-green-800 font-bold text-base ">
                          {(parseFloat(item.price) * quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {showEditBtn && (
                    <div className="flex justify-between px-2 py-2 bg-gray-200 rounded-md mt-3 w-full">
                      <div className="flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-green-800"
                          onClick={() => handleDecreaseItem(item.id)}>
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="text-sm text-black">{quantity}</div>
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
        <div className="bg-gray-100 py-4 px-5 mb-10 rounded-md">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Subtotal</div>
            <div className="text-gray-600 text-sm">{selectedOrder.subTotal.toFixed(2)}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Service Charge</div>
            <div className="text-gray-600 text-sm">{selectedOrder.serviceCharge.toFixed(2)}</div>
          </div>
          <hr className="h-px my-6 bg-black border-dashed" />
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-base font-bold">Total Sales</div>
            <div className="text-gray-600 text-base font-bold">RM {selectedOrder.totalPrice.toFixed(2)}</div>
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
