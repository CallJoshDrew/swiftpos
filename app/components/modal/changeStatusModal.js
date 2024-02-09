import React, { useState, useEffect,} from "react";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { ordersAtom } from "../atoms/ordersAtom";
import { tablesAtom } from "../atoms/tablesAtom";

export default function ChangeStatusModal({
  isChangeStatusModalOpen,
  setChangeStatusModalOpen,
  selectedOrder,
  setEditOrderModalOpen,
}) {
  const [orders, setOrders] = useAtom(ordersAtom);
  const [tables, setTables] = useAtom(tablesAtom);
  console.log(selectedOrder?.tableName);
  useEffect(() => {
    console.log("Tables Now is ", tables)
  }, [tables]);
  let statusChangeTo;
  if (selectedOrder?.status === "Cancelled") {
    statusChangeTo = "Placed Order";
  }

  const handleStatusSubmitBtn = () => {
    console.log(selectedOrder?.orderNumber);
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.orderNumber === selectedOrder?.orderNumber) {
          return {
            ...order,
            status: statusChangeTo,
          };
        } else {
          return order;
        }
      });
    });
    if (selectedOrder?.orderType === "Dine-In" && statusChangeTo ==="Placed Order") {
      setTables((prevTables) => {
        return prevTables.map((table) => {
          if (table.name === selectedOrder?.tableName) {
            return { ...table, occupied: true, orderNumber:selectedOrder?.orderNumber };
          } else {
            return table;
          }
        });
      });
    }    
    setChangeStatusModalOpen(false);
    setEditOrderModalOpen(false);
    toast.success(`Status Changed to ${statusChangeTo}`, {
      duration: 500,
      position: "top-center",
      reverseOrder: false,
    });
  };

  if (!isChangeStatusModalOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 -top-10 bg-black opacity-80 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-[340px] text-center">
          <div className="text-xl bg-gray-700 rounded-md text-white p-4">
            Status Now is &quot;{selectedOrder?.status}&quot;
          </div>
          <div className="text-lg text-gray-800 my-3">
            Change status to &quot;{statusChangeTo}&quot;?
          </div>

          <div>
            <button
              className="mr-4 bg-green-800 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={handleStatusSubmitBtn}>
              Yes
            </button>
            <button
              className="bg-gray-700 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setChangeStatusModalOpen(false);
              }}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
