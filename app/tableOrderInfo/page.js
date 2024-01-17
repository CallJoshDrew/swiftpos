import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function TableOrderInfo({ selectedOrder, tables, setTables, showMenu, setShowMenu }) {
  const {
    orderNumber,
    tableName,
    orderTime,
    orderDate,
    status,
    items,
    subTotal,
    serviceCharge,
    totalPrice,
    quantity,
    payment,
    paymentMethod,
    remarks,
  } = selectedOrder;

  useEffect(() => {
    console.log("selectedOrder now is", selectedOrder);
  }, [selectedOrder]);
  return (
    <div className="pt-4 pb-6 w-2/6 flex-auto flex flex-col relative z-20">
      <div className="fixed h-screen w-2/6 overflow-y-scroll pb-20 px-6 space-y-4">
        <div className="rounded-lg px-2 flex my-2 justify-between items-center">
          <div className="flex">
            <div className="flex flex-col">
              <div className="text-green-800 text-lg font-bold">{orderNumber}</div>
            </div>
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0" />
        <div className="flex px-2 items-center justify-between">
          <div className="text-green-800 text-sm font-bold leading-none">{status}</div>
          <div className="text-green-800 text-sm">{orderTime}</div>
        </div>
        <div className="flex flex-col gap-4">
          {Array.isArray(items) &&
            items.map((itemObj) => {
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
                </div>
              );
            })}
        </div>

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
      </div>
    </div>
  );
}

export default React.memo(TableOrderInfo);
