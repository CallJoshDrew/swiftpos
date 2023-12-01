import Image from "next/image";
import React from "react";

export default function CartDetails({
  cartItems,
  taxRate,
  setCartItems,
  isOrderPlaced,
  setIsOrderPlaced,
  selectMenu,
  setSelectMenu,
}) {
  // console.log("Calling from cartDetails", cartItems);
  console.log(taxRate);
  let subtotal = 0;
  let tax = 0;
  let total = 0;

  if (cartItems.length > 0) {
    subtotal = cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    tax = subtotal * taxRate;
    total = subtotal + tax;
  }
  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    //return all the items that are not equal to the id provided(which is the item which need to be removed)
  };
  return (
    <div className="py-10 w-2/6 flex-auto flex flex-col relative">
      <div className="fixed h-screen w-2/6 overflow-y-scroll pb-10 px-6 space-y-4">
        <div className="rounded-lg px-2 flex my-1 justify-between">
          <div className="text-green-800 text-lg font-bold">Take Away</div>
          {isOrderPlaced ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 text-green-800"
              onClick={() => {
                setIsOrderPlaced(false);
                setSelectMenu(true);
              }}>
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
          ) : selectMenu ? (
            cartItems.length === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-red-700"
                onClick={() => setSelectMenu(false)}>
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            ) : null
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-green-700"
              onClick={() => setSelectMenu(!selectMenu)}>
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <hr className="h-px mt-4 mb-5 bg-gray-200 border-0" />
        <div className="bg-gray-100 py-4 px-5 rounded-md">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Subtotal</div>
            <div className="text-gray-600 text-sm">
              RM {subtotal.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-sm">Tax</div>
            <div className="text-gray-600 text-sm">RM {tax.toFixed(2)}</div>
          </div>
          <hr className="h-px my-6 bg-black border-dashed" />
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-base font-bold">Total</div>
            <div className="text-gray-600 text-base font-bold">
              RM {total.toFixed(2)}
            </div>
          </div>
        </div>
        {!isOrderPlaced ? (
          cartItems.length > 0 ? (
            <button
              className="bg-green-700 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
              onClick={() => {
                setIsOrderPlaced(!isOrderPlaced);
                setSelectMenu(false);
              }}>
              Place Order
            </button>
          ) : (
            <button
              className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium"
              disabled>
              Empty Cart
            </button>
          )
        ) : (
          <button className="bg-gray-500 w-full my-4 rounded-md p-2 text-white text-sm font-medium">
            Done
          </button>
        )}
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col border rounded-md p-2 shadow-sm">
              <div className="flex relative">
                <Image
                  src="/sample.png"
                  alt="stew"
                  width="100"
                  height="100"
                  className="sm:h-20 w-20 object-cover rounded-lg"
                />
                <div className="flex flex-col py-1 px-4">
                  <div className="text-black text-base leading-4">
                    {item.name}
                  </div>
                  <div className="text-green-800 text-xs">
                    RM {item.price.toFixed(2)} x {item.quantity}
                  </div>
                  <div className="text-green-800 font-bold text-sm absolute bottom-0 right-2">
                    {(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              {!isOrderPlaced && (
                <div className="flex justify-between px-2 py-1 bg-gray-200 rounded-md mt-3 w-full">
                  <div className="flex items-center gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-green-800"
                      onClick={() => handleDecrease(item.id)}>
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-sm text-black">{item.quantity}</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-green-800"
                      onClick={() => handleIncrease(item.id)}>
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-red-700"
                    onClick={() => handleRemove(item.id)}>
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
