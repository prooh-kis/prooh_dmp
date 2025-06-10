import { AudienceTableHeader } from "../../components/layouts/AudienceTableHeader";
import { addGenderWiseDataByAudienceType, getGenderWiseDataByAudienceTypeMarketSite } from "../../actions/audienceAction";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_RESET,
  GENDER_WISE_DATA_STATUS,
  GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_RESET
} from "../../constants/audienceConstant";
import { message, Tooltip } from "antd";

interface AudienceGenderWiseTableProps {
  marketSite: string;
  audienceCategory: string;
  audiencePercent: number;
  id: string;
  setId: string;
  dataCheckStatus: {};
  setDataCheckStatus: Function;
  avgDataBool: boolean;
  lockStatus: boolean;
  setLockStatus: Function;
}

export const AudienceGenderWiseTable: React.FC<AudienceGenderWiseTableProps> = ({
  marketSite,
  audienceCategory,
  audiencePercent,
  id,
  setId,
  dataCheckStatus,
  setDataCheckStatus,
  avgDataBool,
  lockStatus,
  setLockStatus
}: any) => {

  const dispatch = useDispatch<any>();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const getGenderWiseDataByAudienceTypeMarketSiteSelector = useSelector(
    (state: any) => state.getGenderWiseDataByAudienceTypeMarketSite
  );
  const {
    loading: genderWiseDataByMarketSiteLoading,
    data: genderWiseDataByMarketSite,
    success: genderWiseDataByMarketSiteSuccess,
    error: genderWiseDataByMarketSiteError
  } = getGenderWiseDataByAudienceTypeMarketSiteSelector;

  const addGenderWiseDataByAudienceTypeSelector = useSelector(
    (state: any) => state.addGenderWiseDataByAudienceType
  );
  const {
    loading: addGenderWiseDataByAudienceTypeLoading,
    data: addGenderWiseDataByAudienceTypeData,
    success: addGenderWiseDataByAudienceTypeSuccess,
    error: addGenderWiseDataByAudienceTypeError
  } = addGenderWiseDataByAudienceTypeSelector;

  const handleKeyDown = (e: any, index: any) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const next: any = inputRefs.current[index + 1];
      if (next) next.focus();
    }
  };

  const [decimal, setDecimal] = useState<any>(0);
  const [editableCell, setEditableCell] = useState<any>(null);
  const [editableCell1, setEditableCell1] = useState<any>(null);
  const [editableCell2, setEditableCell2] = useState<any>(null);
  // const [lockStatus, setLockStatus] = useState(dataCheckStatus[GENDER_WISE_DATA_STATUS][audienceCategory]);
  const [genderDataByMarketSite, setGenderDataByMarketSite] = useState<any>({})

  const resetButtonFunction = () => {
    dispatch(getGenderWiseDataByAudienceTypeMarketSite({
      id: id, marketSite: marketSite, categoryType: audienceCategory,
      avgDataBool: avgDataBool
    }))
  }

  useEffect(() => {
    dispatch(getGenderWiseDataByAudienceTypeMarketSite({
      id: id, marketSite: marketSite, categoryType: audienceCategory,
      avgDataBool: avgDataBool
    }))
    setLockStatus(dataCheckStatus[GENDER_WISE_DATA_STATUS][audienceCategory])
  }, [audienceCategory, avgDataBool])

  useEffect(() => {
    if (genderWiseDataByMarketSiteError) {
      alert("Error Fetching Data : " + genderWiseDataByMarketSiteError)
      dispatch({ type: GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_RESET })
    }

    if (genderWiseDataByMarketSiteSuccess) {
      setLockStatus(dataCheckStatus[GENDER_WISE_DATA_STATUS][audienceCategory]);
      setGenderDataByMarketSite(genderWiseDataByMarketSite?.response)
      if (genderWiseDataByMarketSite.audienceDataStatus != null)
        setDataCheckStatus(genderWiseDataByMarketSite?.audienceDataStatus)
      dispatch({ type: GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_RESET })
    }

    if (addGenderWiseDataByAudienceTypeError) {
      alert("Error Saving Data : " + addGenderWiseDataByAudienceTypeError)
      dispatch({ type: ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_RESET })
    }

    if (addGenderWiseDataByAudienceTypeSuccess) {
      message.info("Data Saved Successfully")
      dispatch({ type: ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_RESET })
      resetButtonFunction()
    }

  }, [genderWiseDataByMarketSiteSuccess, genderWiseDataByMarketSiteError,
    addGenderWiseDataByAudienceTypeSuccess,
    addGenderWiseDataByAudienceTypeError
  ])

  const handleBlur = () => {
    setEditableCell(null);
    setEditableCell1(null);
    setEditableCell2(null);
  };

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleDataChange = (gender: string, event: ChangeEvent<HTMLInputElement>, day: any, unique: boolean) => {
    const enterValue = parseFloat(event.target.value);
    const newGenderData = JSON.parse(JSON.stringify(genderDataByMarketSite?.[gender]));
    if (day === null) {
      newGenderData.percent = enterValue;
    } else if (!unique) {
      newGenderData.dayWiseData[day] = {
        ...newGenderData.dayWiseData[day],
        monthly: enterValue,
        daily: parseFloat((enterValue * newGenderData?.percent * audiencePercent / newGenderData.dayWiseData[day].days / 10000).toFixed(2)),
        count: enterValue * newGenderData.count / 100 / newGenderData.dayWiseData[day].days
      };
    }
    else {
      newGenderData.dayWiseData[day] = {
        ...newGenderData.dayWiseData[day],
        unique: enterValue
      };
    }

    setGenderDataByMarketSite((prev: any) => ({
      ...prev,
      [gender]: newGenderData
    }));
  };

  const checkData = () => {
    if (genderDataByMarketSite["Male"]?.percent + genderDataByMarketSite["Female"]?.percent !== 100) {
      alert("Gender Distribution Sum must be 100")
      return false
    }

    for (const genderData of Object.values(genderDataByMarketSite) as { dayWiseData: {} }[]) {
      let count = 0;
      for (const dayWiseData of Object.values(genderData.dayWiseData) as { monthly: number }[]) {
        count += dayWiseData?.monthly;
      }
      if (count !== 100) {
        alert("Monthly Distribution Sum must be 100");
        return false;
      }
    }

    return true
  }

  const getTotalMonthlyDistributionPercent = (gender: any) => {
    var percentSum = 0
    if (genderDataByMarketSite[gender] && genderDataByMarketSite[gender].dayWiseData) {
      for (const dayWiseData of Object.values(genderDataByMarketSite[gender].dayWiseData) as { monthly: number }[]) {
        percentSum += dayWiseData?.monthly;
      }
    }
    return percentSum
  }

  const lockButtonFunction = () => {
    if (checkData() && lockStatus === false) {
      setLockStatus(!lockStatus)
      const data: any = []
      Object.entries(genderDataByMarketSite)?.forEach(([gender, genderData]: [any, any]) => {
        const sampleData: any = {}
        const weekdays = { ...genderData.dayWiseData.weekdays };
        const saturdays = { ...genderData.dayWiseData.saturdays };
        const sundays = { ...genderData.dayWiseData.sundays };

        weekdays.monthly = weekdays.monthly / 100;
        saturdays.monthly = saturdays.monthly / 100;
        sundays.monthly = sundays.monthly / 100;

        weekdays.unique = weekdays.unique / 100
        saturdays.unique = saturdays.unique / 100
        sundays.unique = sundays.unique / 100

        weekdays.daily = weekdays.monthly / weekdays.days;
        saturdays.daily = saturdays.monthly / saturdays.days;
        sundays.daily = weekdays.monthly / sundays.days;

        sampleData["gender"] = gender;
        sampleData["weight"] = genderData?.percent / 100;
        sampleData["weekdays"] = weekdays;
        sampleData["saturdays"] = saturdays;
        sampleData["sundays"] = sundays;

        data.push(sampleData);
      })
      dispatch(addGenderWiseDataByAudienceType({
        id: id,
        audienceCategory: audienceCategory,
        data: data
      }))
    }
    else if (lockStatus === true) {
      setLockStatus(!lockStatus)
      setDataCheckStatus((prevData: any) => ({
        ...prevData,
        [GENDER_WISE_DATA_STATUS]: {
          ...prevData[GENDER_WISE_DATA_STATUS],
          [audienceCategory]: false
        }
      }));
    }
  }

  return (
    <div className="flex flex-col p-4">
      <AudienceTableHeader tableHeader={"Gender Wise Data"}
        tableSubHeader={"(" + audienceCategory + ")"} tableType={"horizontal"} resetButton={() => resetButtonFunction()}
        lockButton={() => lockButtonFunction()} lockStatus={lockStatus} />
      <table className="border-collapse w-full text-[12px] font-medium">
        <thead className="border">
          <tr className="grid grid-cols-12">
            <th className="col-span-1 text-[#474747] bg-[#F7F7F7]">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Gender">
                  <p >Gender</p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-1 text-[#ffffff] bg-[#FF5050]">
              <div className="grid grid-cols-5 h-full">
                <div className="col-span-1"/>
                <div className="col-span-3 flex items-center justify-center">
                  <Tooltip title="Gender Wise Audience Percentage">
                    <p>%</p>
                  </Tooltip>
                </div>
                <div className="col-span-1 flex justify-center items-enter pr-2">
                  <i className="fi fi-sr-pencil text-[10px] flex items-center"></i>
                </div>
              </div>
            </th>
            <th className="col-span-2 text-[#474747] bg-[#F7F7F7]">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Gender Wise Audience Monthly Count">
                  <p className="truncate">Monthly Count</p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-2 border-x text-[#474747] bg-[#F7F7F7]">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Monthly Distribution">
                  <p className="truncate">Monthly Distribution</p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-1 text-[#474747] bg-[#F7F7F7]">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Total Days">
                  <p className="truncate">Total Days</p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-1 text-[#ffffff] bg-[#FF5050]">
              <div className="grid grid-cols-5 h-full">
                <div className="col-span-4 flex items-center justify-center pl-2">
                  <Tooltip title="Monthly (%)">
                    <p className="truncate">Monthly (%)</p>
                  </Tooltip>
                </div>
                <div className="col-span-1 flex justify-center items-enter pr-2">
                  <i className="fi fi-sr-pencil text-[10px] flex items-center"></i>
                </div>
              </div>
            </th>
            <th className="col-span-1 border-r text-[#474747] bg-[#F7F7F7]">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Daily (%)">
                  <p className="truncate">Daily (%)</p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-1 text-[#474747] bg-[#F7F7F7]">
              <div className="p-2 flex items-center justify-center h-full">
                <Tooltip title="Daily Count">
                  <p className="truncate">Daily Count</p>
                </Tooltip>
              </div>
            </th>
            <th className="col-span-2 text-[#ffffff] bg-[#FF5050]">
              <div className="grid grid-cols-6 h-full">
                <div className="col-span-5 flex items-center justify-center pl-2">
                  <Tooltip title="Unique Impression/Month">
                    <p className="truncate">Unique Impression/Month</p>
                  </Tooltip>
                </div>
                <div className="col-span-1 flex justify-center items-enter pr-2">
                  <i className="fi fi-sr-pencil text-[10px] flex items-center"></i>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {Object.entries(genderDataByMarketSite)?.filter(([gender]) => gender === 'Male')?.map(([gender, genderData]: [any, any], i: any) => (
            <tr key={0} className="grid grid-cols-12 text-[12px]">
              <td className="col-span-1 border-l flex flex-col justify-center items-between">
                <div className="h-full flex justify-center items-center text-[#129BFF] bg-[#EFF8FF]">
                  <h1 className="font-bold">
                    {gender}
                  </h1>
                </div>
              </td>
              <td className="col-span-1 border-x border-red-500 flex flex-col justify-center items-between">
                <div
                  // onMouseEnter={() => {
                  //   setEditableCell({ index: 0, column: "percentage" })
                  // }}
                  onClick={() =>
                    setEditableCell({ index: 0, column: "percentage" })
                  }
                  className="border-slate-300 text-[#FF5050] font-semibold cursor-pointer text-center flex justify-center items-center"
                >
                  {editableCell?.index === 0 &&
                    editableCell?.column === "percentage" ? (
                    <input
                      type="number"
                      value={(genderData?.percent)}
                      onBlur={handleBlur}
                      // onWheel={(e) => e.currentTarget.blur()}
                      onChange={(e) => handleDataChange(gender, e, null, false)}
                      className="w-full h-full text-center cursor-pointer border"
                      aria-label="Edit percentage"
                      title="Edit percentage"
                      disabled={lockStatus}
                      ref={(el: any) => (inputRefs.current[0] = el)}
                      autoFocus={i == 0}
                    />
                  ) : (
                    `${Number(genderData?.percent).toFixed(decimal)}%`
                  )}
                </div>
              </td>
              <td className="col-span-2 flex flex-col justify-center items-between">
                <div className="flex justify-center items-center">
                  {
                    Number(genderData?.count).toFixed(decimal) ?? 0
                  }
                </div>
              </td>
              <td className="col-span-2 border-x">
                {Object.keys(genderData?.dayWiseData)?.map((m: any, i: any) => (
                  <div className={`${i + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={i}>
                    {capitalizeFirst(m)}
                  </div>
                ))}
              </td>
              <td className="col-span-1   ">
                {Object.values(genderData?.dayWiseData)?.map((m: any, j: any) => (
                  <div className={`${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={j}>
                    {m?.days}
                  </div>
                ))}
              </td>

              <td className="col-span-1 border-x border-red-500">
                {Object.entries(genderData?.dayWiseData)?.map(([day, dayWiseData]: any, j: any) => (
                  <div
                    // onMouseEnter={() => {
                    //   setEditableCell1({ gender: gender, index: j, column: "percentage" })
                    // }}
                    onClick={() =>
                      setEditableCell1({ gender: gender, index: j, column: "percentage" })
                    }
                    className={`col-span-1 ${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b border-[#FF5050]"} border-red-500 text-[#FF5050] cursor-pointer text-center p-2 flex justify-center items-center`} key={j}
                  >
                    {editableCell1?.index === j &&
                      editableCell1?.gender === gender &&
                      editableCell1?.column === "percentage" ? (
                      <input
                        type="number"
                        value={(dayWiseData?.monthly).toFixed(0)}
                        onBlur={handleBlur}
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleDataChange(gender, e, day, false)}
                        className="w-full h-full text-center cursor-pointer focus:outline-none"
                        aria-label="Edit percentage"
                        title="Edit percentage"
                        disabled={lockStatus}
                        ref={(el: any) => (inputRefs.current[j] = el)}
                        autoFocus={j == 0}
                      />
                    ) : (
                      `${Number(dayWiseData?.monthly).toFixed(decimal)} %`
                    )}
                  </div>
                ))}
              </td>
              <td className="col-span-1 border-r">
                {Object.entries(genderData?.dayWiseData)?.map(([day, dayWiseData]: any, j: any) => (
                  <div key={j} className="col-span-1">
                    <div className={`${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={j}>
                      {dayWiseData?.daily.toFixed(2) || 0} %
                    </div>
                  </div>
                ))}
              </td>

              <td className="col-span-1">
                {Object.entries(genderData?.dayWiseData)?.map(([day, dayWiseData]: any, j: any) => (
                  <div key={j} className="col-span-1">
                    <div className={`${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={j}>
                      {Number(dayWiseData?.count).toFixed(decimal) || 0}
                    </div>
                  </div>
                ))}
              </td>

              <td className="col-span-2 border-x border-red-500">
                {Object.entries(genderData?.dayWiseData)?.map(([day, dayWiseData]: any, j: any) => (
                  <div key={j} className="col-span-1">
                    <div
                      // onMouseEnter={() => {
                      //   setEditableCell2({ gender: gender, index: j, column: "unique" })
                      // }}
                      onClick={() => {
                        setEditableCell2({ gender: gender, index: j, column: "unique" })
                      }}
                      // onMouseLeave={handleBlur}
                      className={`col-span-1 ${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b border-[#FF5050]"} border-red-500 text-[#FF5050] cursor-pointer text-center p-2 flex justify-center items-center`}
                      key={j}
                    >
                      {editableCell2?.index === j &&
                        editableCell2?.gender === gender &&
                        editableCell2?.column === "unique" ? (
                        <input
                          title=""
                          placeholder="unique"
                          type="number"
                          value={Number(dayWiseData?.unique).toFixed(0)}
                          onBlur={handleBlur}
                          onWheel={(e) => e.currentTarget.blur()}
                          onChange={(e) => handleDataChange(gender, e, day, true)}
                          ref={(el: any) => (inputRefs.current[j] = el)}
                          onKeyDown={(e) => handleKeyDown(e, j)}
                          autoFocus={j == 0}
                          disabled={lockStatus}
                          className="w-full h-full text-center cursor-pointer focus:outline-none"
                        />
                      ) : (
                        `${Number(dayWiseData?.unique).toFixed(decimal)}%`
                      )}
                    </div>
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
            <td className="col-span-6 text-[#474747] bg-[#F7F7F7]" />
            <td className="col-span-1 text-[#FFFFFF] bg-[#000000]">
              <div className="flex items-center justify-center h-full">
                <p className="truncate">{getTotalMonthlyDistributionPercent("Male")}%</p>
              </div>
            </td>
            <td className="col-span-4 text-[#474747] bg-[#F7F7F7]" />
          </tr>

          {Object.entries(genderDataByMarketSite)?.filter(([gender]) => gender === 'Female')?.map(([gender, genderData]: [any, any], i: any) => (
            <tr key={1} className="grid grid-cols-12 text-[12px]">
              <td className="col-span-1 border-l border-t flex flex-col justify-center items-between">
                <div className="h-full flex justify-center items-center text-[#61326D] bg-[#FDF5FF]">
                  <h1 className="font-bold">
                    {gender}
                  </h1>
                </div>
              </td>
              <td className="col-span-1 border-x border-t border-[#FF5050] flex flex-col justify-center items-between">
                <div
                  // onMouseEnter={() => {
                  //   setEditableCell({ index: 1, column: "percentage" })
                  // }}
                  onClick={() =>
                    setEditableCell({ index: 1, column: "percentage" })
                  }
                  className="border-slate-300 text-[#FF5050] font-semibold cursor-pointer text-center flex justify-center items-center"
                >
                  {editableCell?.index === 1 &&
                    editableCell?.column === "percentage" ? (
                    <input
                      type="number"
                      value={(genderData?.percent)}
                      onBlur={handleBlur}
                      onWheel={(e) => e.currentTarget.blur()}
                      onChange={(e) => handleDataChange(gender, e, null, false)}
                      className="w-full h-full text-center cursor-pointer focus:outline-none"
                      aria-label="Edit percentage"
                      title="Edit percentage"
                      disabled={lockStatus}
                      ref={(el: any) => (inputRefs.current[1] = el)}
                      autoFocus={false}
                    />
                  ) : (
                    `${Number(genderData?.percent).toFixed(decimal)}%`
                  )}
                </div>
              </td>
              <td className="col-span-2 border-t flex flex-col justify-center items-between">
                <div className="flex justify-center items-center">
                  {
                    Number(genderData?.count).toFixed(decimal) ?? 0
                  }
                </div>
              </td>
              <td className="col-span-2 border-x border-t">
                {Object.keys(genderData?.dayWiseData)?.map((m: any, i: any) => (
                  <div className={`${i + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={i}>
                    {capitalizeFirst(m)}
                  </div>
                ))}
              </td>
              <td className="col-span-1 border-t">
                {Object.values(genderData?.dayWiseData)?.map((m: any, j: any) => (
                  <div className={`${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={j}>
                    {m?.days}
                  </div>
                ))}
              </td>

              <td className="col-span-1 border-x border-t border-[#FF5050]">
                {Object.entries(genderData?.dayWiseData)?.map(([day, dayWiseData]: any, j: any) => (
                  <div
                    // onMouseEnter={() => {
                    //   setEditableCell1({ gender: gender, index: j, column: "percentage" })
                    // }}
                    onClick={() =>
                      setEditableCell1({ gender: gender, index: j, column: "percentage" })
                    }
                    className={`col-span-1 ${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b border-[#FF5050]"} border-red-500 text-[#FF5050] cursor-pointer text-center p-2 flex justify-center items-center`} key={j}
                  >
                    {editableCell1?.index === j &&
                      editableCell1?.gender === gender &&
                      editableCell1?.column === "percentage" ? (
                      <input
                        type="number"
                        value={(dayWiseData?.monthly).toFixed(0)}
                        onBlur={handleBlur}
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleDataChange(gender, e, day, false)}
                        className="w-full h-full text-center cursor-pointer focus:outline-none"
                        aria-label="Edit percentage"
                        title="Edit percentage"
                        disabled={lockStatus}
                        ref={(el: any) => (inputRefs.current[j] = el)}
                        autoFocus={j == 0}
                      />
                    ) : (
                      `${Number(dayWiseData?.monthly).toFixed(decimal)} %`
                    )}
                  </div>
                ))}
              </td>
              <td className="col-span-1 border-r border-t">
                {Object.entries(genderData?.dayWiseData)?.map(([day, dayWiseData]: any, j: any) => (
                  <div key={j} className="col-span-1">
                    <div className={`${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={j}>
                      {dayWiseData?.daily.toFixed(2) || 0} %
                    </div>
                  </div>
                ))}
              </td>

              <td className="col-span-1 border-t">
                {Object.entries(genderData?.dayWiseData)?.map(([day, dayWiseData]: any, j: any) => (
                  <div key={j} className="col-span-1">
                    <div className={`${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={j}>
                      {Number(dayWiseData?.count).toFixed(decimal) || 0}
                    </div>
                  </div>
                ))}
              </td>

              <td className="col-span-2 border-x border-t border-red-500">
                {Object.entries(genderData?.dayWiseData)?.map(([day, dayWiseData]: any, j: any) => (
                  <div key={j} className="col-span-1">
                    <div
                      // onMouseEnter={() => {
                      //   setEditableCell2({ gender: gender, index: j, column: "unique" })
                      // }}
                      onClick={() => {
                        setEditableCell2({ gender: gender, index: j, column: "unique" })
                      }}
                      // onMouseLeave={handleBlur}
                      className={`col-span-1 ${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b border-[#FF5050]"} border-red-500 text-[#FF5050] cursor-pointer text-center p-2 flex justify-center items-center`}
                      key={j}
                    >
                      {editableCell2?.index === j &&
                        editableCell2?.gender === gender &&
                        editableCell2?.column === "unique" ? (
                        <input
                          title=""
                          placeholder="unique"
                          type="number"
                          value={Number(dayWiseData?.unique).toFixed(0)}
                          onBlur={handleBlur}
                          onWheel={(e) => e.currentTarget.blur()}
                          onChange={(e) => handleDataChange(gender, e, day, true)}
                          ref={(el: any) => (inputRefs.current[j] = el)}
                          onKeyDown={(e) => handleKeyDown(e, j)}
                          autoFocus={j == 0}
                          disabled={lockStatus}
                          className="w-full h-full text-center cursor-pointer focus:outline-none"
                        />
                      ) : (
                        `${Number(dayWiseData?.unique).toFixed(decimal)}%`
                      )}
                    </div>
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
            <td className="col-span-6 text-[#474747] bg-[#F7F7F7]" />
            <td className="col-span-1 text-[#FFFFFF] bg-[#000000]">
              <div className="flex items-center justify-center h-full">
                <p className="truncate">{getTotalMonthlyDistributionPercent("Female")}%</p>
              </div>
            </td>
            <td className="col-span-4 text-[#474747] bg-[#F7F7F7]" />
          </tr>

          <tr className="grid grid-cols-12 border">
            <td className="col-span-1 text-[#474747] bg-[#F7F7F7] p-2">
              <div className="flex items-center justify-center h-full">
                <Tooltip title="Gender Distribution Total Percent">
                  <p className="truncate">Total</p>
                </Tooltip>
              </div>
            </td>
            <td className="col-span-1 text-[#FFFFFF] bg-[#000000]">
              <div className="flex items-center justify-center h-full">
                <p className="truncate">{genderDataByMarketSite["Male"]?.percent + genderDataByMarketSite["Female"]?.percent}%</p>
              </div>
            </td>
            <td className="col-span-10 text-[#474747] bg-[#F7F7F7]" />
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default AudienceGenderWiseTable;
