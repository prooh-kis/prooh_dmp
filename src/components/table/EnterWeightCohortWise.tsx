import React, { useState } from "react";

export const EnterWeightCohortWise = ({
  audienceTypeWiseData,
  setAudienceTypeWiseData,
  currentAudienceType,
}: any) => {
  const [editableCell, setEditableCell] = useState<any>(null);

  const handleBlur = () => {
    setEditableCell(null);
  };
  // percentage
  // Handler to update data when input field changes
  const handleChange = (event: any, rowIndex: number, column: string) => {
    const newData = [...audienceTypeWiseData];
    newData[rowIndex][column] = event.target.value * 0.01;
    setAudienceTypeWiseData(newData);
  };

  return (
    <table className="border-collapse w-full text-[14px]">
      <thead>
        <tr className="text-[#FFFFFF] bg-[#1297E2] ">
          <th className="border border-slate-300 py-2">Type</th>
          <th className="border border-slate-300 py-2">Weightage</th>
          <th className="border border-slate-300 py-2">Audiences Count</th>
        </tr>
      </thead>
      <tbody className="w-full border border-1">
        {audienceTypeWiseData?.map((data: any, index: number) => (
          <tr key={index}>
            <td className="border border-slate-300  cursor-pointer  text-left py-2 px-2 ">
              {data?.categoryType}
            </td>
            <td
              onMouseEnter={() =>
                setEditableCell({ index, column: "percentage" })
              }
              onMouseLeave={handleBlur}
              className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 px-2 "
            >
              {editableCell?.index === index &&
              editableCell?.column === "percentage" ? (
                <input
                  title=""
                  placeholder="percentage"
                  type="number"
                  value={data?.percentage * 100}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e, index, "percentage")}
                  autoFocus
                />
              ) : (
                `${data?.percentage * 100}%`
              )}
            </td>
            <td className="border border-slate-300  cursor-pointer  text-center py-2 px-2 ">
              {1000000 * data?.percentage}
            </td>
          </tr>
        ))}
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-left py-2 px-2 ">
            Total
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 px-2 ">

          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 px-2 ">

          </td>
        </tr>
      </tbody>
    </table>
  );
};
