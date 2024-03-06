import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Daychart({
  salesData,
  selectedYear,
  selectedMonthName,
  selectedDateString,
}) {
  // First, map over the days in the month and then flatten the orders arrays into a single array
  let flattenedOrders = [];
  // console.log(salesData[selectedYear][selectedMonthName])
  // console.log(selectedDateString)
  if (salesData && salesData[selectedYear] && salesData[selectedYear][selectedMonthName]) {
    flattenedOrders = salesData[selectedYear][selectedMonthName].flatMap((day) => {
      // Create a new Date object from day.date
      const dateObject = new Date(day.date);
      // Format the date to match selectedDateString
      const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${String(dateObject.getFullYear()).slice(2)}`;
  
      if (formattedDate === selectedDateString && day.orders) {
        return day.orders;
      } else {
        return [];
      }
    });
  }
  
  // console.log(flattenedOrders)
  // Filter the orders to only include those with a status of "Completed"
  const completedOrders = flattenedOrders.filter((order) => order.status === "Completed");
  // Function to categorize the orders based on the hour of paymentTime
  function categorizeByHour(paymentTime) {
    // Extract the hours from the paymentTime string
    const timeString = paymentTime.split(",")[0]; // e.g., "02:10 AM"
    let [hours, minutes, period] = timeString.split(/[:\s]/); // e.g., ["02", "10", "AM"]

    // Convert the hours to a 24-hour format
    hours = parseInt(hours);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    // Categorize the hours
    // "9:00 AM" means from 9:00 oclock until 9:59 AM.
    if (hours < 9) return "8 AM";
    else if (hours < 10) return "9 AM";
    else if (hours < 11) return "10 AM";
    else if (hours < 12) return "11 AM";
    else if (hours < 13) return "12 PM";
    else if (hours < 14) return "1 PM";
    else if (hours < 15) return "2 PM";
    else if (hours < 16) return "3 PM";
    else if (hours < 17) return "4 PM";
    else return "5 PM";
  }

  // Create an object to store the total sales for each category
  let totalSalesByCategory = {
    "8 AM": 0,
    "9 AM": 0,
    "10 AM": 0,
    "11 AM": 0,
    "12 PM": 0,
    "1 PM": 0,
    "2 PM": 0,
    "3 PM": 0,
    "4 PM": 0,
    "5 PM": 0,
  };

  completedOrders.forEach((order) => {
    const category = categorizeByHour(order.paymentTime);
    totalSalesByCategory[category] += order.totalPrice;
  });

  // Now totalSalesByCategory is an object where each property is a time category and its value is the total sales for that category
  const chartData = {
    labels: Object.keys(totalSalesByCategory),
    datasets: [
      {
        label: "Sales",
        data: Object.values(totalSalesByCategory),
        backgroundColor: ["rgba(29,163,74)"],
        borderColor: "black",
        borderRadius: 4,
        borderWidth: 2,
        width: 200,
      },
    ],
  };

  return (
    <div className="w-full h-[430px] p-6 shadow-sm bg-white rounded-md">
      <div style={{ width: "100%", height: "100%" }}>
        <Bar title="day" data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
