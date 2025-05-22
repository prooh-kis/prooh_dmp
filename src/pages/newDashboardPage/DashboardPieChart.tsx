import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatNumber } from "../../utils/formatValue";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: { [key: string]: { count?: number } };
  type?: string;
  total?: number;
}

export const DashboardPieChart: React.FC<DoughnutChartProps> = ({
  total,
  type,
  data,
}) => {
  // Extract labels (keys of the data object)
  const labels = Object.keys(data)?.map((d: any) => {
    if (type === "Third Party Data") {
      return d === "totalCameraData" ? "Camera Data" : d === "totalRoadsterData" ? "Roadster Data" : d === "totalDmfdData" ? "DMFD Data" : d === "totalTrafficData" ? "Traffic Data" : d === "totalMobileDeviceSdkData" ? "Mobile Device SDK" : ""
    }
    return d
  });

  // Extract values for promised and delivered
  const deliveredValues =  Object.keys(data).map((key) => data[key].count || 0);

  // Define colors for promised and delivered
  const backgroundColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#FF99A4",
    "#6CB9F4",
    "#FFD87E",
    "#76D2D2",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Count",
        data: deliveredValues,
        backgroundColor: labels.map(
          (_, index) =>
            backgroundColors[(index + labels.length) % backgroundColors.length]
        ),
        hoverBackgroundColor: labels.map(
          (_, index) =>
            backgroundColors[
              (index + labels.length) % backgroundColors.length
            ] + "70"
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right" as const, // 👈 This shows legend on the right
        labels: {
          usePointStyle: true,       // Use circle instead of square
          pointStyle: "circle",      // Ensure it’s a circle
          boxWidth: 10,              // Width of the point
          boxHeight: 10,             // Height (for custom control, though not always respected)
          padding: 10,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            if (type === "Third Party Data") {
              return `${tooltipItem.dataset.label}: ${formatNumber(
                tooltipItem.raw?.toFixed(2)
              )}`;
            }
            return `${tooltipItem.dataset.label}: ${formatNumber(
              tooltipItem.raw?.toFixed(0)
            )}`;

          },
        },
      },
      datalabels: {
        display: false, // 👈 This completely hides data labels
      },
    },
    cutout: "5%", // Adjust inner circle size
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-row items-center justify-center">
        <div className="w-full">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};
