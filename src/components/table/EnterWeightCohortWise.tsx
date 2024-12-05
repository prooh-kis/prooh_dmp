import React, { useState } from "react";

export const EnterWeightCohortWise = ({
  totalCount,
  audienceTypeWiseData,
  setAudienceTypeWiseData,
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
  // console.log(totalCount);

  return (
    <table className="border-collapse w-full text-[14px]">
      <thead>
        <tr className="grid grid-cols-6 text-[#FFFFFF] bg-[#1297E2] ">
          <th className="col-span-4 border border-slate-300 py-2 w-full">Type</th>
          <th className="col-span-1 border border-slate-300 py-2 w-full">Weightage</th>
          <th className="col-span-1 border border-slate-300 py-2 w-full">Audiences Count</th>
        </tr>
      </thead>
      <tbody className="w-full border">
        {audienceTypeWiseData?.map((data: any, index: number) => (
          <tr key={index} className="grid grid-cols-6">
            <td className="col-span-4 border border-slate-300 cursor-pointer text-left py-2 px-2 ">
              {data?.categoryType}
            </td>
            <td
              onMouseEnter={() =>
                setEditableCell({ index, column: "percentage" })
              }
              onMouseLeave={handleBlur}
              className="col-span-1 border border-slate-300 text-[#1297E2] cursor-pointer text-center py-2 px-2 "
            >
              {editableCell?.index === index &&
              editableCell?.column === "percentage" ? (
                <input
                  title=""
                  placeholder="percentage"
                  type="number"
                  value={Number(data?.percentage * 100).toFixed(0)}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e, index, "percentage")}
                  autoFocus
                  className="w-full"
                />
              ) : (
                `${Number(data?.percentage * 100).toFixed(0)}%`
              )}
            </td>
            <td className="col-span-1 border border-slate-300 cursor-pointer text-center py-2 px-2 ">
              {(totalCount * data?.percentage).toFixed(0)}
            </td>
          </tr>
        ))}
        <tr className="grid grid-cols-6">
          <td className="col-span-4 border border-slate-300  cursor-pointer  text-left py-2 px-2 ">
            Total
          </td>
          <td className="col-span-1 border border-slate-300 text-[#1297E2] cursor-pointer text-center py-2 px-2 ">
            {Number(audienceTypeWiseData?.reduce((sum: any, item: any) => sum + item.percentage, 0) * 100).toFixed(0)} %
          </td>
          <td className="col-span-1 border border-slate-300 cursor-pointer text-center py-2 px-2 ">
            {Number(totalCount * audienceTypeWiseData?.reduce((sum: any, item: any) => sum + item.percentage, 0) * 100).toFixed(0)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
