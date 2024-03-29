import React from "react";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { ordersAtom } from "../atoms/ordersAtom";
import { tablesAtom } from "../atoms/tablesAtom";
import { selectedTableOrderAtom } from "../atoms/selectedTableOrderAtom";
import { selectedTakeAwayOrderAtom } from "../atoms/selectedTakeAwayOrderAtom";

function CheckOutModal({
  isCheckOutModalOpen,
  setCheckOutModalOpen,
  setTempCartItems,
  orderType,
}) {
  const [, setTables] = useAtom(tablesAtom);
  const [, setOrders] = useAtom(ordersAtom);
  function useSelectedOrder(orderType) {
    const [selectedTableOrder, setSelectedTableOrder] = useAtom(selectedTableOrderAtom);
    const [selectedTakeAwayOrder, setSelectedTakeAwayOrder] = useAtom(selectedTakeAwayOrderAtom);
  
    const selectedOrder = orderType === "Dine-In" ? selectedTableOrder : selectedTakeAwayOrder;
    const setSelectedOrder =
      orderType === "Dine-In" ? setSelectedTableOrder : setSelectedTakeAwayOrder;
  
    return [selectedOrder, setSelectedOrder];
  }
  const [selectedOrder, setSelectedOrder] = useSelectedOrder(orderType);

  // Define a function to close the checkout modal
  const handleModalClose = () => {
    setCheckOutModalOpen(false);
  };

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

  const handleTableCheckOut = () => {
    const { timeString, dateString } = getFormattedDateAndTime();
    setCheckOutModalOpen(false);
    setTempCartItems([]);
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.orderNumber === selectedOrder?.orderNumber) {
          return {
            ...order,
            status: "Completed",
            checkOut: `${timeString}, ${dateString}`,
          };
        } else {
          return order;
        }
      });
    });
    setSelectedOrder((prevOrder) => {
      return {
        ...prevOrder,
        status: "Completed",
        checkOut: `${timeString}, ${dateString}`,
      };
    });
    if (selectedOrder?.orderType === "Dine-In") {
      setTables((prevTables) => {
        return prevTables.map((table) => {
          if (table.orderNumber === selectedOrder?.orderNumber) {
            const { orderNumber, occupied, ...rest } = table;
            return rest;
          } else {
            return table;
          }
        });
      });
    }
    toast.success("Successfully Check Out!", {
      duration: 1000,
      position: "top-center",
      reverseOrder: false,
    });
  };

  // If the checkout modal is not open, don't render anything
  if (!isCheckOutModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[300px]">
          <div className="text-2xl text-center font-bold text-green-800 mb-4">Check Out Now?</div>
          <div className="text-center">
            <button
              className="mr-4 bg-green-800 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={handleTableCheckOut}>
              Yes
            </button>
            <button
              className="bg-gray-700 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={handleModalClose}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default React.memo(CheckOutModal);
