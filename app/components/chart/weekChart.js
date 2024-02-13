import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function WeekChart({ SalesData, currentYear, currentMonthName, startOfWeek }) {

  // Initialize an array to store the total sales for each day of the week
  let totalSalesWeek = Array(7).fill(0);
  let labelsWeek = Array(7).fill('');

  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(startOfWeek);
    weekDay.setDate(startOfWeek.getDate() + i);
    const weekDayString = `${weekDay.getMonth() + 1}/${weekDay.getDate()}/${String(
      weekDay.getFullYear()
    ).slice(2)}`;

    // Get the sales data for the current day
    const weekDaySalesData = SalesData[currentYear][currentMonthName].find(
      (data) => data.date === weekDayString
    );

    if (weekDaySalesData) {
      // Flatten the orders array and filter to only include those with a status of "Completed"
      const completedOrders = weekDaySalesData.orders.flatMap((order) =>
        order.status === "Completed" ? order : []
      );

      // Sum up the total price of the completed orders
      totalSalesWeek[i] = completedOrders.reduce((total, order) => total + order.totalPrice, 0);
    }

    // Create labels for the chart
    labelsWeek[i] = weekDay.toLocaleDateString('en-US', { weekday: 'long' });
  }

  // Now totalSalesWeek is an array where each element is the total sales for a day of the week
  const chartData = {
    labels: labelsWeek,
    datasets: [
      {
        label: "Sales",
        data: totalSalesWeek,
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
        <Bar title="week" data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

