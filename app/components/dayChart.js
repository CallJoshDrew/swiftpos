import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Daychart({ UserData }) {
  const chartData = {
    labels: UserData.map((data) => data.time),
    datasets: [
      {
        label: "Total Sales",
        data: UserData.map((data) => data.sales),
        backgroundColor: ["rgba(29,163,74)"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-5/6">
      <Bar title="day" data={chartData} />
    </div>
  );
}
