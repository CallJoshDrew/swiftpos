import React from "react";
import toast from "react-hot-toast";

function CheckOutModal({
  isCheckOutModalOpen,
  setCheckOutModalOpen,
  tables,
  setTables,
  selectedOrder,
  setSelectedOrder,
  setTempCartItems,
  orders,
  setOrders,
}) {
  const handleModalClose = () => {
    setCheckOutModalOpen(false);
  };
  // update table when customer leave and check out after payment
  const updatedTables = tables.map((table) => {
    if (table.order.orderNumber === selectedOrder?.orderNumber) {
      return {
        ...table,
        order: [],
        orderNumber: null,
        occupied: false,
      };
    } else {
      return table;
    }
  });
  // Update the orders array
  const updatedOrders = orders.map((order) => {
    if (order.orderNumber === selectedOrder?.orderNumber) {
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

      return {
        ...order,
        checkOut: `${timeString}, ${dateString}`,
      };
    } else {
      return order;
    }
  });

  const handleTableCheckOut = () => {
    setCheckOutModalOpen(false);
    setOrders(updatedOrders);
    setTables(updatedTables);
    setTempCartItems([]);
    setSelectedOrder((prevSelectedOrder) => {
      if (prevSelectedOrder.orderNumber === selectedOrder?.orderNumber) {
        const tableNumber = prevSelectedOrder.tableNumber;
        return {
          tableNumber,
        };
      } else {
        return prevSelectedOrder;
      }
    });
    toast.success("Successfully Check Out", {
      duration: 2000,
      position: "top-left",
      reverseOrder: false,
    });
  };
  //   const handleMessageStatus = () => {
  //     setShowMenu(false);
  //     setShowEditBtn(false);
  //     setOrderCompleted(true);
  //     // Update tempCartItems with cartItems when "Yes" is clicked
  //     setTempCartItems(cartItems);
  //     onCloseMsg();
  //   };

  if (!isCheckOutModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[300px]">
          <div className="text-2xl text-center font-bold text-green-800 mb-4">
            Check Out Now?
          </div>
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
