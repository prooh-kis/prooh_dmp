import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and the DataLabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export const AudienceDataTimeZoneWiseFemaleView: React.FC = () => {
  const data = {
    labels: ["T1", "T2", "T3", "T4"],
    datasets: [
      {
        label: "Male",
        data: [300, 50, 100, 80],
        backgroundColor: ["#F4E5FF", "#DCCDFF", "#EACDFF", "#DCCDFF"],
        borderColor: ["#F4E5FF", "#DCCDFF", "#EACDFF", "#DCCDFF"],
        borderWidth: 1,
        offset: 30, // Adds spacing between segments
        cutout: "50%", // Inner radius
        borderRadius: 10, // Adds rounded corners
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      datalabels: {
        display: true,
        color: "#fff",
        font: {
          weight: "bold" as const, // Use `as const` for literal strings
          size: 16,
        },
        formatter: (_value: number, context: any) => {
          // Use the corresponding label from the `labels` array
          const labelIndex = context.dataIndex;
          return data.labels[labelIndex];
        },
        anchor: "center" as const, // Correct type for `anchor`
        align: "center" as const, // Correct type for `align`
      },
    },
  };

  return (
    <div className="p-4 h-full w-full pt-8">
      <h2 className="mb-4">Advanced Doughnut Chart with Labels</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};
