import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and the DataLabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export const ImpactView: React.FC = () => {
  const data = {
    labels: ["Low", "High"],
    datasets: [
      {
        data: [30, 67], // Distribution of segments
        backgroundColor: ["#00FF00", "#FFFF00", "#FF0000"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "90%",
    circumference: 180,
    rotation: 270,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="p-4 h-full w-full pt-8">
      <h2 className="mb-4">Impact</h2>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};
