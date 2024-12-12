import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const AudienceTypeWiseView = () => {
  const data = {
    labels: [
      "sdr",
      "dsad",
      "sd",
      "uyu",
      "uiio",
      "poiui",
      "bbf",
      "dfd",
      "fdf",
      "iknhj",
    ], // Categories
    datasets: [
      {
        label: "Male",
        data: [344, 456, 344, 456, 344, 456, 344, 456, 344, 456], // First column values
        backgroundColor: "#2FA8FF",
      },
      {
        label: "Female",
        data: [567, 678, 567, 678, 567, 678, 567, 678, 567, 678], // Second column values
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
        Audience Type Wise
      </h1>
      <div className="flex gap-4 text-[12px] pt-2">
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 bg-[#6AC0FF] rounded-full"></div>
          <h1>
            Male <span className="font-bold">20%</span>
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 bg-[#BFB4FF] rounded-full"></div>
          <h1>
            Female <span className="font-bold">80%</span>
          </h1>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};
