import React from "react";
import TableDetails from "../components/tableDetails";

export default function Tables() {
  return (
    <>
      <div className="bg-gray-200 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-10">
        <div className="text-sm text-center p-2 mb-6 rounded-md bg-white text-green-900">
          Please Select Table
        </div>
        <div className="grid grid-cols-3 gap-10 grid-rows-5 ">
          <button className="group hover:bg-green-800 bg-yellow-500 rounded-lg text-white flex items-center justify-center flex-col py-4">
            <div className="text-md group-hover:text-white">Table 1</div>
            <div className="text-sm group-hover:text-white">Seated</div>
          </button>
          <button className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 2</div>
            <div className="text-sm group-hover:text-white">Empty</div>
          </button>
          <button className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 3</div>
            <div className="text-sm group-hover:text-white">Seated</div>
          </button>
          <button className="group  hover:bg-green-800 bg-white rounded-lg text-black  items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 4</div>
            <div className="text-sm group-hover:text-white">Empty</div>
          </button>
          <button className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 5</div>
            <div className="text-sm group-hover:text-white">Empty</div>
          </button>
          <button className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 6</div>
            <div className="text-sm group-hover:text-white">Seated</div>
          </button>
          <button className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 7</div>
            <div className="text-sm group-hover:text-white">Empty</div>
          </button>
          <button className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 8</div>
            <div className="text-sm group-hover:text-white">Seated</div>
          </button>
          <button className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 9</div>
            <div className="text-sm group-hover:text-white">Seated</div>
          </button>
          <button className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 10</div>
            <div className="text-sm group-hover:text-white">Empty</div>
          </button>
          <button className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 11</div>
            <div className="text-sm group-hover:text-white">Seated</div>
          </button>
          <button className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white  items-center flex justify-center flex-col">
            <div className="text-md group-hover:text-white">Table 12</div>
            <div className="text-sm group-hover:text-white">Empty</div>
          </button>
        </div>
      </div>
      <TableDetails />
    </>
  );
}
