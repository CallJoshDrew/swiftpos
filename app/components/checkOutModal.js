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
  // Define a function to close the checkout modal
  const handleModalClose = () => {
    setCheckOutModalOpen(false);
  };

  // Create a new array of tables, updating the one where the customer is checking out
  const updatedTables = tables.map((table) => {
    // Check if the current table's order number matches the selected order's number
    if (table.order.orderNumber === selectedOrder?.orderNumber) {
      // If it does, update the table's order to an empty array, reset the order number, and set occupied to false
      return {
        ...table,
        order: [],
        orderNumber: null,
        occupied: false,
      };
    } else {
      // If it doesn't, return the table as is
      return table;
    }
  });

  // Create a new array of orders, updating the one that is being checked out
  const updatedOrders = orders.map((order) => {
    // Check if the current order's number matches the selected order's number
    if (order.orderNumber === selectedOrder?.orderNumber) {
      // If it does, update the checkout time to the current date and time
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
      // If it doesn't, return the order as is
      return order;
    }
  });

  // Define a function to handle the table checkout
  const handleTableCheckOut = () => {
    // Close the checkout modal
    setCheckOutModalOpen(false);
    // Update the orders and tables state with the new arrays
    setOrders(updatedOrders);
    setTables(updatedTables);
    // Reset the temporary cart items state
    setTempCartItems({ orderNumber: null, items: [] });
    // Update the selected order state
    setSelectedOrder((prevSelectedOrder) => {
      // Check if the previous selected order's number matches the selected order's number
      if (prevSelectedOrder.orderNumber === selectedOrder?.orderNumber) {
        // If it does, update the table number and reset the other properties
        const tableNumber = prevSelectedOrder.tableNumber;
        return {
          tableNumber,
        };
      } else {
        // If it doesn't, return the previous selected order as is
        return prevSelectedOrder;
      }
    });
    // Show a success message to the user
    toast.success("Successfully Check Out!", {
      duration: 2000,
      position: "top-left",
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
