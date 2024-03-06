import { Bar } from "react-chartjs-2";

export default function MonthChart({ salesData, selectedYear, selectedMonthName }) {
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
  // Get the number of days in the selected month
  const selectedMonthNumber = monthNames.indexOf(selectedMonthName);
  // Now use selectedMonthNumber instead of selectedMonthName
  const daysInMonth = new Date(selectedYear, selectedMonthNumber + 1, 0).getDate();

  // Initialize an array to store the total sales for each day of the month
  let totalSalesMonth = Array(daysInMonth).fill(0);
  let labelsMonth = Array(daysInMonth).fill("");

  for (let i = 0; i < daysInMonth; i++) {
    const monthDay = new Date(selectedYear, selectedMonthNumber, i + 1);

    const monthDayString = `${monthDay.getMonth() + 1}/${monthDay.getDate()}/${String(
      monthDay.getFullYear()
    ).slice(2)}`;

    // Get the sales data for the selected day
    let monthDaySalesData;
    if (salesData && salesData[selectedYear] && salesData[selectedYear][selectedMonthName]) {
      monthDaySalesData = salesData[selectedYear][selectedMonthName].find(
        (data) => {const dateObject = new Date(data.date);
        // Format the date to match weekDayString
        const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${String(
          dateObject.getFullYear()
        ).slice(2)}`;

        return formattedDate ===  monthDayString;
        }
      );
    }

    if (monthDaySalesData) {
      // Flatten the orders array and filter to only include those with a status of "Completed"
      const completedOrders = monthDaySalesData.orders.flatMap((order) =>
        order.status === "Completed" ? order : []
      );

      // Sum up the total price of the completed orders
      totalSalesMonth[i] = completedOrders.reduce((total, order) => total + order.totalPrice, 0);
    }

    // Create labels for the chart
    labelsMonth[i] = `${monthDay.getDate()}`;
  }

  // Now totalSalesMonth is an array where each element is the total sales for a day of the month
  const chartData = {
    labels: labelsMonth,
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
    <div className="w-full h-[430px] p-6 shadow-sm bg-white rounded-md">
      <div style={{ width: "100%", height: "100%" }}>
        <Bar title="month" data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
