"use client";
import React, { useState } from "react";
import TableDetails from "../components/tableDetails";

export default function Tables() {
  const [selectedTable, setSelectedTable] = useState("1");
  const [selectMenu, setSelectMenu] = useState(false);

  return (
    <>
      {selectMenu ? (
        <div className="bg-gray-200 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-10">TRUE</div>
      ) : (
        <div className="bg-gray-200 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-10">
          <div className="text-lg p-2 mb-1 font-medium text-black">
            Select Table
          </div>
          <div className="grid grid-cols-3 gap-10 grid-rows-5 ">
            <button
              className="group hover:bg-green-800 bg-yellow-500 rounded-lg text-white flex items-center justify-center flex-col py-4"
              onClick={() => setSelectedTable("1")}>
              <div className="text-md group-hover:text-white">Table 1</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("2")}>
              <div className="text-md group-hover:text-white">Table 2</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("3")}>
              <div className="text-md group-hover:text-white">Table 3</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("4")}>
              <div className="text-md group-hover:text-white">Table 4</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("5")}>
              <div className="text-md group-hover:text-white">Table 5</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("6")}>
              <div className="text-md group-hover:text-white">Table 6</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("7")}>
              <div className="text-md group-hover:text-white">Table 7</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("8")}>
              <div className="text-md group-hover:text-white">Table 8</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("9")}>
              <div className="text-md group-hover:text-white">Table 9</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-white rounded-lg text-black items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("10")}>
              <div className="text-md group-hover:text-white">Table 10</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("11")}>
              <div className="text-md group-hover:text-white">Table 11</div>
              <div className="text-sm group-hover:text-white">Seated</div>
            </button>
            <button
              className="group  hover:bg-green-800 bg-yellow-500 rounded-lg text-white  items-center flex justify-center flex-col"
              onClick={() => setSelectedTable("12")}>
              <div className="text-md group-hover:text-white">Table 12</div>
              <div className="text-sm group-hover:text-white">Empty</div>
            </button>
          </div>
        </div>
      )}
      <TableDetails table={selectedTable} setSelectMenu={setSelectMenu} />
    </>
  );
}
