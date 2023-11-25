import Image from "next/image";
import React from "react";

export default function Menu() {
  return (
    <div className="row-span-5 col-span-7 bg-gray-200 flex flex-col gap-5 py-10 px-4">
      <div className="grid grid-cols-6 grid-rows-1 gap-4">
        <button className="group hover:bg-yellow-500 bg-green-700 rounded-lg text-white flex items-center justify-center flex-col py-4">
          <div className="text-3xl group-hover:text-black">All</div>
          <div className="text-lg group-hover:text-black">40 items</div>
        </button>
        <button className="group hover:bg-yellow-500 bg-white rounded-lg text-white flex items-center justify-center flex-col py-4">
          <div className="text-3xl text-black group-hover:text-white">Main</div>
          <div className="text-lg text-black group-hover:text-white">
            20 items
          </div>
        </button>
        <button className="group hover:bg-yellow-500 bg-white rounded-lg text-white flex items-center justify-center flex-col py-4">
          <div className="text-3xl text-black group-hover:text-white">
            Drinks
          </div>
          <div className="text-lg text-black group-hover:text-white">
            20 items
          </div>
        </button>
        <button className="group hover:bg-yellow-500 bg-white rounded-lg text-white flex items-center justify-center flex-col py-4">
          <div className="text-3xl text-black group-hover:text-white">
            Cakes
          </div>
          <div className="text-lg text-black group-hover:text-white">
            20 items
          </div>
        </button>
      </div>
      {/* card begins here */}
        <div className="group rounded-lg flex flex-wrap justify-between gap-5">
          <div className="rounded-xl bg-white border-2 border-gray-200 shadow-md overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="h-32 sm:h-48 w-60 object-cover"
            />
            <div className="mt-4 mx-2 my-2">
              <span className="font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-sm ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-sm w-full p-2 rounded-md mt-2">
                Add to Table
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-white border-2 border-gray-200 shadow-md overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="h-32 sm:h-48 w-60 object-cover"
            />
            <div className="mt-4 mx-2 my-2">
              <span className="font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-sm ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-sm w-full p-2 rounded-md mt-2">
                Add to Table
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-white border-2 border-gray-200 shadow-md overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="h-32 sm:h-48 w-60 object-cover"
            />
            <div className="mt-4 mx-2 my-2">
              <span className="font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-sm ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-sm w-full p-2 rounded-md mt-2">
                Add to Table
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-white border-2 border-gray-200 shadow-md overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="h-32 sm:h-48 w-60 object-cover"
            />
            <div className="mt-4 mx-2 my-2">
              <span className="font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-sm ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-sm w-full p-2 rounded-md mt-2">
                Add to Table
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-white border-2 border-gray-200 shadow-md overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="h-32 sm:h-48 w-60 object-cover"
            />
            <div className="mt-4 mx-2 my-2">
              <span className="font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-sm ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-sm w-full p-2 rounded-md mt-2">
                Add to Table
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-white border-2 border-gray-200 shadow-md overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="h-32 sm:h-48 w-60 object-cover"
            />
            <div className="mt-4 mx-2 my-2">
              <span className="font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-sm ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-sm w-full p-2 rounded-md mt-2">
                Add to Table
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-white border-2 border-gray-200 shadow-md overflow-hidden cursor-pointer hover:border-green-600">
            <Image
              src="/sample.png"
              alt="stew"
              width="100"
              height="100"
              className="h-32 sm:h-48 w-60 object-cover"
            />
            <div className="mt-4 mx-2 my-2">
              <span className="font-bold text-gray-500 ml-1">
                5 Bean Chili Stew
              </span>
              <span className="block text-green-800 text-sm ml-1">RM 9.00</span>
              <button className="block bg-[#cce9d4] text-sm w-full p-2 rounded-md mt-2">
                Add to Table
              </button>
            </div>
          </div>
          {/* <button className="group hover:bg-yellow-500 bg-green-800 rounded-lg text-white flex items-center justify-center flex-col">
            <div className="text-xl group-hover:text-black">Table 1</div>
            <div className="text-lg group-hover:text-black">Seated</div>
          </button> */}
        </div>
      </div>
  );
}
