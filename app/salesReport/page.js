"use client";
import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import { useAtom } from "jotai";
// import { SalesData } from "../data/salesData";
import Daychart from "../components/chart/dayChart";
import WeekChart from "../components/chart/weekChart";
import YearChart from "../components/chart/yearChart";
import Image from "next/image";
import TopSoldItemsModal from "../components/modal/topSoldItemsModal";
import SalesCalendarModal from "../components/modal/salesCalendarModal";
import MonthChart from "../components/chart/monthChart";
import { todayRegisteredAtom } from "../components/atoms/todayRegisteredAtom";
import { useRouter } from "next/navigation";
import { salesDataAtom } from "../components/atoms/salesDataAtom";

export default function SalesReport() {
  const [selectedBtn, setSelectedBtn] = useState("today");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [salesToday, setSalesToday] = useState();
  const [salesThisWeek, setSalesThisWeek] = useState();
  const [salesThisMonth, setSalesThisMonth] = useState();

  const [isTopSoldItemsModalOpen, setTopSoldItemsModalOpen] = useState(false);
  const [isSalesCalendarModalOpen, setSalesCalendarModalOpen] = useState(false);

  const [todayRegistered, setTodayRegistered] = useAtom(todayRegisteredAtom);
  const [salesData, setSalesData] = useAtom(salesDataAtom);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  // Get the year, month, and day of the selected date
  const selectedYear = String(selectedDate.getFullYear());
  const selectedMonth = selectedDate.getMonth() + 1;
  const selectedMonthName = monthNames[selectedDate.getMonth()];
  const selectedDay = selectedDate.getDay();
  const selectedDateString = `${selectedMonth}/${selectedDate.getDate()}/${String(
    selectedDate.getFullYear()
  ).slice(2)}`;
  // console.log(selectedDateString);
  // Find the sales data for the selected date
  let selectedSalesData;
  if (salesData && salesData[selectedYear] && salesData[selectedYear][selectedMonthName]) {
    selectedSalesData = salesData[selectedYear][selectedMonthName].find((data) => {
      // Create a new Date object from data.date
      const dateObject = new Date(data.date);
      // Format the date to match selectedDateString
      const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${String(
        dateObject.getFullYear()
      ).slice(2)}`;

      return formattedDate === selectedDateString;
    });
  }

  let totalSalesSelectedDate = 0;
  if (selectedSalesData) {
    selectedSalesData.orders.forEach((order) => {
      if (order.status === "Completed") {
        totalSalesSelectedDate += order.totalPrice;
      }
    });
  }

  // Weekly sales
  let totalSalesWeek = 0;
  const dayOfWeek = selectedDay; // 0 (Sunday) - 6 (Saturday)
  // Calculate the start of the week for the selected date
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

  // Calculate the end of the week for the selected date
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  for (let i = 0; i <= 6; i++) {
    const weekDay = new Date(startOfWeek);
    weekDay.setDate(startOfWeek.getDate() + i);

    if (weekDay.getMonth() + 1 === selectedMonth) {
      const weekDayString = `${weekDay.getMonth() + 1}/${weekDay.getDate()}/${String(
        weekDay.getFullYear()
      ).slice(2)}`;

      let weekDaySalesData;
      if (salesData && salesData[selectedYear] && salesData[selectedYear][selectedMonthName]) {
        weekDaySalesData = salesData[selectedYear][selectedMonthName].find((data) => {
          // Create a new Date object from data.date
          const dateObject = new Date(data.date);
          // Format the date to match weekDayString
          const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${String(
            dateObject.getFullYear()
          ).slice(2)}`;

          return formattedDate === weekDayString;
        });
      }

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
  if (salesData && salesData[selectedYear] && salesData[selectedYear][selectedMonthName]) {
    salesData[selectedYear][selectedMonthName].forEach((day) => {
      if (day.date.startsWith(String(selectedMonth))) {
        day.orders.forEach((order) => {
          if (order.status === "Completed") {
            totalSalesMonth += order.totalPrice;
          }
        });
      }
    });
  }

  let totalSalesYear = 0;
  if (salesData && salesData[selectedYear]) {
    Object.values(salesData[selectedYear]).forEach((month) => {
      month.forEach((day) => {
        day.orders.forEach((order) => {
          if (order.status === "Completed") {
            totalSalesYear += order.totalPrice;
          }
        });
      });
    });
  }

  // Calculate Top Items List
  // Function to get orders for today
  function getTodayOrders() {
    let todaySalesData;
    if (salesData && salesData[selectedYear] && salesData[selectedYear][selectedMonthName]) {
      todaySalesData = salesData[selectedYear][selectedMonthName].find((data) => {
        // Create a new Date object from data.date
        const dateObject = new Date(data.date);
        // Format the date to match selectedDateString
        const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${String(
          dateObject.getFullYear()
        ).slice(2)}`;

        return formattedDate === selectedDateString;
      });
    }
    return todaySalesData ? todaySalesData.orders : [];
  }

  // Function to get orders for this week
  function getWeekOrders() {
    let weekOrders = [];
    const startOfWeekDate = new Date(startOfWeek);
    const endOfWeekDate = new Date(startOfWeek);
    endOfWeekDate.setDate(startOfWeekDate.getDate() + 6); // 6 days after the start of the week

    if (salesData && salesData[selectedYear]) {
      Object.values(salesData[selectedYear]).forEach((month) => {
        month.forEach((day) => {
          const dayDate = new Date(day.date);
          if (dayDate >= startOfWeekDate && dayDate <= endOfWeekDate) {
            // Filter out orders where status !== "Completed"
            const completedOrders = day.orders.filter((order) => order.status === "Completed");
            weekOrders = weekOrders.concat(completedOrders);
          }
        });
      });
    }
    return weekOrders;
  }

  // Function to get orders for this month
  function getMonthOrders() {
    let monthOrders = [];
    if (salesData && salesData[selectedYear] && salesData[selectedYear][selectedMonthName]) {
      salesData[selectedYear][selectedMonthName].forEach((day) => {
        // Create a new Date object from day.date
        const dateObject = new Date(day.date);
        // Format the date to match selectedMonth
        const formattedDate = `${dateObject.getMonth() + 1}`;

        if (formattedDate.startsWith(String(selectedMonth))) {
          monthOrders = monthOrders.concat(day.orders);
        }
      });
    }
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

  function getYearOrders() {
    let yearOrders = [];

    if (salesData && salesData[selectedYear]) {
      Object.values(salesData[selectedYear]).forEach((month) => {
        month.forEach((day) => {
          yearOrders = yearOrders.concat(day.orders);
        });
      });
    }

    return yearOrders;
  }

  const topYearItems = calculateTopItems(getYearOrders());
  const allYearItems = calculateAllItems(getYearOrders());

  // Calculate top 5 items for today, this week, and this month
  const topTodayItems = calculateTopItems(getTodayOrders());
  const topWeekItems = calculateTopItems(getWeekOrders());
  const topMonthItems = calculateTopItems(getMonthOrders());

  // console.log("Todays' Top 5 Items", topTodayItems);
  // console.log("This Week Top 5 Items", topWeekItems);
  // console.log("This Month Top 5 Items", topMonthItems);

  // Calculate all items for today, this week, and this month
  const allTodayItems = calculateAllItems(getTodayOrders());
  const allWeekItems = calculateAllItems(getWeekOrders());
  const allMonthItems = calculateAllItems(getMonthOrders());

  // console.log("Todays' All Items", allTodayItems);
  // console.log("This Week All Items", allWeekItems);
  // console.log("This Month All Items", allMonthItems);

  let topFiveText;
  let topFiveItems;
  if (selectedBtn === "today") {
    topFiveText = "Day Top 5";
    topFiveItems = topTodayItems;
  } else if (selectedBtn === "weekly") {
    topFiveText = "Week's Top 5";
    topFiveItems = topWeekItems;
  } else if (selectedBtn === "monthly") {
    topFiveText = "Month's Top 5";
    topFiveItems = topMonthItems;
  } else if (selectedBtn === "yearly") {
    topFiveText = "Year's Top 5";
    topFiveItems = topYearItems;
  }

  function formatDate(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
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

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNumber = date.getDate();
    const year = date.getFullYear();

    return `Day: ${day}, ${month} ${dateNumber}`;
  }
  let selectedDayBtn = formatDate(selectedDate);
  function formatWeek(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
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
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNumber = date.getDate();
    const year = date.getFullYear();

    return `${dateNumber} ${month}`;
  }
  let selectedWeekBtn = `Week: ${startOfWeek.getDate()} - ${formatWeek(endOfWeek)}`;
  let selectedMonthBtn = `Month: ${selectedMonthName}`;
  let selectedYearBtn = `Year: ${selectedYear}`;

  useEffect(() => {
    if (todayRegistered.openForRegister === false) {
      setLoading(true);
      // toast.success("Please Register First", {
      //   duration: 1000,
      //   position: "top-center",
      //   reverseOrder: false,
      // });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [todayRegistered, router]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-w-full min-h-screen flex items-center justify-center z-10">
        <div className="loader ease-linear rounded-full border-4 h-12 w-12 mb-4"></div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 w-5/6 flex-auto flex flex-col gap-2 pt-8 px-6">
      <div className="bg-gray-100 text-black">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedBtn("today")}
              className={`py-2 px-4 rounded-md ${
                selectedBtn === "today"
                  ? "bg-green-700 text-white shadow-md "
                  : "bg-white text-black"
              }`}>
              {selectedDayBtn}
            </button>
            <button
              onClick={() => setSelectedBtn("weekly")}
              className={`py-2 px-4 rounded-md ${
                selectedBtn === "weekly"
                  ? "bg-green-700 text-white shadow-md "
                  : "bg-white text-black"
              }`}>
              {selectedWeekBtn}
            </button>
            <button
              onClick={() => setSelectedBtn("monthly")}
              className={`py-2 px-4 rounded-md ${
                selectedBtn === "monthly"
                  ? "bg-green-700 text-white shadow-md "
                  : "bg-white text-black"
              }`}>
              {selectedMonthBtn}
            </button>
            <button
              onClick={() => setSelectedBtn("yearly")}
              className={`py-2 px-4 rounded-md ${
                selectedBtn === "yearly"
                  ? "bg-green-700 text-white shadow-md "
                  : "bg-white text-black"
              }`}>
              {selectedYearBtn}
            </button>
          </div>
          <button
            onClick={() => {
              setSalesCalendarModalOpen(true);
            }}
            className=" text-xs py-1 my-1 px-4 rounded-md bg-green-700 text-white shadow-md">
            Calendar
          </button>
        </div>
        <div className="flex items-center py-2 space-x-2">
          <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
            <div className="text-gray-500 text-sm">This Day</div>
            <div className="text-md text-green-700">
              RM{" "}
              {totalSalesSelectedDate.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
            <div className="text-gray-500 text-sm">This Week</div>
            <div className="text-md text-green-700">
              RM{" "}
              {totalSalesWeek.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
            <div className="text-gray-500 text-sm">This Month</div>
            <div className="text-md text-green-700">
              RM{" "}
              {totalSalesMonth.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="flex flex-col py-2 px-4 bg-white rounded-md flex-grow">
            <div className="text-gray-500 text-sm">This Year</div>
            <div className="text-md text-green-700">
              RM{" "}
              {totalSalesYear.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {selectedBtn === "today" && (
            <Daychart
              salesData={salesData}
              selectedYear={selectedYear}
              selectedMonthName={selectedMonthName}
              selectedDateString={selectedDateString}
            />
          )}
          {selectedBtn === "weekly" && (
            <WeekChart
              salesData={salesData}
              selectedYear={selectedYear}
              selectedMonthName={selectedMonthName}
              startOfWeek={startOfWeek}
              selectedWeekBtn={selectedWeekBtn}
            />
          )}
          {selectedBtn === "monthly" && (
            <MonthChart
              salesData={salesData}
              selectedYear={selectedYear}
              selectedMonthName={selectedMonthName}
              monthNames={monthNames}
            />
          )}
          {selectedBtn === "yearly" && (
            <YearChart salesData={salesData} selectedYear={selectedYear} monthNames={monthNames} />
          )}
          {/* {selectedBtn === "calendar" && (
            <Daychart
              salesData={salesData}
              selectedYear={selectedYear}
              selectedMonthName={selectedMonthName}
              selectedDateString={selectedDateString}
            />
          )} */}
        </div>
        <div className="flex justify-between items-end mt-3 mb-2">
          <div className="text-lg text-black mx-2">{topFiveText}</div>
          <button
            className="text-xs bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={() => setTopSoldItemsModalOpen(true)}>
            More Info
          </button>
        </div>
        <div
          className={`flex flex-col text-black bg-white px-4 pt-5 rounded-md ${
            topFiveItems.length === 0 ? "h-[68px] " : "pb-4"
          }`}>
          <div className="flex justify-between space-x-2">
            {topFiveItems.length > 0 ? (
              topFiveItems.map((item, index) => (
                <div key={index} className="flex space-x-2 items-center justify-center px-3">
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
              ))
            ) : (
              <div className="text-center pt-1 w-full text-gray-500">
                No data is available / restaurant was not open during this day
              </div>
            )}
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
          allYearItems={allYearItems}
          selectedDayBtn={selectedDayBtn}
          selectedWeekBtn={selectedWeekBtn}
          selectedMonthBtn={selectedMonthBtn}
          selectedYearBtn={selectedYearBtn}
        />
      )}
      {isSalesCalendarModalOpen && (
        <SalesCalendarModal
          isSalesCalendarModalOpen={isSalesCalendarModalOpen}
          setSalesCalendarModalOpen={setSalesCalendarModalOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
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
