import { GenderSelector } from '../../components/layouts/GenderSelector';
import { AudienceTableHeader } from '../../components/layouts/AudienceTableHeader';
import { addTimezoneWiseDataByAudienceType, getTimezoneWiseDataByAudienceTypeMarketSite } from '../../actions/audienceAction';
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_RESET,
  GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_RESET
} from '../../constants/audienceConstant';
import { message, Tooltip } from 'antd';

interface AudienceTimezoneWiseTableProps {
  marketSite: String;
  audienceCategory: String;
  audiencePercent: number;
  id: string;
  setId: string;
  dataCheckStatus: {};
  setDataCheckStatus: Function;
}

export const AudienceTimezoneWiseTable: React.FC<AudienceTimezoneWiseTableProps> = ({
  marketSite,
  audienceCategory,
  audiencePercent,
  id,
  setId,
  dataCheckStatus,
  setDataCheckStatus
}: any) => {

  const dispatch = useDispatch<any>();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const getTimezoneWiseDataByAudienceTypeMarketSiteSelector = useSelector(
    (state: any) => state.getTimezoneWiseDataByAudienceTypeMarketSite
  );
  const {
    loading: timezoneWiseDataByMarketSiteLoading,
    data: timezoneWiseDataByMarketSite,
    success: timezoneWiseDataByMarketSiteSuccess,
    error: timezoneWiseDataByMarketSiteError
  } = getTimezoneWiseDataByAudienceTypeMarketSiteSelector;


  const addTimezoneWiseDataByAudienceTypeSelector = useSelector(
    (state: any) => state.addTimezoneWiseDataByAudienceType
  );
  const {
    loading: addTimezoneWiseDataByAudienceTypeLoading,
    data: addTimezoneWiseDataByAudienceTypeData,
    success: addTimezoneWiseDataByAudienceTypeSuccess,
    error: addTimezoneWiseDataByAudienceTypeError
  } = addTimezoneWiseDataByAudienceTypeSelector;

  const [lockStatus, setLockStatus] = useState(dataCheckStatus["Timezone Wise Data"][audienceCategory]);
  const [genderType, setGenderType] = useState("Male")
  const [decimal, setDecimal] = useState<any>(0);
  const [data, setData] = useState<any>({});
  const [genders, setGenders] = useState<any>({
    "Male": 50,
    "Female": 50
  });
  const [editableCell, setEditableCell] = useState<any>(null);
  const [timezoneDataByMarketSite, setTimezoneDataByMarketSite] = useState<any>({})

  const saveTimezoneData = (timezoneData: any, gender: any) => {
    const newData: any = data;
    newData[gender] = {};
    Object.entries(timezoneData)?.map(([dayType, dayTypeData]: [any, any], i: any) => {
      newData[genderType][dayType] = {}
      Object.entries(dayTypeData?.timezoneWiseData)?.map(([timezone, timezoneData]: [any, any], k: any) => {
        newData[genderType][dayType][timezone] = timezoneData?.percent / 100
      })
    })

    setData(newData);
  }

  useEffect(() => {
    dispatch(getTimezoneWiseDataByAudienceTypeMarketSite({
      marketSite: marketSite, categoryType: audienceCategory, id: id
    }))
    setLockStatus(dataCheckStatus["Timezone Wise Data"][audienceCategory])
    setGenderType(genderType)
    setData({})
  }, [audienceCategory, dataCheckStatus])

  useEffect(() => {
    if (timezoneWiseDataByMarketSiteError) {
      alert("Error Fetching Data : " + timezoneWiseDataByMarketSiteError)
      dispatch({ type: GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_RESET })
    }

    if (timezoneWiseDataByMarketSiteSuccess) {
      setTimezoneDataByMarketSite(timezoneWiseDataByMarketSite.response)
      setGenders(timezoneWiseDataByMarketSite.genderResponse)
      saveTimezoneData(timezoneWiseDataByMarketSite.response[genderType], genderType)
      dispatch({ type: GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_RESET })
    }

    if (addTimezoneWiseDataByAudienceTypeSuccess) {
      message.info("Data Saved Successfully")
      dispatch({ type: ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_RESET })
      setDataCheckStatus((prevData: any) => ({
        ...prevData,
        ["Timezone Wise Data"]: {
          ...prevData["Timezone Wise Data"],
          [audienceCategory]: true
        }
      }));
    }

    if (addTimezoneWiseDataByAudienceTypeError) {
      alert("Error Saving Data : " + addTimezoneWiseDataByAudienceTypeError)
      dispatch({ type: ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_RESET })
    }

  }, [timezoneWiseDataByMarketSiteSuccess, timezoneWiseDataByMarketSiteError,
    addTimezoneWiseDataByAudienceTypeSuccess, addTimezoneWiseDataByAudienceTypeError
  ])

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

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>, day: any, timezone: any) => {
    const enterValue = parseFloat(event.target.value);
    const newTimezoneData = JSON.parse(JSON.stringify(timezoneDataByMarketSite));
    newTimezoneData[genderType][day] = {
      ...newTimezoneData[genderType][day],
      timezoneWiseData: {
        ...newTimezoneData[genderType][day].timezoneWiseData,
        [timezone]: {
          ...newTimezoneData[genderType][day].timezoneWiseData[timezone],
          percent: enterValue,
          audiencePercent: (enterValue * newTimezoneData[genderType][day].percent) / 100,
          count: (enterValue * newTimezoneData[genderType][day].count) / 100
        }
      }
    };

    setTimezoneDataByMarketSite(newTimezoneData);
    saveTimezoneData(newTimezoneData[genderType], genderType);
  };

  const checkData = () => {
    if (data["Male"] == null || data["Female"] == null) {
      alert("Please Verify Both Male & Female Data")
      return false
    }

    for (const genderData of Object.values(data) as { [key: string]: any }[]) {
      for (const dayTypeData of Object.values(genderData) as { [key: string]: any }[]) {
        let count = 0;
        for (const timezoneData of Object.values(dayTypeData) as number[]) {
          count += timezoneData;
        }
        if (count.toFixed(0) != "1") {
          alert("Timezone Percentage sum should be 100%")
          return false
        }
      }
    }

    return true
  }

  const getTotalTimezoneDistributionPercent = (dayType: any) => {
    var percentSum = 0
    console.log(timezoneDataByMarketSite)
    if (timezoneDataByMarketSite[genderType] && timezoneDataByMarketSite[genderType][dayType]) {
      for (const timezoneData of Object.values(timezoneDataByMarketSite[genderType][dayType].timezoneWiseData) as any) {
        percentSum += timezoneData?.percent;
      }
    }
    return percentSum
  }

  const lockButtonFunction = () => {
    if (checkData() && lockStatus == false) {
      setLockStatus(!lockStatus)
      dispatch(addTimezoneWiseDataByAudienceType({
        id: id,
        audienceCategory: audienceCategory,
        data: data
      }))
    }
    else if (lockStatus === true) {
      setLockStatus(!lockStatus)
      setDataCheckStatus((prevData: any) => ({
        ...prevData,
        ["Timezone Wise Data"]: {
          ...prevData["Timezone Wise Data"],
          [audienceCategory]: false
        }
      }));
    }
  }

  const resetButtonFunction = () => {
    dispatch(getTimezoneWiseDataByAudienceTypeMarketSite({
      marketSite: marketSite, categoryType: audienceCategory, gender: genderType, id: id
    }))
  }

  const genderTabClick = (gender: any) => {
    setGenderType(gender)
    saveTimezoneData(timezoneDataByMarketSite[gender], gender)
  }

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className='flex flex-col bg-[#ffffff] p-4'>
      <AudienceTableHeader tableHeader={"Timezone Wise Data"} tableSubHeader={"(" + audienceCategory + ")"} tableType={"horizontal"}
        resetButton={() => resetButtonFunction()} lockButton={() => lockButtonFunction()} lockStatus={lockStatus} />
      <GenderSelector genderData={genders} genderType={genderType} genderTabClick={genderTabClick} />
      <table className="border-collapse w-full text-[14px]">
        <thead>
          <tr className="grid grid-cols-12 text-[#474747] bg-[#F9F9F9] border border-[#E7E7E7]">
            <th className="col-span-1 border border-slate-300 py-2 flex items-center justify-center">
              Monthly Distribution
            </th>
            <th className="col-span-1  border border-slate-300 py-2 flex items-center justify-center">
              Audience Weighage / Day
            </th>
            <th className="col-span-1  border border-slate-300 py-2 flex items-center justify-center">
              Audience count / Day
            </th>
            <th className="col-span-2 border border-slate-300 py-2 flex items-center justify-center">Time Zones</th>
            <th className="col-span-2 border border-slate-300 py-2 text-[#ffffff] bg-[#FF5050] flex items-center justify-center" onClick={() => {
              if (decimal == 1) {
                setDecimal(0)
              } else {
                setDecimal(1)
              }
            }}>% share of visits</th>
            <th className="col-span-1 border border-slate-300 py-2 flex items-center justify-center">Audience %</th>
            <th className="col-span-2 border border-slate-300 py-2 flex items-center justify-center">
              Audience Count / Timezone
            </th>
            <th className="col-span-2 border border-slate-300 py-2 flex items-center justify-center">
              Unique Audience Count / Timezone
            </th>
          </tr>
        </thead>
        <tbody className="w-full border border-1">
          {Object.entries(timezoneDataByMarketSite?.[genderType] || {})?.filter(([dayType]) => dayType === 'weekdays')?.map(([dayType, dayTypeData]: [any, any], i: any) => (
            <tr key={0} className='grid grid-cols-12'>
              <td className="col-span-1 border h-full font-semibold">
                <div className="h-full flex justify-center items-center">
                  <h1 className="">
                    {capitalizeFirst(dayType)}
                  </h1>
                </div>
              </td>
              <td className="col-span-1 border h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.percent.toFixed(2)} %
                </div>
              </td>
              <td className="col-span-1 border h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.count.toFixed(2)}
                </div>
              </td>
              <td className="col-span-2 border h-full">
                {Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((timezoneKey: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{capitalizeFirst(timezoneKey)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border border-[#FF5050]">
                {Object.entries(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map(([timezone, m]: any, k: any) => (
                  <div key={k}
                    onMouseEnter={() => {
                      setEditableCell({ gender: "gender", day: dayType, index: k, column: "percentage" })
                    }
                    }
                    onMouseLeave={handleBlur}
                    className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b border-[#FF5050]"} border-slate-300 text-[#FF5050] cursor-pointer text-center p-2 flex justify-center items-center w-full font-semibold`}
                  >
                    {editableCell?.index === k &&
                      editableCell?.gender === "gender" &&
                      editableCell?.day === dayType &&
                      editableCell?.column === "percentage" ? (
                      <input
                        disabled={lockStatus}
                        title=""
                        placeholder="unique"
                        type="number"
                        value={Number(m?.percent)}
                        onBlur={handleBlur}
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleDataChange(e, dayType, timezone)}
                        ref={(el: any) => (inputRefs.current[k] = el)}
                        onKeyDown={(e) => handleKeyDown(e, k)}
                        autoFocus={k == 0}
                        className="w-full h-full text-center cursor-pointer focus:outline-none"
                      />
                    ) : (
                      `${Number(m?.percent).toFixed(2)}%`
                    )}
                  </div>
                ))}
              </td>
              <td className="col-span-1 border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((m: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-1 flex justify-center items-center w-full`}>
                    <h1>{m?.audiencePercent?.toFixed(2)} %</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.count?.toFixed(decimal)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.unique?.toFixed(2)}</h1>
                  </div>
                ))}
              </td>
            </tr>
          ))}

          <tr className="grid grid-cols-12 pb-4">
            <td className="col-span-1 border text-[#474747] bg-[#F7F7F7] p-2">
              <div className="flex items-center justify-center h-full">
                <Tooltip title="Monthly Distribution Total Percent">
                  <p className="truncate">Total</p>
                </Tooltip>
              </div>
            </td>
            <td className="col-span-4 border text-[#474747] bg-[#F7F7F7]" />
            <td className="col-span-2 border text-[#FFFFFF] bg-[#000000]">
              <div className="flex items-center justify-center h-full">
                <p className="truncate">{getTotalTimezoneDistributionPercent("weekdays")}%</p>
              </div>
            </td>
            <td className="col-span-5 border text-[#474747] bg-[#F7F7F7]" />
          </tr>

          {Object.entries(timezoneDataByMarketSite?.[genderType] || {})?.filter(([dayType]) => dayType === 'saturdays')?.map(([dayType, dayTypeData]: [any, any], i: any) => (
            <tr key={1} className='grid grid-cols-12'>
              <td className="col-span-1 border h-full font-semibold">
                <div className="h-full flex justify-center items-center">
                  <h1 className="">
                    {capitalizeFirst(dayType)}
                  </h1>
                </div>
              </td>
              <td className="col-span-1 border h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.percent.toFixed(2)} %
                </div>
              </td>
              <td className="col-span-1 border h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.count.toFixed(2)}
                </div>
              </td>
              <td className="col-span-2 border h-full">
                {Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((timezoneKey: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{capitalizeFirst(timezoneKey)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border border-[#FF5050]">
                {Object.entries(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map(([timezone, m]: any, k: any) => (
                  <div key={k}
                    onMouseEnter={() => {
                      setEditableCell({ gender: "gender", day: dayType, index: k, column: "percentage" })
                    }
                    }
                    onMouseLeave={handleBlur}
                    className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b border-[#FF5050]"} border-slate-300 text-[#FF5050] cursor-pointer text-center p-2 flex justify-center items-center w-full font-semibold`}
                  >
                    {editableCell?.index === k &&
                      editableCell?.gender === "gender" &&
                      editableCell?.day === dayType &&
                      editableCell?.column === "percentage" ? (
                      <input
                        disabled={lockStatus}
                        title=""
                        placeholder="unique"
                        type="number"
                        value={Number(m?.percent)}
                        onBlur={handleBlur}
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleDataChange(e, dayType, timezone)}
                        ref={(el: any) => (inputRefs.current[k] = el)}
                        onKeyDown={(e) => handleKeyDown(e, k)}
                        autoFocus={k == 0}
                        className="w-full h-full text-center cursor-pointer focus:outline-none"
                      />
                    ) : (
                      `${Number(m?.percent).toFixed(2)}%`
                    )}
                  </div>
                ))}
              </td>
              <td className="col-span-1 border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((m: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-1 flex justify-center items-center w-full`}>
                    <h1>{m?.audiencePercent?.toFixed(2)} %</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.count?.toFixed(decimal)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.unique?.toFixed(2)}</h1>
                  </div>
                ))}
              </td>
            </tr>
          ))}

          <tr className="grid grid-cols-12 pb-4">
            <td className="col-span-1 border text-[#474747] bg-[#F7F7F7] p-2">
              <div className="flex items-center justify-center h-full">
                <Tooltip title="Monthly Distribution Total Percent">
                  <p className="truncate">Total</p>
                </Tooltip>
              </div>
            </td>
            <td className="col-span-4 border text-[#474747] bg-[#F7F7F7]" />
            <td className="col-span-2 border text-[#FFFFFF] bg-[#000000]">
              <div className="flex items-center justify-center h-full">
                <p className="truncate">{getTotalTimezoneDistributionPercent("saturdays")}%</p>
              </div>
            </td>
            <td className="col-span-5 border text-[#474747] bg-[#F7F7F7]" />
          </tr>

          {Object.entries(timezoneDataByMarketSite?.[genderType] || {})?.filter(([dayType]) => dayType === 'sundays')?.map(([dayType, dayTypeData]: [any, any], i: any) => (
            <tr key={2} className='grid grid-cols-12'>
              <td className="col-span-1 border h-full font-semibold">
                <div className="h-full flex justify-center items-center">
                  <h1 className="">
                    {capitalizeFirst(dayType)}
                  </h1>
                </div>
              </td>
              <td className="col-span-1 border h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.percent.toFixed(2)} %
                </div>
              </td>
              <td className="col-span-1 border h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.count.toFixed(2)}
                </div>
              </td>
              <td className="col-span-2 border h-full">
                {Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((timezoneKey: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{capitalizeFirst(timezoneKey)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border border-[#FF5050]">
                {Object.entries(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map(([timezone, m]: any, k: any) => (
                  <div key={k}
                    onMouseEnter={() => {
                      setEditableCell({ gender: "gender", day: dayType, index: k, column: "percentage" })
                    }
                    }
                    onMouseLeave={handleBlur}
                    className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b border-[#FF5050]"} border-slate-300 text-[#FF5050] cursor-pointer text-center p-2 flex justify-center items-center w-full font-semibold`}
                  >
                    {editableCell?.index === k &&
                      editableCell?.gender === "gender" &&
                      editableCell?.day === dayType &&
                      editableCell?.column === "percentage" ? (
                      <input
                        disabled={lockStatus}
                        title=""
                        placeholder="unique"
                        type="number"
                        value={Number(m?.percent)}
                        onBlur={handleBlur}
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleDataChange(e, dayType, timezone)}
                        ref={(el: any) => (inputRefs.current[k] = el)}
                        onKeyDown={(e) => handleKeyDown(e, k)}
                        autoFocus={k == 0}
                        className="w-full h-full text-center cursor-pointer focus:outline-none"
                      />
                    ) : (
                      `${Number(m?.percent).toFixed(2)}%`
                    )}
                  </div>
                ))}
              </td>
              <td className="col-span-1 border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((m: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-1 flex justify-center items-center w-full`}>
                    <h1>{m?.audiencePercent?.toFixed(2)} %</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.count?.toFixed(decimal)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.unique?.toFixed(2)}</h1>
                  </div>
                ))}
              </td>
            </tr>
          ))}

          <tr className="grid grid-cols-12 pb-4">
            <td className="col-span-1 border text-[#474747] bg-[#F7F7F7] p-2">
              <div className="flex items-center justify-center h-full">
                <Tooltip title="Monthly Distribution Total Percent">
                  <p className="truncate">Total</p>
                </Tooltip>
              </div>
            </td>
            <td className="col-span-4 border text-[#474747] bg-[#F7F7F7]" />
            <td className="col-span-2 border text-[#FFFFFF] bg-[#000000]">
              <div className="flex items-center justify-center h-full">
                <p className="truncate">{getTotalTimezoneDistributionPercent("sundays")}%</p>
              </div>
            </td>
            <td className="col-span-5 border text-[#474747] bg-[#F7F7F7]" />
          </tr>
        </tbody>
      </table>
    </div >
  );
}

