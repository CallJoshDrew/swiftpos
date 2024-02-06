"use client";
import { useEffect, useState } from "react";

export default function Receipts() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  useEffect(() => {
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  const handleCalendarBtn = () => {
    console.log("Clicked Calendar Btn")
  };

  const handleSelectedOrderBtn = (orderNumber) => {
    const order = orders.find((order) => order.orderNumber === orderNumber);
    const itemsWithOrderID = order.items.map((item) => ({
      ...item,
    }));
    console.log(itemsWithOrderID);
    console.log(orderNumber);
  }
  return (
    <>
      <div className="bg-gray-100 w-5/6 flex-auto flex flex-col gap-2 pt-10 px-4 z-9">
        <div className="flex justify-between w-full">
          <div className="pb-1 ml-2 text-lg text-green-800 font-bold">Today Orders</div>
          <button
            className="text-xs py-2 px-4 bg-green-800 text-white rounded-md"
            onClick={() => handleCalendarBtn()}>
            Calendar
          </button>
        </div>
        <div className="rounded-lg overflow-hidden border shadow-sm">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-green-800 text-white text-center">
                <th className="px-4 py-4 border-b font-light">No.</th>
                <th className="px-4 py-4 border-b font-light">Table</th>
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
                  <td className="border px-4 py-2">{index+1}</td>
                  <td className="border px-4 py-2">{order.tableName}</td>
                  <td className="border px-4 py-2">{order.orderTime}</td>
                  <td
                    className={`border px-4 py-2 ${
                      order.status === "Cancelled" ? "line-through" : ""
                    }`}>
                    {order.quantity}
                  </td>
                  <td
                    className={`border px-4 py-2 ${
                      order.status === "Cancelled" ? "line-through" : ""
                    }`}>
                    {order.totalPrice.toFixed(2)}
                  </td>

                  <td
                    className={`border px-4 py-2 rounded-md text-sm ${
                      order.status === "Completed" || order.status === "Paid"
                        ? "text-green-800"
                        : order.status === "Cancelled"
                        ? "text-red-700"
                        : order.status === "Placed Order"
                        ? "text-yellow-500"
                        : ""
                    }`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
