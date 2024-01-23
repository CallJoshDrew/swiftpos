import React from "react";

function ConfirmCloseModal({
  isOpenMsg,
  onCloseMsg,
  setShowMenu,
  setShowEditBtn,
  setOrderCompleted,
  setTempCartItems,
  cartItems,
  setIsEditingRemarks,
  setShowRemarksText,
  setRemarks,
  remarks,
  selectedOrder,
  setSelectedOrder,
  isEmptyString,
  setEmptyString,
  setShowRemarksBtn,
}) {
  // console.log("Remarks is",remarks);
  // console.log("Selector Remarks is",selectedOrder?.remarks);
  const handleMessageStatus = () => {
    //This means selectedOrder is an empty object {}
    // Object.keys(selectedOrder)?.length === 0
    if (selectedOrder?.remarks ==""){
      setShowRemarksBtn(false);
      console.log(selectedOrder?.remarks);
    } 
    setShowMenu(false);
    setShowEditBtn(false);
    setOrderCompleted(true);
    // Update tempCartItems with cartItems when "Yes" is clicked
    setTempCartItems(cartItems);
    // console.log("Do i have you", selectedOrder);
    const orderRemarks = selectedOrder?.remarks;
    // console.log (orderRemarks);
    setRemarks(orderRemarks);
    // isEmptyString initial state is false.
    if (orderRemarks === "") {
      setEmptyString(true);
    } else {
      setEmptyString(false);
    }
    // setSelectedOrder({
    //   ...selectedOrder,
    //   // reason why it is empty string is convenience for user to type straight away wihtout removing the words
    //   remarks: "",
    // });
    setIsEditingRemarks(false);
    setShowRemarksText(true);
    onCloseMsg();
  };

  if (!isOpenMsg) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[300px]">
          <div className="text-2xl text-center font-bold text-green-800 mb-4">Are you sure?</div>
          <div className="text-center">
            <button
              className="mr-4 bg-green-800 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={handleMessageStatus}>
              Yes
            </button>
            <button
              className="bg-gray-700 text-sm text-white font-bold py-2 px-4 rounded"
              onClick={onCloseMsg}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default React.memo(ConfirmCloseModal);
