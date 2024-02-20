"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { ordersAtom } from "../components/atoms/ordersAtom";
import EditOrderDetailsModal from "../components/modal/editOrderDetailsModal";
import OrdersCalendarModal from "../components/modal/ordersCalendarModal";
import ChangeStatusModal from "../components/modal/changeStatusModal";
import { useRouter } from "next/navigation";
import { todayRegisteredAtom } from "../components/atoms/todayRegisteredAtom";

export default function TotalOrders() {
  const [orders, setOrders] = useAtom(ordersAtom);
  const [todayRegistered, setTodayRegistered] = useAtom(todayRegisteredAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isEditOrderModalOpen, setEditOrderModalOpen] = useState(false);
  const [isChangeStatusModalOpen, setChangeStatusModalOpen] = useState(false);
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);

  const handleCalendarBtn = () => {
    setCalendarModalOpen(true);
  };

  const handleSelectedOrderBtn = (orderNumber) => {
    const selectedOrder = orders.find((order) => order.orderNumber === orderNumber);
    // const itemsWithOrderID = selectedOrder.items.map((item) => ({
    //   ...item,
    // }));
    setSelectedOrder(selectedOrder);
    setEditOrderModalOpen(true);
  };
  useEffect(() => {
    if (todayRegistered.openForRegister === false) {
      setLoading(true);
      toast.success("Please Register First", {
        duration: 1000,
        position: "top-center",
        reverseOrder: false,
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [todayRegistered, router]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-w-full min-h-screen flex items-center justify-center z-10">
        <div className="loader ease-linear rounded-full border-4 h-12 w-12 mb-4"></div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-gray-100 w-5/6 flex-auto flex flex-col gap-2 pt-10 px-4 z-9">
        <div className="flex justify-between w-full">
          <div className="pb-1 ml-2 text-lg text-green-800 font-bold">Today&apos;s Orders</div>
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
                <th className="px-4 py-4 border-b font-light">Order Number</th>
                <th className="px-4 py-4 border-b font-light">Order Time</th>
                <th className="px-4 py-4 border-b font-light">Qty</th>
                <th className="px-4 py-4 border-b font-light">Status</th>
                <th className="px-4 py-4 border-b font-light">Payment</th>
                <th className="px-4 py-4 border-b font-light">Sales (RM)</th>
                <th className="px-4 py-4 border-b font-light">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr className="text-center">
                  <td colSpan="8" className="py-4 text-gray-500 px-4">
                    No data is available / Please place your first order.
                  </td>
                </tr>
              ) : (
                orders
                  .filter(
                    (order) =>
                      (order.status === "Completed" || order.status === "Cancelled") &&
                      new Date(order.orderDate).toDateString() === selectedDate.toDateString()
                    // toDateString() = Fri Feb 09 2024, without it = Fri Feb 09 2024 20:18:19 GMT+0800 (Malaysia Time)
                  )
                  .map((order, index) => (
                    <tr
                      key={index}
                      className={`${
                        order.orderNumber === selectedOrder.orderNumber ? "bg-gray-100" : "bg-white"
                      } text-gray-600 text-center hover:bg-gray-200 transition-colors duration-200`}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{order.orderNumber}</td>
                      <td className="border px-4 py-2">{order.orderTime}</td>
                      <td
                        className={`border px-4 py-2 ${
                          order.status === "Cancelled" ? "line-through" : ""
                        }`}>
                        {order.quantity}
                      </td>
                      <td
                        className={`border px-4 py-2 rounded-md text-sm ${
                          order.status === "Completed"
                            ? "text-green-800"
                            : order.status === "Cancelled"
                            ? "text-red-700"
                            : ""
                        }`}>
                        {order.status}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          order.status === "Cancelled" ? "line-through" : ""
                        }`}>
                        {order.paymentMethod ? order.paymentMethod : "None"}
                      </td>
                      <td
                        className={`border px-4 py-2 ${
                          order.status === "Cancelled" ? "line-through" : ""
                        }`}>
                        {order.totalPrice.toFixed(2)}
                      </td>
                      <td
                        className="border px-4 py-2 text-green-800 underline flex justify-center"
                        onClick={() => handleSelectedOrderBtn(order.orderNumber)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        {isEditOrderModalOpen && (
          <EditOrderDetailsModal
            isEditOrderModalOpen={isEditOrderModalOpen}
            setEditOrderModalOpen={setEditOrderModalOpen}
            selectedOrder={selectedOrder}
            setChangeStatusModalOpen={setChangeStatusModalOpen}
          />
        )}
        <OrdersCalendarModal
          isCalendarModalOpen={isCalendarModalOpen}
          setCalendarModalOpen={setCalendarModalOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {isChangeStatusModalOpen && (
          <ChangeStatusModal
            isChangeStatusModalOpen={isChangeStatusModalOpen}
            setChangeStatusModalOpen={setChangeStatusModalOpen}
            selectedOrder={selectedOrder}
            setEditOrderModalOpen={setEditOrderModalOpen}
          />
        )}
      </div>
    </>
  );
}
