import Image from "next/image";
import React from "react";

function TableDetails() {
  return (
    <div className="row-span-6 col-span-3 py-10 flex flex-col items-center relative">
      <div className="fixed h-screen overflow-y-scroll pb-10">
        <div className="rounded-lg px-2 flex mx-auto my-1 w-72">
          <div className="text-black text-2xl font-bold mr-40">Table 1</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-green-800">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </div>
        <hr class="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="flex flex-col gap-4">
          <div className="flex border rounded-md p-2 shadow-sm">
            <Image
              src="/sample.png"
              alt="stew"
              width="50"
              height="50"
              className="sm:h-20 w-20 object-cover rounded-lg"
            />
            <div className="flex flex-col py-1 px-4 relative">
              <div className="text-black text-base">Watan Hor</div>
              <div className="text-green-800 text-xs">RM 9.00 x 1</div>
              <div className="text-green-800 font-bold text-sm absolute bottom-0 -right-20">
                RM 9.00
              </div>
            </div>
          </div>
          <div className="flex border rounded-md p-2 shadow-sm">
            <Image
              src="/sample.png"
              alt="stew"
              width="50"
              height="50"
              className="sm:h-20 w-20 object-cover rounded-lg"
            />
            <div className="flex flex-col py-1 px-4 relative">
              <div className="text-black text-base">Watan Hor</div>
              <div className="text-green-800 text-xs">RM 9.00 x 1</div>
              <div className="text-green-800 font-bold text-sm absolute bottom-0 -right-20">
                RM 9.00
              </div>
            </div>
          </div>
          <div className="flex border rounded-md p-2 shadow-sm">
            <Image
              src="/sample.png"
              alt="stew"
              width="50"
              height="50"
              className="sm:h-20 w-20 object-cover rounded-lg"
            />
            <div className="flex flex-col py-1 px-4 relative">
              <div className="text-black text-base">Watan Hor</div>
              <div className="text-green-800 text-xs">RM 9.00 x 1</div>
              <div className="text-green-800 font-bold text-sm absolute bottom-0 -right-20">
                RM 9.00
              </div>
            </div>
          </div>
          <div className="flex border rounded-md p-2 shadow-sm">
            <Image
              src="/sample.png"
              alt="stew"
              width="50"
              height="50"
              className="sm:h-20 w-20 object-cover rounded-lg"
            />
            <div className="flex flex-col py-1 px-4 relative">
              <div className="text-black text-base">Watan Hor</div>
              <div className="text-green-800 text-xs">RM 9.00 x 1</div>
              <div className="text-green-800 font-bold text-sm absolute bottom-0 -right-20">
                RM 9.00
              </div>
            </div>
          </div>
          <div className="flex border rounded-md p-2 shadow-sm">
            <Image
              src="/sample.png"
              alt="stew"
              width="50"
              height="50"
              className="sm:h-20 w-20 object-cover rounded-lg"
            />
            <div className="flex flex-col py-1 px-4 relative">
              <div className="text-black text-base">Watan Hor</div>
              <div className="text-green-800 text-xs">RM 9.00 x 1</div>
              <div className="text-green-800 font-bold text-sm absolute bottom-0 -right-20">
                RM 9.00
              </div>
            </div>
          </div>
        </div>
        <div className="relative mb-10">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-green-700 absolute right-0 top-4">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
          <div className="bg-gray-200 py-4 px-5 rounded-md">
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-sm">Subtotal</div>
              <div className="text-gray-600 text-sm">RM 27.00</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-sm">Tax</div>
              <div className="text-gray-600 text-sm">0</div>
            </div>
            <hr class="h-px my-6 bg-black border-dashed" />
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-base font-bold">Total</div>
              <div className="text-gray-600 text-base font-bold">RM 27.00</div>
            </div>
          </div>
          <button className=" bg-green-700 w-full my-4 rounded-md p-2 text-white text-lg font-medium">
            Place Order
          </button>
      </div>
    </div>
  );
}

export default TableDetails;
