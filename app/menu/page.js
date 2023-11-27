import Image from "next/image";
import React from "react";

export default function Menu() {
  return (
    <div className="bg-gray-100 w-3/6 flex-auto flex flex-col gap-2 py-10 px-4">
      <div className="grid grid-cols-5 grid-rows-1 gap-4">
        <button className="group hover:bg-yellow-500 bg-green-700 rounded-lg text-white flex items-center justify-center flex-col py-4">
          <div className="text-lg group-hover:text-black">All</div>
          <div className="text-xs group-hover:text-black">40 items</div>
        </button>
        <button className="group hover:bg-yellow-500 bg-white rounded-lg text-white flex items-center justify-center flex-col py-4">
          <div className="text-lg text-black group-hover:text-white">Main</div>
          <div className="text-xs text-black group-hover:text-white">
            20 items
          </div>
        </button>
        <button className="group hover:bg-yellow-500 bg-white rounded-lg text-white flex items-center justify-center flex-col py-4">
          <div className="text-lg text-black group-hover:text-white">
            Drinxs
          </div>
          <div className="text-xs text-black group-hover:text-white">
            20 items
          </div>
        </button>
        <button className="group hover:bg-yellow-500 bg-white rounded-lg text-white flex items-center justify-center flex-col py-4">
          <div className="text-lg text-black group-hover:text-white">
            Cakes
          </div>
          <div className="text-xs text-black group-hover:text-white">
            20 items
          </div>
        </button>
      </div>
      {/* card begins here */}
        <div className="group rounded-lg flex flex-wrap justify-start gap-x-4">
          <div className="rounded-lg my-2 bg-white border-2 border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="sm:h24 w-32 object-cover m-2 rounded-lg"
            />
            <div className="my-3 mx-2">
              <span className="text-xs font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-xs ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-xs w-full p-1 rounded-md mt-4">
                add to table
              </button>
            </div>
          </div>
          <div className="rounded-lg my-2 bg-white border-2 border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="sm:h24 w-32 object-cover m-2 rounded-lg"
            />
            <div className="my-3 mx-2">
              <span className="text-xs font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-xs ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-xs w-full p-1 rounded-md mt-4">
                add to table
              </button>
            </div>
          </div>
          <div className="rounded-lg my-2 bg-white border-2 border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="sm:h24 w-32 object-cover m-2 rounded-lg"
            />
            <div className="my-3 mx-2">
              <span className="text-xs font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-xs ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-xs w-full p-1 rounded-md mt-4">
                add to table
              </button>
            </div>
          </div>
          <div className="rounded-lg my-2 bg-white border-2 border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="sm:h24 w-32 object-cover m-2 rounded-lg"
            />
            <div className="my-3 mx-2">
              <span className="text-xs font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-xs ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-xs w-full p-1 rounded-md mt-4">
                add to table
              </button>
            </div>
          </div>
          <div className="rounded-lg my-2 bg-white border-2 border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="sm:h24 w-32 object-cover m-2 rounded-lg"
            />
            <div className="my-3 mx-2">
              <span className="text-xs font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-xs ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-xs w-full p-1 rounded-md mt-4">
                add to table
              </button>
            </div>
          </div>
          <div className="rounded-lg my-2 bg-white border-2 border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="sm:h24 w-32 object-cover m-2 rounded-lg"
            />
            <div className="my-3 mx-2">
              <span className="text-xs font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-xs ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-xs w-full p-1 rounded-md mt-4">
                add to table
              </button>
            </div>
          </div>
          
        </div>
      </div>
  );
}
