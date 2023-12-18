import React from "react";
import toast from "react-hot-toast";

function ConfirmModal({
  isOpenMsg,
  onCloseMsg,
  message,
  setShowMenu,
  setShowEditBtn,
  setCartItems,
}) {
  const handleMessageStatus = () => {
    setShowMenu(false);
    setShowEditBtn(false);
    setCartItems([]);
    onCloseMsg();
    // toast.success("Payment Done'", {
    //   duration: 2000,
    //   position: "top-left",
    //   reverseOrder: false,
    // });
  };

  if (!isOpenMsg) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[300px]">
          <div className="text-2xl text-center font-bold text-green-800 mb-4">
            {message}
          </div>
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
export default React.memo(ConfirmModal);