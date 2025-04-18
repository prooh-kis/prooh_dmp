import React, { useEffect, useRef, useState } from "react";

export const EnterAudienceTypeDataTable = ({
  genderData,
  setGenderData,
  totalCount,
  audienceTypeWiseData,
  setAudienceTypeWiseData,
  currentAudienceType,
  monthDays,
}: any) => {

  const [decimal, setDecimal] = useState<any>(0);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleKeyDown = (e: any, index: any) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const next: any = inputRefs.current[index + 1];
      if (next) next.focus();
    }
  };
  // console.log("audienceTypeWiseData : ", audienceTypeWiseData);
  const [editableCell, setEditableCell] = useState<any>(null);
  const [editableCell1, setEditableCell1] = useState<any>(null);
  const [editableCell2, setEditableCell2] = useState<any>(null);

  const handleBlur = () => {
    setEditableCell(null);
    setEditableCell1(null);
    setEditableCell2(null);
  };

  const handleData = (gender: string, value: any, day: any) => {
    const enterValue = parseFloat(value) / 100;
    const newGenderData = JSON.parse(JSON.stringify(genderData?.find((d: any) => d.gender === gender)));
    // console.log("new gender data", newGenderData);
    if (day === null) {
      newGenderData.weight = enterValue;
    } else {
      newGenderData[day] = {
        ...newGenderData[day],
        monthly: enterValue,
        daily: parseFloat((enterValue * 100 / newGenderData[day].days).toFixed(decimal)),
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
  

  const handleUniqueData = (gender: string, value: any, day: any) => {
    const enterValue = Number(value / 100);
    const newGenderData = JSON.parse(JSON.stringify(genderData?.find((d: any) => d.gender === gender)));
    newGenderData[day] = {
      ...newGenderData[day],
      unique: enterValue,
    };

    const updatedGenderData = genderData.map((d: any) =>
      d.gender === gender ? newGenderData : d
    );

    setGenderData(updatedGenderData);
  
    setAudienceTypeWiseData((prev: any) => {
      const updatedAudienceTypeData = JSON.parse(JSON.stringify(prev));
      updatedAudienceTypeData[currentAudienceType].genderWiseData = updatedGenderData;
      return updatedAudienceTypeData;
    });
  }

  return (
    <div>
      <table className="border-collapse w-full text-[14px]">
        <thead>
          <tr className="grid grid-cols-12">
            <th className="col-span-3 border text-[#FFFFFF] bg-[#1297E2]">
              <div>
                <div className="border-b py-4">
                  <h1>Audience Spirit</h1>
                </div>
                <div className="bg-blue-50 font-semibold text-[#1297E2] grid grid-cols-3">
                  <div className="col-span-1 flex items-center justify-center p-2">
                    <p >Type</p>
                  </div>
                  <div className="col-span-1 border-x flex items-center justify-center p-2">
                    <p>%</p>
                  </div>
                  <div className="col-span-1 flex items-center justify-center p-2">
                    <p className="truncate">Monthly Count</p>
                  </div>
                </div>
              </div>
            </th>
            <th className="col-span-2 border flex flex-col justify-center items-center text-[#FFFFFF] bg-[#1297E2]">
              <div className="">
                <h1>
                  Month Distribution
                </h1>
              </div>
            </th>
            <th className="col-span-1 border flex flex-col justify-center items-center text-[#FFFFFF] bg-[#1297E2]">
              <div>
                <h1>Total Days</h1>
              </div>
            </th>
            <th className="col-span-6 border text-[#FFFFFF] bg-[#1297E2]">
              <div onClick={() => {
                  if (decimal == 1) {
                    setDecimal(0)
                  } else {
                    setDecimal(1)
                  }
                }}>
                <div className="border-b py-4">
                  <h1>Total Audience Weight</h1>
                </div>
                <div className="bg-blue-50 font-semibold text-[#1297E2] grid grid-cols-4">
                  <div className="col-span-1 flex items-center justify-center p-2">
                    <h1 className="truncate">
                      Monthly (%)
                    </h1>
                  </div>
                  <div className="col-span-1 border-x flex items-center justify-center p-2">
                    <h1 className="truncate">
                      Daily (%)
                    </h1>
                  </div>
                  <div className="col-span-1 border-r flex items-center justify-center p-2">
                    <h1 className="truncate">
                      Daily Count
                    </h1>
                  </div>
                  <div className="col-span-1 flex items-center justify-center p-2 truncate">
                    <h1 className="truncate">
                      Unique Impression/Day
                    </h1>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {genderData?.map((gd: any, i: any) => (
            <tr key={i} className="grid grid-cols-12">
              <td className="col-span-3 border flex flex-col justify-center items-between">
                <div className="grid grid-cols-3 h-full">
                  <div className="h-full col-span-1 flex justify-center items-center">
                    <h1 className="">
                      {gd.gender}
                    </h1>
                  </div>
                  <div
                    onMouseEnter={() => {
                      setEditableCell({ index: i, column: "percentage" })
                    }}
                    onClick={() => 
                      setEditableCell({ index: i, column: "percentage" })
                    }
                    // onMouseLeave={handleBlur}
                    className="col-span-1 border-x border-slate-300 text-[#1297E2] cursor-pointer text-center flex justify-center items-center"
                  >
                    {editableCell?.index === i &&
                    editableCell?.column === "percentage" ? (
                      <input
                        type="number"
                        value={(gd?.weight * 100).toFixed(0)}
                        onBlur={handleBlur}
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleData(gd.gender, e.target.value, null)}
                        className="w-full h-full text-center border-[#1297E2] cursor-pointer focus:border-[#1297E2]"
                        aria-label="Edit percentage"
                        title="Edit percentage"
                      />
                    ) : (
                      `${Number(gd?.weight * 100).toFixed(decimal)}%`
                    )}
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    {
                      Number(totalCount * audienceTypeWiseData?.[currentAudienceType]?.percentage * gd?.weight).toFixed(decimal) ?? 0
                    }
                  </div>
                </div>
              </td>
              <td className="col-span-2 border">
                <div className="">
                  {Object.keys(monthDays)?.map((m: any, i: any) => (
                    <div className={`${i+1 === Object.keys(monthDays)?.length ? "" : "border-b" } p-2 flex justify-center items-center`} key={i}>
                      {m.toUpperCase()}
                    </div>
                  ))}
                </div>
              </td>
              <td className="col-span-1 border">
                <div className="">
                  {Object.keys(monthDays)?.map((m: any, j: any) => (
                    <div className={`${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } p-2 flex justify-center items-center`} key={j}>
                      {monthDays[m]}
                    </div>
                  ))}
                </div>
              </td>
              <td className="col-span-6 border">
                {Object.keys(monthDays)?.map((m: any, j: any) => (
                  <div key={j} className="grid grid-cols-4">
                    <div
                      onMouseEnter={() => {
                        setEditableCell1({ gender: gd.gender, index: j, column: "percentage" })
                      }}
                      onClick={() => 
                        setEditableCell({ index: j, column: "percentage" })
                      }
                      // onMouseLeave={handleBlur}
                      className={`col-span-1 ${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } col-span-1 border-slate-300 text-[#1297E2] cursor-pointer text-center p-2 flex justify-center items-center`} key={j}
                    >
                      {editableCell1?.index === j &&
                      editableCell1?.gender === gd.gender &&
                      editableCell1?.column === "percentage" ? (
                        <input
                          type="number"
                          value={(gd[`${m}`].monthly * 100).toFixed(0)}
                          onBlur={handleBlur}
                          onWheel={(e) => e.currentTarget.blur()}
                          onChange={(e) => handleData(gd.gender, e.target.value, m)}
                          className="w-full h-full text-center cursor-pointer"
                          aria-label="Edit percentage"
                          title="Edit percentage"
                        />
                      ) : (
                        `${Number(gd[`${m}`].monthly * 100).toFixed(decimal)} %`
                      )}
                    </div>
                    <div className="col-span-1 border-x">
                        <div className={`${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } p-2 flex justify-center items-center`} key={j}>
                          {gd[`${m}`].daily.toFixed(decimal) || 0} %
                        </div>
                    </div>
                    <div className="col-span-1 border-r"
                      onClick={() => {
                        // console.log(
                        //   totalCount * audienceTypeWiseData?.[currentAudienceType]?.percentage * gd?.weight * gd[`${m}`].daily
                        // )
                        // console.log(totalCount * audienceTypeWiseData?.[currentAudienceType]?.percentage * gd?.weight * gd[`${m}`].monthly / gd[`${m}`].days);
                        // console.log("percentage", audienceTypeWiseData?.[currentAudienceType]?.percentage);
                        // console.log("weight", gd?.weight);
                        // console.log("", gd[`${m}`].days);
                        // console.log(gd[`${m}`])
                      }}
                    >
                        <div className={`${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } p-2 flex justify-center items-center`} key={j}>
                          {Number(totalCount * audienceTypeWiseData?.[currentAudienceType]?.percentage * gd?.weight * gd[`${m}`].monthly / gd[`${m}`].days).toFixed(decimal) || 0}
                        </div>
                    </div>
                    <div className="col-span-1">
                      <div
                        onMouseEnter={() => {
                          setEditableCell2({ gender: gd.gender, index: j, column: "unique" })
                        }}
                        onClick={() => 
                          setEditableCell({ index: j, column: "percentage" })
                        }
                        // onMouseLeave={handleBlur}
                        className={`col-span-1 ${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } col-span-1 border-slate-300 text-[#1297E2] cursor-pointer text-center p-2 flex justify-center items-center`}
                        key={j}
                      >
                        {editableCell2?.index === j &&
                          editableCell2?.gender === gd.gender &&
                          editableCell2?.column === "unique" ? (
                            <input
                              // disabled={gd.weight === 0}
                              title=""
                              placeholder="unique"
                              type="number"
                              value={Number(gd?.[m]?.unique * 100).toFixed(0)}
                              onBlur={handleBlur}
                              onWheel={(e) => e.currentTarget.blur()}
                              onChange={(e) => handleUniqueData(gd.gender, e.target.value, m)}
                              ref={(el: any) => (inputRefs.current[j] = el)}
                              onKeyDown={(e) => handleKeyDown(e, j)}
                              autoFocus={j==0}
                              className="w-full cursor-pointer"
                            />
                          ) : (
                            `${Number(gd?.[m]?.unique * 100).toFixed(decimal)}%`
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default EnterAudienceTypeDataTable;
