import React from 'react'

export default function Tables() {
  return (
    <div className="bg-gray-200 w-3/6 flex-auto flex flex-col gap-2 pt-10 px-10">
      <div className="text-sm text-center p-2 mb-6 rounded-md bg-white text-green-900">Please Select Table</div>
      <div className="grid grid-cols-3 gap-10 grid-rows-5 ">
      <button className="group hover:bg-yellow-500 bg-green-800 rounded-lg text-white flex items-center justify-center flex-col py-4">
        <div className="text-md group-hover:text-black">Table 1</div>
        <div className="text-sm group-hover:text-black">Seated</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-white rounded-lg text-black items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 2</div>
        <div className="text-sm group-hover:text-black">Empty</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-green-800 rounded-lg text-white items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 3</div>
        <div className="text-sm group-hover:text-black">Seated</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-white rounded-lg text-black  items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 4</div>
        <div className="text-sm group-hover:text-black">Empty</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-white rounded-lg text-black items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 5</div>
        <div className="text-sm group-hover:text-black">Empty</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-green-800 rounded-lg text-white items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 6</div>
        <div className="text-sm group-hover:text-black">Seated</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-white rounded-lg text-black items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 7</div>
        <div className="text-sm group-hover:text-black">Empty</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-green-800 rounded-lg text-white items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 8</div>
        <div className="text-sm group-hover:text-black">Seated</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-green-800 rounded-lg text-white items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 9</div>
        <div className="text-sm group-hover:text-black">Seated</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-white rounded-lg text-black items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 10</div>
        <div className="text-sm group-hover:text-black">Empty</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-green-800 rounded-lg text-white items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 11</div>
        <div className="text-sm group-hover:text-black">Seated</div>
      </button>
      <button className="group  hover:bg-yellow-500 bg-green-800 rounded-lg text-white  items-center flex justify-center flex-col">
        <div className="text-md group-hover:text-black">Table 12</div>
        <div className="text-sm group-hover:text-black">Empty</div>
      </button>
      </div>
    </div>
  )
}
