import React, { useState } from "react";

export const EnterImpactFactorTable = ({
  totalCount,
  genderData,
  setGenderData,
  monthDays,
  audienceTypeWiseData,
  setAudienceTypeWiseData,
  currentAudienceType,
}: any) => {
  const [editableCell, setEditableCell] = useState<any>(null);

  const getImpactFactorKeys = (data: any) => {
    const keys = new Set();

    const traverse = (obj: any) => {
        if (obj && typeof obj === "object") {
            for (const key in obj) {
                if (key === "impactFactor" && typeof obj[key] === "object") {
                    Object.keys(obj[key]).forEach((impactKey) => keys.add(impactKey));
                } else if (typeof obj[key] === "object") {
                    traverse(obj[key]);
                }
            }
        }
    };

    traverse(data);
    return Array.from(keys);
  };


  const handleData = (gender: string, value: any, day: any, impactFactor: any) => {
    const enterValue = Number(value / 100);
    const newGenderData = JSON.parse(JSON.stringify(genderData?.find((d: any) => d.gender === gender)));
  
    if (day === null) {
      newGenderData.weight = enterValue;
    } else {
      newGenderData[day] = {
        ...newGenderData[day],
        impactFactor: {
            ...newGenderData[day].impactFactor,
            [impactFactor]: enterValue,
        },
      };
    }
  
    const updatedGenderData = genderData.map((d: any) =>
      d.gender === gender ? newGenderData : d
    );
  
    setGenderData(updatedGenderData);
    setAudienceTypeWiseData((prev: any) => {
      const updatedAudienceTypeData = JSON.parse(JSON.stringify(prev));
      updatedAudienceTypeData[currentAudienceType].genderWiseData = updatedGenderData;
      return updatedAudienceTypeData;
    });
  };
  

  const handleBlur = () => {
    setEditableCell(null);
  };


  return (
    <table className="border-collapse w-full text-[14px]">
      <thead>
        <tr className="text-[#FFFFFF] bg-[#1297E2] grid grid-cols-3">
          <th className="col-span-1 border border-slate-300w-full">
            <div className="w-full">
              <div className="py-2">
                <h1>Audience Split</h1>
              </div>
              <div className="py-2 bg-[#EDF8FF] text-gray-900 font-semibold grid grid-cols-3">
                <div className="col-span-1">
                  <h1>Type</h1>
                </div>
                <div className="col-span-2">
                  <h1>Distribution of Month</h1>
                </div>
              </div>
            </div>
          </th>
          <th className="col-span-2 border border-slate-300 w-full">
            <div className="w-full">
              <div className="w-full py-2">
                <h1>Impact of factors on visit</h1>
              </div>
              <div className="py-2 h-full bg-[#EDF8FF] text-gray-900 font-semibold w-full grid grid-cols-6">
                {getImpactFactorKeys(genderData)?.filter((fgd: any) => fgd !== "_id")?.map((gdi: any, z: any) => (
                  <div key={z} className="col-span-1 px-2">
                    <h1 className="truncate">
                      {
                      gdi === "govtHolidays" ? "Government Holidays" :
                      gdi === "longWeekendHolidays" ? "Long Weekends Holidays" :
                      gdi === "festivals" ? "Festive Holidays" :
                      gdi === "peakWinters" ? "Peak Winters":
                      gdi === "peakSummers" ? "Peak Summers" :
                      gdi === "summerHolidaysSchool" ? "School's Summer Vacations" : gdi
                      }
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="w-full">
        {genderData?.map((gd: any, i: any) => (
          <tr key={i} className="grid grid-cols-3">
              <td className="col-span-1 border-b border-l">
                <div className="grid grid-cols-3">
                  <div className="h-full col-span-1 flex justify-center items-center">
                    <h1 className="">
                      {gd.gender}
                    </h1>
                  </div>
                  <div className="col-span-2 flex justify-center items-center">
                    <div className="border-x w-full">
                      {Object.keys(monthDays)?.map((m: any, i: any) => (
                        <div className={`${i+1 === Object.keys(monthDays)?.length ? "" : "border-b" } p-2 flex justify-center items-center`} key={i}>
                          {m.toUpperCase()}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </td>
              <td className="border-b border-r col-span-2">
                <div className="grid grid-cols-6 h-full flex justify-center items-center">
                  {getImpactFactorKeys(genderData)?.filter((fgd: any) => fgd !== "_id")?.map((gdi: any, z: any) => (
                    <div key={z} className={`${z === 0 ? "" : "border-l" } w-full`}>
                      {Object.keys(monthDays)?.map((m: any, i: any) => (
                        <div className={`${i+1 === Object.keys(monthDays)?.length ? "" : "border-b" } p-[10px] flex justify-center items-center`} key={i}>
                          <input
                            disabled={gd.weight === 0}
                            title=""
                            type="number"
                            placeholder="male"
                            className="text-[#1297E2] cursor-pointer text-center w-full h-full bg-blue-200"
                            value={
                              Number(gd[`${m}`]?.impactFactor[gdi] * 100).toFixed(0)
                            }
                            onChange={(e) => {
                              handleData(gd.gender, e.target.value, m, gdi);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </td>
          </tr>
        ))}
       
      </tbody>
    </table>
  );
};