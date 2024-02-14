"use client";
import { useState } from "react";

import { SalesData } from "../data/salesData";
import Daychart from "../components/chart/dayChart";
import WeekChart from "../components/chart/weekChart";
import MonthChart from "../components/chart/monthChart";
import Image from "next/image";
import TopSoldItemsModal from "../components/modal/topSoldItemsModal";

export default function SalesReport() {
  const [selected, setSelected] = useState("today");
  const [salesToday, setSalesToday] = useState();
  const [salesThisWeek, setSalesThisWeek] = useState();
  const [salesThisMonth, setSalesThisMonth] = useState();

  const [isTopSoldItemsModalOpen, setTopSoldItemsModalOpen] = useState(false);

  // Map the month number to the month name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // This is a number
  const currentYear = String(today.getFullYear()); // Get the current year as a string
  const currentMonthName = monthNames[today.getMonth()]; // This is a string
  const todayString = `${today.getMonth() + 1}/${today.getDate()}/${String(
    today.getFullYear()
  ).slice(2)}`;
  // Find the sales data for today
  const todaySalesData = SalesData[currentYear][currentMonthName].find(
    (data) => data.date === todayString
  );
  let totalSalesToday = 0;
  if (todaySalesData) {
    todaySalesData.orders.forEach((order) => {
      if (order.status === "Completed") {
        totalSalesToday += order.totalPrice;
      }
    });
  }

  // Weekly sales
  let totalSalesWeek = 0;
  const dayOfWeek = today.getDay(); // 0 (Sunday) - 6 (Saturday)
  const startOfWeek = new Date(today); // copy of const today = New Date(),
  startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Last Monday which is two days ago.
  // console.log(startOfWeek) which is 12 Feb 2024 Monday as the first day of the week which we set.
  for (let i = 0; i < dayOfWeek; i++) {
    const weekDay = new Date(startOfWeek);
    weekDay.setDate(startOfWeek.getDate() + i);
    // Only count the sales if it's within the same month
    if (weekDay.getMonth() + 1 === currentMonth) {
      const weekDayString = `${weekDay.getMonth() + 1}/${weekDay.getDate()}/${String(
        weekDay.getFullYear()
      ).slice(2)}`;
      const weekDaySalesData = SalesData[currentYear][currentMonthName].find(
        (data) => data.date === weekDayString
      );
      if (weekDaySalesData) {
        weekDaySalesData.orders.forEach((order) => {
          if (order.status === "Completed") {
            totalSalesWeek += order.totalPrice;
          }
        });
      }
    }
  }

  // Monthly sales
  let totalSalesMonth = 0;
  SalesData[currentYear][currentMonthName].forEach((day) => {
    // Only count the sales if it's within the current month
    if (day.date.startsWith(String(currentMonth))) {
      day.orders.forEach((order) => {
        if (order.status === "Completed") {
          totalSalesMonth += order.totalPrice;
        }
      });
    }
  });

  // Calculate Top Items List
  // Function to get orders for today
  function getTodayOrders() {
    const todaySalesData = SalesData[currentYear][currentMonthName].find(
      (data) => data.date === todayString
    );
    return todaySalesData ? todaySalesData.orders : [];
  }

  // Function to get orders for this week
  function getWeekOrders() {
    let weekOrders = [];
    for (let i = 0; i < dayOfWeek; i++) {
      const weekDay = new Date(startOfWeek);
      weekDay.setDate(startOfWeek.getDate() + i);

      if (weekDay.getMonth() + 1 === currentMonth) {
        const weekDayString = `${weekDay.getMonth() + 1}/${weekDay.getDate()}/${String(
          weekDay.getFullYear()
        ).slice(2)}`;
        const weekDaySalesData = SalesData[currentYear][currentMonthName].find(
          (data) => data.date === weekDayString
        );
        if (weekDaySalesData) {
          // Filter out orders where status !== "Completed"
          const completedOrders = weekDaySalesData.orders.filter(
            (order) => order.status === "Completed"
          );
          weekOrders = weekOrders.concat(completedOrders);
        }
      }
    }
    return weekOrders;
  }

  // Function to get orders for this month
  function getMonthOrders() {
    let monthOrders = [];

    SalesData[currentYear][currentMonthName].forEach((day) => {
      if (day.date.startsWith(String(currentMonth))) {
        monthOrders = monthOrders.concat(day.orders);
      }
    });
    return monthOrders;
  }

  // Helper function to calculate item quantities, total prices, and image links
  function calculateItems(orders) {
    let itemQuantityMap = {};
    let itemPriceMap = {};
    let itemImageMap = {};

    orders.forEach((order) => {
      // Only process the order if its status is "Completed"
      if (order.status === "Completed") {
        order.items.forEach((item) => {
          if (itemQuantityMap[item.item.name]) {
            itemQuantityMap[item.item.name] += item.quantity;
            itemPriceMap[item.item.name] += item.quantity * item.item.price;
          } else {
            itemQuantityMap[item.item.name] = item.quantity;
            itemPriceMap[item.item.name] = item.quantity * item.item.price;
            itemImageMap[item.item.name] = item.item.image;
          }
        });
      }
    });

    let itemQuantityPairs = Object.entries(itemQuantityMap);
    itemQuantityPairs.sort((a, b) => b[1] - a[1]);

    // Return all items as an array of objects
    return itemQuantityPairs.map((pair) => ({
      name: pair[0],
      quantity: pair[1],
      totalPrice: itemPriceMap[pair[0]],
      image: itemImageMap[pair[0]],
    }));
  }

  // Function to calculate top 5 items for a given set of orders
  function calculateTopItems(orders) {
    let allItems = calculateItems(orders);
    // Return top 5 items
    return allItems.slice(0, 5);
  }

  // Function to calculate all items for a given set of orders
  function calculateAllItems(orders) {
    return calculateItems(orders);
  }

  // Calculate top 5 items for today, this week, and this month
  const topTodayItems = calculateTopItems(getTodayOrders());
  const topWeekItems = calculateTopItems(getWeekOrders());
  const topMonthItems = calculateTopItems(getMonthOrders());

  console.log("Todays' Top 5 Items", topTodayItems);
  console.log("This Week Top 5 Items", topWeekItems);
  console.log("This Month Top 5 Items", topMonthItems);

  // Calculate all items for today, this week, and this month
  const allTodayItems = calculateAllItems(getTodayOrders());
  const allWeekItems = calculateAllItems(getWeekOrders());
  const allMonthItems = calculateAllItems(getMonthOrders());

  console.log("Todays' All Items", allTodayItems);
  console.log("This Week All Items", allWeekItems);
  console.log("This Month All Items", allMonthItems);

  let topFiveText;
  let topFiveItems;
  if (selected === "today") {
    topFiveText = "Today's Top 5";
    topFiveItems = topTodayItems;
  } else if (selected === "weekly") {
    topFiveText = "This Week's Top 5";
    topFiveItems = topWeekItems;
  } else if (selected === "monthly") {
    topFiveText = "This Month's Top 5";
    topFiveItems = topMonthItems;
  } else if (selected === "calendar") {
    topFiveText = "Today's Top 5";
    topFiveItems = topTodayItems;
  }

  return (
    <div className="bg-gray-100 w-5/6 flex-auto flex flex-col gap-2 pt-8 px-6">
      <div className="flex items-center py-2 space-x-4">
        {/* <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
          <div className="text-gray-500 text-sm">Avg.Sales/Day</div>
          <div className="text-md text-green-700">RM 2,888</div>
        </div> */}
        <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
          <div className="text-gray-500 text-sm">Today Sales</div>
          <div className="text-md text-green-700">
            RM{" "}
            {totalSalesToday.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
          <div className="text-gray-500 text-sm">This Week Sales</div>
          <div className="text-md text-green-700">
            RM{" "}
            {totalSalesWeek.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
          <div className="text-gray-500 text-sm">This Month Sales</div>
          <div className="text-md text-green-700">
            RM{" "}
            {totalSalesMonth.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 text-black">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelected("today")}
            className={`py-2 px-4 rounded-md ${
              selected === "today" ? "bg-green-700 text-white shadow-md " : "bg-white text-black"
            }`}>
            Today
          </button>
          <button
            onClick={() => setSelected("weekly")}
            className={`py-2 px-4 rounded-md ${
              selected === "weekly" ? "bg-green-700 text-white shadow-md " : "bg-white text-black"
            }`}>
            Weekly
          </button>
          <button
            onClick={() => setSelected("monthly")}
            className={`py-2 px-4 rounded-md ${
              selected === "monthly" ? "bg-green-700 text-white shadow-md " : "bg-white text-black"
            }`}>
            Monthly
          </button>
          <button
            onClick={() => setSelected("calendar")}
            className={`py-2 px-4 rounded-md ${
              selected === "calendar" ? "bg-green-700 text-white shadow-md " : "bg-white text-black"
            }`}>
            Calendar
          </button>
        </div>
        <div className="space-y-4">
          {selected === "today" && (
            <Daychart
              SalesData={SalesData}
              currentYear={currentYear}
              currentMonthName={currentMonthName}
              todayString={todayString}
            />
          )}
          {selected === "weekly" && (
            <WeekChart
              SalesData={SalesData}
              currentYear={currentYear}
              currentMonthName={currentMonthName}
              startOfWeek={startOfWeek}
            />
          )}
          {selected === "monthly" && (
            <MonthChart SalesData={SalesData} currentYear={currentYear} monthNames={monthNames} />
          )}
          {selected === "calendar" && (
            <Daychart
              SalesData={SalesData}
              currentYear={currentYear}
              currentMonthName={currentMonthName}
              todayString={todayString}
            />
          )}
        </div>
        <div className="flex flex-col text-black bg-white px-4 pb-4 pt-3 rounded-md mt-2">
          <div className="flex justify-between items-center mt-1 mb-3">
            <div className="text-lg text-black mx-2">{topFiveText}</div>
            <button className="text-xs bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={()=> setTopSoldItemsModalOpen(true)}>
              More Info
            </button>
          </div>
          <div className="flex justify-between space-x-2">
            {topFiveItems.map((item, index) => (
              <div
                key={index}
                className="flex space-x-2 items-center justify-center py-2 px-3 border-gray-100 rounded-md shadow-md">
                <Image
                  src={item.image}
                  alt={item.name}
                  as="image"
                  width="100"
                  height="100"
                  className="h-8 w-8 object-cover rounded-md"
                />
                <div className="flex flex-col items-start">
                  <div className="text-xs">{item.name}</div>
                  <div className="text-xs text-green-700">
                    RM{" "}
                    {item.totalPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isTopSoldItemsModalOpen && (
        <TopSoldItemsModal
          isTopSoldItemsModalOpen={isTopSoldItemsModalOpen}
          setTopSoldItemsModalOpen={setTopSoldItemsModalOpen}
          allTodayItems={allTodayItems}
          allWeekItems={allWeekItems}
          allMonthItems={allMonthItems}
        />
      )}
    </div>
  );
}

// Sales Today, weekly, Monthly
// Calendar: Monday is the first day
// Today/This Week/This Month Top 5
// Cakes, Drinks, Dishes,
// Averages Sales, Sales Today,
