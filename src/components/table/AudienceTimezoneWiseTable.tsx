import { GenderSelector } from '../../components/layouts/GenderSelector';
import { AudienceTableHeader } from '../../components/layouts/AudienceTableHeader';
import { getTimezoneWiseDataByAudienceTypeMarketSite } from 'actions/audienceAction';
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

interface AudienceTimezoneWiseTableProps {
  marketSite: String;
  audienceCategory: String;
  audiencePercent: number;
  id : string;
  setId : string;
}

export const AudienceTimezoneWiseTable: React.FC<AudienceTimezoneWiseTableProps> = ({
  marketSite,
  audienceCategory,
  audiencePercent,
  id , 
  setId
}: any) => {

  const dispatch = useDispatch<any>();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const getTimezoneWiseDataByAudienceTypeMarketSiteData = useSelector(
    (state: any) => state.getTimezoneWiseDataByAudienceTypeMarketSite
  );
  const {
    loading: timezoneWiseDataByMarketSiteLoading,
    data: timezoneWiseDataByMarketSite,
    success: timezoneWiseDataByMarketSiteSuccess,
    error: timezoneWiseDataByMarketSiteError
  } = getTimezoneWiseDataByAudienceTypeMarketSiteData;

  const [genderType, setGenderType] = useState("Male")
  const [decimal, setDecimal] = useState<any>(0);
  const [editableCell, setEditableCell] = useState<any>(null);
  const [timezoneDataByMarketSite, setTimezoneDataByMarketSite] = useState<any>({
    "weekdays": {
      "percent": 0.18532800000000002,
      "count": 185.328,
      "timezoneWiseData": {
        "morning": {
          "percent": 21,
          "audiencePercent": 0.03891888,
          "count": 38.91888,
          "unique": 5.448643200000001
        },
        "afternoon": {
          "percent": 24,
          "audiencePercent": 0.04447872,
          "count": 44.47872,
          "unique": 6.227020800000001
        },
        "evening": {
          "percent": 13,
          "audiencePercent": 0.024092640000000002,
          "count": 24.092640000000003,
          "unique": 3.3729696000000007
        },
        "night": {
          "percent": 42,
          "audiencePercent": 0.07783776,
          "count": 77.83776,
          "unique": 10.897286400000002
        }
      }
    },
    "saturdays": {
      "percent": 0.555984,
      "count": 555.984,
      "timezoneWiseData": {
        "morning": {
          "percent": 46,
          "audiencePercent": 0.25575264000000003,
          "count": 0,
          "unique": 0
        },
        "afternoon": {
          "percent": 0,
          "audiencePercent": 0,
          "count": 0,
          "unique": 0
        },
        "evening": {
          "percent": 0,
          "audiencePercent": 0,
          "count": 0,
          "unique": 0
        },
        "night": {
          "percent": 0,
          "audiencePercent": 0,
          "count": 0,
          "unique": 0
        }
      }
    },
    "sundays": {
      "percent": 0,
      "count": 0,
      "timezoneWiseData": {
        "morning": {
          "percent": 0,
          "audiencePercent": 0,
          "count": 0,
          "unique": 0
        },
        "afternoon": {
          "percent": 0,
          "audiencePercent": 0,
          "count": 0,
          "unique": 0
        },
        "evening": {
          "percent": 0,
          "audiencePercent": 0,
          "count": 0,
          "unique": 0
        },
        "night": {
          "percent": 0,
          "audiencePercent": 0,
          "count": 0,
          "unique": 0
        }
      }
    }
  })

  useEffect(() => {
    dispatch(getTimezoneWiseDataByAudienceTypeMarketSite({
      marketSite: marketSite, categoryType: audienceCategory, gender: genderType
    }))
  }, [audienceCategory , genderType])

  useEffect(() => {
    if (timezoneWiseDataByMarketSiteError) {
      alert("Error Fetching Data : " + timezoneWiseDataByMarketSiteError)
    }

    if (timezoneWiseDataByMarketSiteSuccess) {
      setTimezoneDataByMarketSite(timezoneWiseDataByMarketSite)
    }

  }, [timezoneWiseDataByMarketSiteSuccess, timezoneWiseDataByMarketSiteError])

  const handleKeyDown = (e: any, index: any) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const next: any = inputRefs.current[index + 1];
      if (next) next.focus();
    }
  };

  const handleBlur = () => {
    setEditableCell(null);
  };

  const genders = {
    "Male": 80,
    "Female": 80
  }

  const handleData = (gender: string, value: any, day: any, timezone: any) => {
    const enterValue = Number(value / 100);

  };

  return (
    <div className='flex flex-col'>
      <AudienceTableHeader tableHeader={"Timezone Wise Data"} tableSubHeader={"(" + audienceCategory + ")"} tableType={"horizontal"}
        resetButton={() => { }} lockButton={() => { }} />
      <GenderSelector genderData={genders} genderType={genderType} setGenderType={setGenderType} />
      <table className="border-collapse w-full text-[12px]">
        <thead>
          <tr className="text-[#FFFFFF] bg-[#1297E2]">
            <th className="border border-slate-300 py-2">
              Monthly Distribution
            </th>
            <th className="border border-slate-300 py-2">
              Audience Weighage / Day
            </th>
            <th className="border border-slate-300 py-2">
              Audience count / Day
            </th>
            <th className="border border-slate-300 py-2">Time Zones</th>
            <th className="border border-slate-300 py-2" onClick={() => {
              if (decimal == 1) {
                setDecimal(0)
              } else {
                setDecimal(1)
              }
            }}>% share of visits</th>
            <th className="border border-slate-300 py-2">Audience %</th>
            <th className="border border-slate-300 py-2">
              Audience Count / Timezone
            </th>
            <th className="border border-slate-300 py-2 bg-[#E2FFD4] text-black">
              Unique Audience Count / Timezone
            </th>
          </tr>
        </thead>
        <tbody className="w-full border border-1">
          {Object.entries(timezoneDataByMarketSite)?.map(([dayType, dayTypeData]: [any, any], i: any) => (
            <tr key={i}>
              <td className="border h-full">
                <div className="h-full flex justify-center items-center">
                  <h1 className="">
                    {dayType}
                  </h1>
                </div>
              </td>
              <td className="border h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.percent.toFixed(2)} %
                </div>
              </td>
              <td className="border h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.count.toFixed(2)}
                </div>
              </td>
              <td className="border">
                {Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((timezoneKey: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{timezoneKey.toUpperCase()}</h1>
                  </div>
                ))}
              </td>
              <td className="border-b">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((m: any, k: any) => (
                  <div key={k}
                    onMouseEnter={() => {
                      setEditableCell({ gender: "gender", day: dayType, index: k, column: "percentage" })
                    }
                    }
                    onMouseLeave={handleBlur}
                    className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} border-slate-300 text-[#1297E2] cursor-pointer text-center p-2 flex justify-center items-center w-full`}
                  >
                    {editableCell?.index === k &&
                      editableCell?.gender === "gender" &&
                      editableCell?.day === dayType &&
                      editableCell?.column === "percentage" ? (
                      <input
                        // disabled={gd.weight === 0}
                        title=""
                        placeholder="unique"
                        type="number"
                        value={Number(m?.percent).toFixed(0)}
                        onBlur={handleBlur}
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleData("gender", e.target.value, m, m)}
                        ref={(el: any) => (inputRefs.current[k] = el)}
                        onKeyDown={(e) => handleKeyDown(e, k)}
                        autoFocus={k == 0}
                        className="w-full h-full text-center cursor-pointer"
                      />
                    ) : (
                      `${Number(m?.percent).toFixed(decimal)}%`
                    )}
                  </div>
                ))}
              </td>
              <td className="border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((m: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-1 flex justify-center items-center w-full`}>
                    <h1>{m?.audiencePercent?.toFixed(2)} %</h1>
                  </div>
                ))}
              </td>
              <td className="border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.count?.toFixed(decimal)}</h1>
                  </div>
                ))}
              </td>
              <td className="border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.unique?.toFixed(2)}</h1>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

