import { GenderSelector } from '../../components/layouts/GenderSelector';
import { AudienceTableHeader } from '../../components/layouts/AudienceTableHeader';
import { addTimezoneWiseDataByAudienceType, getTimezoneWiseDataByAudienceTypeMarketSite, updateAudienceDataStatus } from '../../actions/audienceAction';
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_RESET,
  GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_RESET,
  TIMEZONE_WISE_DATA_STATUS,
  UPDATE_AUDIENCE_DATA_STATUS_RESET
} from '../../constants/audienceConstant';
import { message, Tooltip } from 'antd';

interface AudienceTimezoneWiseTableProps {
  marketSite: string;
  audienceCategory: string;
  audiencePercent: number;
  id: string;
  setId: string;
  dataCheckStatus: {};
  setDataCheckStatus: Function;
  avgDataBool: boolean;
}

export const AudienceTimezoneWiseTable: React.FC<AudienceTimezoneWiseTableProps> = ({
  marketSite,
  audienceCategory,
  id,
  dataCheckStatus,
  setDataCheckStatus,
  avgDataBool,
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

  const updateAudienceDataStatusSelector = useSelector(
    (state: any) => state.updateAudienceDataStatus
  );
  const {
    loading: updateAudienceDataStatusLoading,
    data: updateAudienceDataStatusData,
    success: updateAudienceDataStatusSuccess,
    error: updateAudienceDataStatusError
  } = updateAudienceDataStatusSelector;

  const [lockStatus, setLockStatus] = useState(dataCheckStatus[TIMEZONE_WISE_DATA_STATUS][audienceCategory]);
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
      newData[gender][dayType] = {}
      Object.entries(dayTypeData?.timezoneWiseData)?.map(([timezone, timezoneData]: [any, any], k: any) => {
        newData[gender][dayType][timezone] = timezoneData?.percent / 100
      })
    })
    setData(newData);
  }

  const resetButtonFunction = () => {
    dispatch(getTimezoneWiseDataByAudienceTypeMarketSite({
      marketSite: marketSite, categoryType: audienceCategory, id: id, avgDataBool: avgDataBool
    }))
  }

  useEffect(() => {
    setLockStatus(dataCheckStatus[TIMEZONE_WISE_DATA_STATUS][audienceCategory])
  }, [dataCheckStatus])

  useEffect(() => {
    dispatch(getTimezoneWiseDataByAudienceTypeMarketSite({
      marketSite: marketSite, categoryType: audienceCategory, id: id, avgDataBool: avgDataBool
    }))
    setGenderType(genderType)
    setData({})
  }, [audienceCategory, avgDataBool])

  useEffect(() => {
    if (timezoneWiseDataByMarketSiteError) {
      alert("Error Fetching Data : " + timezoneWiseDataByMarketSiteError)
      dispatch({ type: GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_RESET })
    }

    if (timezoneWiseDataByMarketSiteSuccess) {
      setTimezoneDataByMarketSite(timezoneWiseDataByMarketSite.response)
      setGenders(timezoneWiseDataByMarketSite.genderResponse)
      if (timezoneDataByMarketSite.audienceDataStatus != null)
        setDataCheckStatus(timezoneDataByMarketSite?.audienceDataStatus)
      saveTimezoneData(timezoneWiseDataByMarketSite.response[genderType], genderType)
      dispatch({ type: GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_RESET })
    }

    if (addTimezoneWiseDataByAudienceTypeSuccess) {
      message.info("Data Saved Successfully")
      setDataCheckStatus(addTimezoneWiseDataByAudienceTypeData?.audienceDataStatus)
      dispatch({ type: ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_RESET })
      resetButtonFunction()
    }

    if (addTimezoneWiseDataByAudienceTypeError) {
      alert("Error Saving Data : " + addTimezoneWiseDataByAudienceTypeError)
      dispatch({ type: ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_RESET })
    }

    if (updateAudienceDataStatusError) {
      alert("Error UnLocking Data : " + updateAudienceDataStatusError)
      dispatch({ type: UPDATE_AUDIENCE_DATA_STATUS_RESET })
    }

    if (updateAudienceDataStatusSuccess) {
      setDataCheckStatus(updateAudienceDataStatusData?.audienceDataStatus)
      dispatch({ type: UPDATE_AUDIENCE_DATA_STATUS_RESET })
    }

  }, [timezoneWiseDataByMarketSiteSuccess, timezoneWiseDataByMarketSiteError,
    updateAudienceDataStatusError, updateAudienceDataStatusSuccess,
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
          audiencePercent: (enterValue * newTimezoneData[genderType][day]?.percent) / 100,
          count: (enterValue * newTimezoneData[genderType][day].count) / 100,
          unique: (enterValue * newTimezoneData[genderType][day].count * newTimezoneData[genderType][day].timezoneWiseData[timezone].uniquePercent) / 100,
        }
      }
    };

    setTimezoneDataByMarketSite(newTimezoneData);
    saveTimezoneData(newTimezoneData[genderType], genderType);
  };

  const checkData = () => {
    if ((data["Male"] == null || data["Female"] == null) && lockStatus == false) {
      alert("Please Verify Both Male & Female Data")
      return false
    }

    for (const genderData of Object.values(data) as { [key: string]: any }[]) {
      for (const dayTypeData of Object.values(genderData) as { [key: string]: any }[]) {
        let count = 0;
        for (const timezoneData of Object.values(dayTypeData) as number[]) {
          count += timezoneData;
        }
        if (count.toFixed(0) != "1" && lockStatus == false) {
          alert("Timezone Percentage sum should be 100%")
          return false
        }
      }
    }

    return true
  }

  const getTotalTimezoneDistributionPercent = (dayType: any) => {
    var percentSum = 0
    if (timezoneDataByMarketSite[genderType] && timezoneDataByMarketSite[genderType][dayType]) {
      for (const timezoneData of Object.values(timezoneDataByMarketSite[genderType][dayType].timezoneWiseData) as any) {
        percentSum += timezoneData?.percent;
      }
    }
    return percentSum
  }

  const lockButtonFunction = () => {
    if (checkData() && lockStatus == false) {
      dispatch(addTimezoneWiseDataByAudienceType({
        id: id,
        audienceCategory: audienceCategory,
        data: data
      }))
    }
    else if (lockStatus === true) {
      dispatch(updateAudienceDataStatus({
        id: id, audienceCategory: audienceCategory, timeData : false
      }))
    }
  }

  const genderTabClick = (gender: any) => {
    setGenderType(gender)
    saveTimezoneData(timezoneDataByMarketSite[gender], gender)
  }

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className='flex flex-col p-4'>
      <AudienceTableHeader tableHeader={"Timezone Wise Data"} tableSubHeader={"(" + audienceCategory + ")"} tableType={"horizontal"}
        resetButton={() => resetButtonFunction()} lockButton={() => lockButtonFunction()} lockStatus={lockStatus} />
      <GenderSelector genderData={genders} genderType={genderType} genderTabClick={genderTabClick} />
      <table className="border-collapse w-full text-[12px]">
        <thead>
          <tr className="grid grid-cols-12 text-[#474747] bg-[#F9F9F9] border border-[#E7E7E7]">
            <th className="col-span-1 py-2">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Monthly Distribution">
                  <p className="truncate">
                    Monthly Distribution
                  </p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-1 py-2">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Audience Weighage / Day">
                  <p className="truncate">
                    Audience Weighage / Day
                  </p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-1 py-2">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Audience count / Day">
                  <p className="truncate">
                    Audience count / Day
                  </p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-2 py-2">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Time Zones">
                  <p className="truncate">
                    Time Zones
                  </p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-2 py-2 text-[#ffffff] bg-[#FF5050]" onClick={() => {
              if (decimal == 1) {
                setDecimal(0)
              } else {
                setDecimal(1)
              }
            }}>
              <div className="grid grid-cols-5 h-full">
                <div className="col-span-4 flex items-center justify-center pl-2">
                  <Tooltip title="% share of visits">
                    <p className="truncate">
                      % share of visits
                    </p>
                  </Tooltip>
                </div>
                <div className="col-span-1 flex justify-center items-enter pr-2">
                  <i className="fi fi-sr-pencil text-[10px] flex items-center"></i>
                </div>
              </div>

            </th>
            <th className="col-span-1 py-2">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Audience %">
                  <p className="truncate">
                    Audience %
                  </p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-2 py-2">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Audience Count / Timezone">
                  <p className="truncate">
                    Audience Count / Timezone
                  </p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-2 py-2">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Unique Audience Count / Timezone">
                  <p className="truncate">
                    Unique Audience Count / Timezone
                  </p>
                </Tooltip>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="w-full">

          {Object.entries(timezoneDataByMarketSite?.[genderType] || {})?.filter(([dayType]) => dayType === 'weekdays')?.map(([dayType, dayTypeData]: [any, any], i: any) => (
            <tr key={0} className='grid grid-cols-12'>
              <td className="col-span-1 border-x h-full font-semibold">
                <div className="h-full flex justify-center items-center">
                  <h1 className="">
                    {capitalizeFirst(dayType)}
                  </h1>
                </div>
              </td>
              <td className="col-span-1 h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.percent.toFixed(2)} %
                </div>
              </td>
              <td className="col-span-1 border-x h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.count.toFixed(2)}
                </div>
              </td>
              <td className="col-span-2 h-full">
                {Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((timezoneKey: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{capitalizeFirst(timezoneKey)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border-x border-red-500">
                {Object.entries(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map(([timezone, m]: any, k: any) => (
                  <div key={k}
                    onClick={() => {
                      setEditableCell({ gender: "gender", day: dayType, index: k, column: "percentage" })
                    }}
                    // onMouseLeave={handleBlur}
                    className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b border-[#FF5050]"} border-red-500 text-[#FF5050] cursor-pointer text-center p-2 flex justify-center items-center w-full font-semibold`}
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
              <td className="col-span-1">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((m: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-1 flex justify-center items-center w-full`}>
                    <h1>{m?.audiencePercent?.toFixed(2)} %</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border-x">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.count?.toFixed(decimal)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border-r">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.unique?.toFixed(2)}</h1>
                  </div>
                ))}
              </td>
            </tr>
          ))}

          <tr className="grid grid-cols-12 mb-4 border">
            <td className="col-span-1 text-[#474747] bg-[#F7F7F7] p-2">
              <div className="flex items-center justify-center h-full">
                <Tooltip title="Monthly Distribution Total Percent">
                  <p className="truncate">Total</p>
                </Tooltip>
              </div>
            </td>
            <td className="col-span-4 text-[#474747] bg-[#F7F7F7]" />
            <td className="col-span-2 text-[#FFFFFF] bg-[#000000]">
              <div className="flex items-center justify-center h-full">
                <p className="truncate">{getTotalTimezoneDistributionPercent("weekdays")}%</p>
              </div>
            </td>
            <td className="col-span-5 text-[#474747] bg-[#F7F7F7]" />
          </tr>

          {Object.entries(timezoneDataByMarketSite?.[genderType] || {})?.filter(([dayType]) => dayType === 'saturdays')?.map(([dayType, dayTypeData]: [any, any], i: any) => (
            <tr key={1} className='grid grid-cols-12 border-t'>
              <td className="col-span-1 border-x h-full font-semibold">
                <div className="h-full flex justify-center items-center">
                  <h1 className="">
                    {capitalizeFirst(dayType)}
                  </h1>
                </div>
              </td>
              <td className="col-span-1 h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.percent.toFixed(2)} %
                </div>
              </td>
              <td className="col-span-1 border-x h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.count.toFixed(2)}
                </div>
              </td>
              <td className="col-span-2 h-full">
                {Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((timezoneKey: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{capitalizeFirst(timezoneKey)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border-x border-t border-red-500">
                {Object.entries(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map(([timezone, m]: any, k: any) => (
                  <div key={k}
                    onClick={() => {
                      setEditableCell({ gender: "gender", day: dayType, index: k, column: "percentage" })
                    }}
                    // onMouseLeave={handleBlur}
                    className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b border-[#FF5050]"} border-red-500 text-[#FF5050] cursor-pointer text-center p-2 flex justify-center items-center w-full font-semibold`}
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
              <td className="col-span-1">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((m: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-1 flex justify-center items-center w-full`}>
                    <h1>{m?.audiencePercent?.toFixed(2)} %</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border-x">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.count?.toFixed(decimal)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border-r">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.unique?.toFixed(2)}</h1>
                  </div>
                ))}
              </td>
            </tr>
          ))}

          <tr className="grid grid-cols-12 mb-4 border">
            <td className="col-span-1 text-[#474747] bg-[#F7F7F7] p-2">
              <div className="flex items-center justify-center h-full">
                <Tooltip title="Monthly Distribution Total Percent">
                  <p className="truncate">Total</p>
                </Tooltip>
              </div>
            </td>
            <td className="col-span-4 text-[#474747] bg-[#F7F7F7]" />
            <td className="col-span-2 text-[#FFFFFF] bg-[#000000]">
              <div className="flex items-center justify-center h-full">
                <p className="truncate">{getTotalTimezoneDistributionPercent("saturdays")}%</p>
              </div>
            </td>
            <td className="col-span-5 text-[#474747] bg-[#F7F7F7]" />
          </tr>

          {Object.entries(timezoneDataByMarketSite?.[genderType] || {})?.filter(([dayType]) => dayType === 'sundays')?.map(([dayType, dayTypeData]: [any, any], i: any) => (
            <tr key={2} className='grid grid-cols-12 border-t'>
              <td className="col-span-1 border-x h-full font-semibold">
                <div className="h-full flex justify-center items-center">
                  <h1 className="">
                    {capitalizeFirst(dayType)}
                  </h1>
                </div>
              </td>
              <td className="col-span-1 h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.percent.toFixed(2)} %
                </div>
              </td>
              <td className="col-span-1 border-x h-full">
                <div className={`h-[20vh] p-1 flex justify-center items-center`}>
                  {dayTypeData?.count.toFixed(2)}
                </div>
              </td>
              <td className="col-span-2 h-full">
                {Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((timezoneKey: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{capitalizeFirst(timezoneKey)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border-x border-t border-red-500">
                {Object.entries(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map(([timezone, m]: any, k: any) => (
                  <div key={k}
                    onClick={() => {
                      setEditableCell({ gender: "gender", day: dayType, index: k, column: "percentage" })
                    }}
                    // onMouseLeave={handleBlur}
                    className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b border-[#FF5050]"} border-red-500 text-[#FF5050] cursor-pointer text-center p-2 flex justify-center items-center w-full font-semibold`}
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
              <td className="col-span-1">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((m: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-1 flex justify-center items-center w-full`}>
                    <h1>{m?.audiencePercent?.toFixed(2)} %</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border-x">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.count?.toFixed(decimal)}</h1>
                  </div>
                ))}
              </td>
              <td className="col-span-2 border-r">
                {Object.values(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.map((n: any, k: any) => (
                  <div key={k} className={`h-[5vh] ${k + 1 === Object.keys(dayTypeData?.timezoneWiseData)?.filter((l: any) => l !== "_id")?.length ? "" : "border-b"} p-2 flex justify-center items-center w-full`}>
                    <h1>{n?.unique?.toFixed(2)}</h1>
                  </div>
                ))}
              </td>
            </tr>
          ))}

          <tr className="grid grid-cols-12 mb-4 border">
            <td className="col-span-1 text-[#474747] bg-[#F7F7F7] p-2">
              <div className="flex items-center justify-center h-full">
                <Tooltip title="Monthly Distribution Total Percent">
                  <p className="truncate">Total</p>
                </Tooltip>
              </div>
            </td>
            <td className="col-span-4 text-[#474747] bg-[#F7F7F7]" />
            <td className="col-span-2 text-[#FFFFFF] bg-[#000000]">
              <div className="flex items-center justify-center h-full">
                <p className="truncate">{getTotalTimezoneDistributionPercent("sundays")}%</p>
              </div>
            </td>
            <td className="col-span-5 text-[#474747] bg-[#F7F7F7]" />
          </tr>
        </tbody>
      </table>
    </div >
  );
}

