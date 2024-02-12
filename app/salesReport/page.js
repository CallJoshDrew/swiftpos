"use client";
import { useState } from "react";

import { UserData } from "../data/userData";
import Daychart from "../components/dayChart";
import WeekChart from "../components/weekChart";
import MonthChart from "../components/monthChart";
import Image from "next/image";

export default function SalesReport() {
  const [selected, setSelected] = useState("today");

  return (
    <div className="bg-gray-100 w-5/6 flex-auto flex flex-col gap-2 py-10 px-6">
      <div className="flex items-center py-2 space-x-4">
        <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
          <div className="text-gray-500 text-sm">Avg.Sales/Day</div>
          <div className="text-md text-green-700">RM 2,888</div>
        </div>
        <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
          <div className="text-gray-500 text-sm">Today Sales</div>
          <div className="text-md text-green-700">RM 3,888</div>
        </div>
        <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
          <div className="text-gray-500 text-sm">This Week Sales</div>
          <div className="text-md text-green-700">RM 29,888</div>
        </div>
        <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
          <div className="text-gray-500 text-sm">This Month Sales</div>
          <div className="text-md text-green-700">RM 128,888</div>
        </div>
      </div>
      <div className="bg-gray-100 text-black">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelected("today")}
            className={`py-2 px-4 rounded-md ${
              selected === "today" ? "bg-green-600 text-white" : "bg-white text-black"
            }`}>
            Today
          </button>
          <button
            onClick={() => setSelected("weekly")}
            className={`py-2 px-4 rounded-md ${
              selected === "weekly" ? "bg-green-600 text-white" : "bg-white text-black"
            }`}>
            Weekly
          </button>
          <button
            onClick={() => setSelected("monthly")}
            className={`py-2 px-4 rounded-md ${
              selected === "monthly" ? "bg-green-600 text-white" : "bg-white text-black"
            }`}>
            Monthly
          </button>
        </div>
        <div className="flex space-x-2 text-black bg-white px-5 py-4 rounded-md items-center my-2">
          <div className="text-lg text-black">This Week Top 5</div>
          <div className="flex flex-grow justify-end space-x-2">
            <div className="flex space-x-2 items-center justify-center py-2 px-3 border-solid border-gray-100 rounded-md border shadow-sm">
              <Image
                src="/curryPuff.png"
                alt="Curry Puff"
                as="image"
                width="100"
                height="100"
                className="h-8 w-8 object-cover rounded-md"
              />
              <div className="flex flex-col items-start">
                <div className="text-xs">Curry Puff</div>
                <div className="text-xs text-green-700">300</div>
              </div>
            </div>
            <div className="flex space-x-2 items-center justify-center py-2 px-3 border-solid border-gray-100 rounded-md border shadow-sm">
              <Image
                src="/ufoTart.png"
                alt="UFO Tart"
                as="image"
                width="100"
                height="100"
                className="h-8 w-8 object-cover rounded-md"
              />
              <div className="flex flex-col items-start">
                <div className="text-xs">UFO Tart</div>
                <div className="text-xs text-green-700">200</div>
              </div>
            </div>

            <div className="flex space-x-2 items-center justify-center py-2 px-3 border-solid border-gray-100 rounded-md border shadow-sm">
              <Image
                src="/suiKau.png"
                alt="Sui Kau"
                as="image"
                width="100"
                height="100"
                className="h-8 w-8 object-cover rounded-md"
              />
              <div className="flex flex-col items-start">
                <div className="text-xs">Sui Kau</div>
                <div className="text-xs text-green-700">150</div>
              </div>
            </div>
            <div className="flex space-x-2 items-center justify-center py-2 px-3 border-solid border-gray-100 rounded-md border shadow-sm">
              <Image
                src="/eggTart.png"
                alt="Egg Tart"
                as="image"
                width="100"
                height="100"
                className="h-8 w-8 object-cover rounded-md"
              />
              <div className="flex flex-col items-start">
                <div className="text-xs">Egg Tart</div>
                <div className="text-xs text-green-700">200</div>
              </div>
            </div>
            <div className="flex space-x-2 items-center justify-center py-2 px-3 border-solid border-gray-100 rounded-md border shadow-sm">
              <Image
                src="/watanHor.png"
                alt="Watan Hor"
                as="image"
                width="100"
                height="100"
                className="h-8 w-8 object-cover rounded-md"
              />
              <div className="flex flex-col items-start">
                <div className="text-xs">Watan Hor</div>
                <div className="text-xs text-green-700">190</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {selected === "today" && <Daychart UserData={UserData.today} />}
          {selected === "weekly" && <WeekChart UserData={UserData.weekly} />}
          {selected === "monthly" && <MonthChart UserData={UserData.monthly} />}
        </div>
      </div>
    </div>
  );
}

// Sales Today, weekly, Monthly
// Calendar: Monday is the first day
// Today/This Week/This Month Top 5
// Cakes, Drinks, Dishes,
// Averages Sales, Sales Today,
