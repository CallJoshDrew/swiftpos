import React from "react";

function ConfirmCloseModal({
  isConfirmCloseModal,
  setIsConfirmCloseModal,
  setShowMenu,
  setShowEditBtn,
  setShowEditControls,
  tempCartItems,
  selectedOrder,
  setSelectedOrder,
  setTables,
  setOrderCounter,
  setShowRemarksBtn,
  setShowRemarksArea,
  setRemarks,
}) {
  const { status, orderNumber } = selectedOrder;

  const handleConfirmClose = () => {
    if (status === "Status") {
      setTables((prevTables) => {
        return prevTables.map((table) => {
          if (table.orderNumber === orderNumber) {
            const { orderNumber, occupied, ...rest } = table;
            return rest;
          } else {
            return table;
          }
        });
      });
      setSelectedOrder((prevSelectedOrder) => {
        return {
          ...prevSelectedOrder,
          tableName: "",
          orderNumber: "Order Number",
          items: [],
        };
      });
      setOrderCounter((prevOrderCounter) => prevOrderCounter - 1);
      setShowRemarksBtn(false);
      setShowRemarksArea(false);
    } else if (status === "Placed Order") {
      setShowEditBtn(true);
      console.log("Set to true from ConfirmCloseModal");
      setSelectedOrder((prevOrder) => {
        return {
          ...prevOrder,
          items: tempCartItems,
        };
      });
    }
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
