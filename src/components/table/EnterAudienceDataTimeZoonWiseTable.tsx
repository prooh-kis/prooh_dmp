import React, { useState } from 'react'

export const EnterAudienceDataTimeZoonWiseTable = ({
  genderData,
  setGenderData,
  totalCount,
  audienceTypeWiseData,
  setAudienceTypeWiseData,
  currentAudienceType,
  monthDays
}: any) => {

  const [editableCell, setEditableCell] = useState<any>(null);

  const handleBlur = () => {
    setEditableCell(null);
  };

  const handleData = (gender: string, value: any, day: any, timezone: any) => {
    const enterValue = Number(value / 100);
    console.log(gender, value, day, timezone)
    const newGenderData = JSON.parse(JSON.stringify(genderData?.find((d: any) => d.gender === gender)));
  
    // if (day === null) {
    //   newGenderData.weight = enterValue;
    // } else {
      newGenderData[day].cohort = {
        ...newGenderData[day].cohort,
        [timezone]: enterValue,
      };
    // }
  
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
  
  return (
    <table className="border-collapse w-full text-[12px]">
      <thead>
        <tr className="text-[#FFFFFF] bg-[#1297E2]">
          <th className="border border-slate-300 py-2">Audience Type</th>
          <th className="border border-slate-300 py-2">
            Distribution of the Month
          </th>
          <th className="border border-slate-300 py-2">
            Per Day Audience Weighage
          </th>
          <th className="border border-slate-300 py-2">
            Per Day Audience count
          </th>
          <th className="border border-slate-300 py-2">Time Zones</th>
          <th className="border border-slate-300 py-2">% share of visits</th>
          <th className="border border-slate-300 py-2">Audience %</th>
          <th className="border border-slate-300 py-2">
            Total impression count per time Zone
          </th>
          <th className="border border-slate-300 py-2 bg-[#E2FFD4] text-black">
            Total Unique per spot ( 10secs/3 mins)
          </th>
          <th className="border border-slate-300 py-2" colSpan={2}>
            Impressions per spot over a 10 days campaign
          </th>
        </tr>
      </thead>
      <tbody className="w-full border border-1">
        {genderData?.map((gd: any, i: any) => (
            <tr key={i}>
              <td className="border h-full">
                <div className="h-full flex justify-center items-center">
                  <h1 className="">
                    {gd.gender}
                  </h1>
                </div>
              </td>
              <td className="border h-full">
                {Object.keys(monthDays)?.map((m: any, i: any) => (
                  <div className={`h-[20vh] ${i+1 === Object.keys(monthDays)?.length ? "" : "border-b" } p-2 flex justify-center items-center`} key={i}>
                    {m?.toUpperCase()}
                  </div>
                ))}
              </td>
              <td className="border h-full">
                {Object.keys(monthDays)?.map((m: any, j: any) => (
                  <div className={`h-[20vh] ${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } p-2 flex justify-center items-center`} key={j}>
                    {gd[`${m}`].daily}
                  </div>
                ))}
              </td>
              <td className="border h-full">
                {Object.keys(monthDays)?.map((m: any, j: any) => (
                  <div className={`h-[20vh] ${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } p-2 flex justify-center items-center`} key={j}>
                    {Number(totalCount * audienceTypeWiseData?.[currentAudienceType]?.percentage * gd?.weight * gd[`${m}`].daily).toFixed(2) ?? 0}
                  </div>
                ))}
              </td>
              <td className="border">
                {Object.keys(monthDays)?.map((m: any, j: any) => (
                  <div className={`h-[20vh] w-full ${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } flex flex-col justify-center items-center`} key={j}>
                    {Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                      <div key={k} className={`h-[5vh] ${k+1 === Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b" } p-2 flex justify-center items-center w-full`}>
                        <h1>{n.toUpperCase()}</h1>
                      </div>
                    ))}
                  </div>
                ))}
              </td>
              <td className="border-b">
                {Object.keys(monthDays)?.map((m: any, j: any) => (
                  <div className={`h-[20vh] w-full ${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } flex flex-col justify-center items-center`} key={j}>
                    {Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                      <div key={k}
                        onMouseEnter={() => {
                          setEditableCell({ gender: gd.gender, day: gd?.[m], index: k, column: "percentage" })
                        }
                        }
                        onMouseLeave={handleBlur}
                        className={`h-[5vh] ${k+1 === Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b" } border-slate-300 text-[#1297E2] cursor-pointer text-center p-2 flex justify-center items-center w-full`}
                      >
                        {editableCell?.index === k &&
                        editableCell?.gender === gd?.gender &&
                        editableCell?.day === gd?.[m] &&
                        editableCell?.column === "percentage" ? (
                          <input
                            title=""
                            placeholder="percentage"
                            type="number"
                            value={Number(gd?.[`${m}`]?.cohort?.[`${n}`] * 100).toFixed(2)}
                            onBlur={handleBlur}
                            onChange={(e) => handleData(gd.gender, e.target.value, m, n)}
                            autoFocus
                            className="w-full"
                          />
                        ) : (
                          `${Number(gd?.[`${m}`]?.cohort?.[`${n}`] * 100).toFixed(2)}%`
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </td>
              <td className="border">
                {Object.keys(monthDays)?.map((m: any, j: any) => (
                  <div className={`h-[20vh] w-full ${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } flex flex-col justify-center items-center`} key={j}>
                    {Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                      <div key={k} className={`h-[5vh] ${k+1 === Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                        <h1>{(gd[`${m}`].daily * gd?.[`${m}`]?.cohort?.[`${n}`]).toFixed(2)}</h1>
                      </div>
                    ))}
                  </div>
                ))}
              </td>
              <td className="border-b">
                {Object.keys(monthDays)?.map((m: any, j: any) => (
                  <div className={`h-[20vh] w-full ${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } flex flex-col justify-center items-center`} key={j}>
                    {Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                      <div key={k} className={`h-[5vh] ${k+1 === Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                        <h1>{(totalCount * audienceTypeWiseData?.[currentAudienceType]?.percentage * gd?.weight * gd[`${m}`].daily * gd?.[`${m}`]?.cohort?.[`${n}`]).toFixed(2)}</h1>
                      </div>
                    ))}
                  </div>
                ))}
              </td>
              <td className="border">
                {Object.keys(monthDays)?.map((m: any, j: any) => (
                  <div className={`h-[20vh] w-full ${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } flex flex-col justify-center items-center`} key={j}>
                    {Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                      <div key={k} className={`h-[5vh] ${k+1 === Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                        <h1>{(totalCount * audienceTypeWiseData?.[currentAudienceType]?.percentage * gd?.weight * gd[`${m}`].daily * gd?.[`${m}`]?.cohort?.[`${n}`] / (4 * 20)).toFixed(2)}</h1>
                      </div>
                    ))}
                  </div>
                ))}
              </td>
              <td className="border-b">
                {Object.keys(monthDays)?.map((m: any, j: any) => (
                  <div className={`h-[20vh] w-full ${j+1 === Object.keys(monthDays)?.length ? "" : "border-b" } flex flex-col justify-center items-center`} key={j}>
                    {Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                      <div key={k} className={`h-[5vh] ${k+1 === Object.keys(gd?.[`${m}`]?.cohort)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                        <h1>{(totalCount * audienceTypeWiseData?.[currentAudienceType]?.percentage * gd?.weight * gd[`${m}`].daily * gd?.[`${m}`]?.cohort?.[`${n}`] / (4 * 20) * 10).toFixed(2)}</h1>
                      </div>
                    ))}
                  </div>
                ))}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

