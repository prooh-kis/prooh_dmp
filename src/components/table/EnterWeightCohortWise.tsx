import React, { useState, ChangeEvent } from "react";

interface AudienceData {
  categoryType: string;
  percentage: number; // Stored as a fraction (e.g., 0.25 for 25%)
}

interface EnterWeightCohortWiseProps {
  totalCount: number;
  audienceTypeWiseData: AudienceData[];
  setAudienceTypeWiseData: React.Dispatch<React.SetStateAction<AudienceData[]>>;
}

export const EnterWeightCohortWise: React.FC<EnterWeightCohortWiseProps> = ({
  totalCount,
  audienceTypeWiseData,
  setAudienceTypeWiseData,
}) => {
  const [editableCell, setEditableCell] = useState<{
    index: number;
    column: string;
  } | null>(null);

  const handleBlur = () => {
    setEditableCell(null);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const value = parseFloat(event.target.value) / 100 || 0;
    setAudienceTypeWiseData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex].percentage = value;
      return updatedData;
    });
  };

  const getTotalPercent = () => {
    const totalPercentage = audienceTypeWiseData.reduce(
      (sum, item) => sum + (item.percentage || 0),
      0
    );
    return (totalPercentage * 100).toFixed(0);
  };

  return (
    <table className="border-collapse w-full text-[14px]">
      <thead>
        <tr className="grid grid-cols-6 text-white bg-[#1297E2]">
          <th className="col-span-4 border border-slate-300 py-2">Type</th>
          <th className="col-span-1 border border-slate-300 py-2">Weighage</th>
          <th className="col-span-1 border border-slate-300 py-2">
            Audiences Count
          </th>
        </tr>
      </thead>
      <tbody>
        {audienceTypeWiseData.map((data, index) => (
          <tr key={index} className="grid grid-cols-6">
            <td className="col-span-4 border border-slate-300 py-2 px-2">
              {data.categoryType}
            </td>
            <td
              className="col-span-1 border border-slate-300 text-center py-2"
              onMouseEnter={() =>
                setEditableCell({ index, column: "percentage" })
              }
              onMouseLeave={handleBlur}
            >
              {editableCell?.index === index &&
              editableCell.column === "percentage" ? (
                <input
                  type="number"
                  value={(data.percentage * 100).toFixed(0)}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full text-center"
                  aria-label="Edit percentage"
                  title="Edit percentage"
                />
              ) : (
                `${(data.percentage * 100).toFixed(0)}%`
              )}
            </td>
            <td className="col-span-1 border border-slate-300 text-center py-2">
              {(totalCount * data.percentage).toFixed(0)}
            </td>
          </tr>
        ))}
        <tr className="grid grid-cols-6 font-bold">
          <td className="col-span-4 border border-slate-300 py-2 px-2">
            Total
          </td>
          <td className="col-span-1 border border-slate-300 text-center py-2">
            {getTotalPercent()}%
          </td>
          <td className="col-span-1 border border-slate-300 text-center py-2">
            {(totalCount * parseFloat(getTotalPercent()) * 0.01).toFixed(0)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
