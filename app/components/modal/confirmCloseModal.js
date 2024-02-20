import React from "react";
import { useAtom } from "jotai";
import { tablesAtom } from "../atoms/tablesAtom";
import { tableOrderCountAtom } from "../atoms/tableOrderCountAtom";
import { takeAwayOrderCountAtom } from "../atoms/takeAwayOrderCountAtom";
import { isLinkDisabledAtom } from "../atoms/linkDisableAtom";
import { selectedTableOrderAtom } from "../atoms/selectedTableOrderAtom";
import { selectedTakeAwayOrderAtom } from "../atoms/selectedTakeAwayOrderAtom";
import { ordersAtom } from "../atoms/ordersAtom";

function ConfirmCloseModal({
  isConfirmCloseModal,
  setIsConfirmCloseModal,
  setShowMenu,
  setShowEditBtn,
  setShowEditControls,
  tempCartItems,
  orderType,
  setShowRemarksBtn,
  setShowRemarksArea,
  remarks,
  setRemarks,
  tempRemarks,
}) {
  const [orders, setOrders] = useAtom(ordersAtom);
  const [, setTables] = useAtom(tablesAtom);
  const [, setIsLinkDisabled] = useAtom(isLinkDisabledAtom);
  function useSelectedOrder(orderType) {
    const [selectedTableOrder, setSelectedTableOrder] = useAtom(selectedTableOrderAtom);
    const [selectedTakeAwayOrder, setSelectedTakeAwayOrder] = useAtom(selectedTakeAwayOrderAtom);

    const selectedOrder = orderType === "Dine-In" ? selectedTableOrder : selectedTakeAwayOrder;
    const setSelectedOrder =
      orderType === "Dine-In" ? setSelectedTableOrder : setSelectedTakeAwayOrder;

    return [selectedOrder, setSelectedOrder];
  }
  const [selectedOrder, setSelectedOrder] = useSelectedOrder(orderType);

  function useOrderCounter(orderType) {
    const [tableOrderCounter, setTableOrderCounter] = useAtom(tableOrderCountAtom);
    const [takeAwayOrderCounter, setTakeAwayOrderCounter] = useAtom(takeAwayOrderCountAtom);

    const orderCounter = orderType === "Dine-In" ? tableOrderCounter : takeAwayOrderCounter;
    const setOrderCounter =
      orderType === "Dine-In" ? setTableOrderCounter : setTakeAwayOrderCounter;

    return [orderCounter, setOrderCounter];
  }
  const [, setOrderCounter] = useOrderCounter(orderType);
  // Helper function to update orders
  const updateOrders = (prevOrders, updatedOrder) => {
    const orderIndex = prevOrders.findIndex(
      (order) => order.orderNumber === updatedOrder.orderNumber
    );

    if (orderIndex === -1) {
      return [...prevOrders, updatedOrder];
    } else {
      const updatedOrders = [...prevOrders];
      updatedOrders[orderIndex] = updatedOrder;
      return updatedOrders;
    }
  };
  // Helper function to remove an order
  const removeOrder = (prevOrders, orderToRemove) => {
    return prevOrders.filter((order) => order.orderNumber !== orderToRemove.orderNumber);
  };
  const handleConfirmClose = () => {
    if (selectedOrder?.status === "Status") {
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
      // Remove the order from orders before updating selectedOrder
      setOrders((prevOrders) => removeOrder(prevOrders, selectedOrder));
      setSelectedOrder((prevSelectedOrder) => {
        const updatedOrder = {
          ...prevSelectedOrder,
          tableName: "",
          orderNumber: "Order Number",
          items: [],
          remarks: "No Remarks",
        };
        return updatedOrder;
      });
      setOrderCounter((prevOrderCounter) => prevOrderCounter - 1);
      setShowEditBtn(false);
      console.log("ShowEditBtn Ran");
      setShowRemarksBtn(false);
      setShowRemarksArea(false);
    } else if (selectedOrder?.status === "Placed Order") {
      setShowEditBtn(true);
      console.log("Set to true from ConfirmCloseModal");
      // if (remarks ==="") {
      //   setRemarks("No Remarks");
      // } else {
      //   setRemarks(tempRemarks);
      // }
      setSelectedOrder((prevSelectedOrder) => {
        const updatedOrder = {
          ...prevSelectedOrder,
          items: tempCartItems,
          remarks: remarks === "" ? "No Remarks" : tempRemarks,
        };
        setOrders((prevOrders) => updateOrders(prevOrders, updatedOrder));
        return updatedOrder;
      });
    }
    setIsLinkDisabled(false);
    setShowMenu(false);
    setShowEditControls(false);
    setIsConfirmCloseModal(false);
    setRemarks(selectedOrder?.remarks);
  };

  if (!isConfirmCloseModal) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[300px]">
          <div className="text-2xl text-center font-bold text-green-800 mb-1">Close Menu?</div>
          <div className="text-md text-center font-bold text-green-800 mb-4">
            You have not update the order.
          </div>
          <div className="text-center">
            <button
              className="mr-4 bg-green-800 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={handleConfirmClose}>
              Yes
            </button>
            <button
              className="bg-gray-700 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsConfirmCloseModal(false)}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default React.memo(ConfirmCloseModal);
