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
      <div className="">
        <div className="group hover:bg-yellow-500 rounded-lg text-white flex justify-start">
          <div>
            
          </div>
          {/* <button className="group hover:bg-yellow-500 bg-green-800 rounded-lg text-white flex items-center justify-center flex-col">
            <div className="text-xl group-hover:text-black">Table 1</div>
            <div className="text-lg group-hover:text-black">Seated</div>
          </button> */}
        </div>
      </div>
    </div>
  );
}
