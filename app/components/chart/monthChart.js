import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function MonthChart({ SalesData, currentYear, monthNames }) {

// Initialize an array to store the total sales for each month
let totalSalesMonth = Array(12).fill(0);

for (let i = 0; i < 12; i++) {
  const monthName = monthNames[i];

  // Get the sales data for the current month
  const monthSalesData = SalesData[currentYear][monthName];

  if (monthSalesData) {
    // Flatten the orders array and filter to only include those with a status of "Completed"
    const completedOrders = monthSalesData.flatMap((day) => day.orders ? day.orders.filter((order) => order.status === "Completed") : []);

    // Sum up the total price of the completed orders
    totalSalesMonth[i] = completedOrders.reduce((total, order) => total + order.totalPrice, 0);
  }
}

// Now totalSalesMonth is an array where each element is the total sales for a month
const chartData = {
  labels: monthNames,
  datasets: [
    {
      label: "Sales",
      data: totalSalesMonth,
      backgroundColor: ["rgba(29,163,74)"],
      borderColor: "black",
      borderRadius: 4,
      borderWidth: 2,
      width: 200,
    },
  ],
};

  return (
    <div className="w-full h-[400px] p-6 shadow-sm bg-white rounded-md">
      <div style={{ width: '100%', height: '100%' }}>
        <Bar title="month" data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

