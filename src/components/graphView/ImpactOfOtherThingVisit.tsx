import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export const ImpactOfOtherThingVisit: React.FC = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Male",
        data: [30, 45, 28, 80, 99, 43],
        borderColor: "#2FA8FF",
        backgroundColor: "#2FA8FF",
      },
      {
        label: "Female",
        data: [30, 23, 45, 80, 78, 43],
        borderColor: "#B0A2FF",
        backgroundColor: "#B0A2FF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
  };

  return (
    <div className="h-full w-full p-8">
      <h1 className="text-[#0E212E] text-[20px] font-bold">
        Impact of other factors On Visit
      </h1>
      <Line data={data} options={options} />;
      <div className="flex gap-4 text-[12px] pt-2">
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 bg-[#6AC0FF] rounded-full"></div>
          <h1>Male</h1>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 bg-[#BFB4FF] rounded-full"></div>
          <h1>Female</h1>
        </div>
      </div>
    </div>
  );
};
