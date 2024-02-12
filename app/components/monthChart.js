import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function MonthChart({ UserData }) {
  const chartData = {
    labels: UserData?.map((data) => data.month),
    datasets: [
      {
        label: "Total Sales",
        data: UserData?.map((data) => data.sales),
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

