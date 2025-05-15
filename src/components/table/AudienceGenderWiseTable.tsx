import { AudienceTableHeader } from "../../components/layouts/AudienceTableHeader";
import { addGenderWiseDataByAudienceType, getGenderWiseDataByAudienceTypeMarketSite } from "../../actions/audienceAction";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_RESET,
  GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_RESET
} from "../../constants/audienceConstant";
import { message } from "antd";

interface AudienceGenderWiseTableProps {
  marketSite: String;
  audienceCategory: String;
  audiencePercent: number;
  id: string;
  setId: string;
  dataCheckStatus: {};
  setDataCheckStatus: Function;
}

export const AudienceGenderWiseTable: React.FC<AudienceGenderWiseTableProps> = ({
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
  const [lockStatus, setLockStatus] = useState(dataCheckStatus["Gender Wise Data"][audienceCategory]);
  const [genderDataByMarketSite, setGenderDataByMarketSite] = useState<any>({})

  useEffect(() => {
    dispatch(getGenderWiseDataByAudienceTypeMarketSite({ marketSite: marketSite, categoryType: audienceCategory }))
    setLockStatus(dataCheckStatus["Gender Wise Data"][audienceCategory])
  }, [audienceCategory])

  useEffect(() => {
    if (genderWiseDataByMarketSiteError) {
      alert("Error Fetching Data : " + genderWiseDataByMarketSiteError)
      dispatch({ type: GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_RESET })
    }

    if (genderWiseDataByMarketSiteSuccess) {
      setGenderDataByMarketSite(genderWiseDataByMarketSite)
      dispatch({ type: GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_RESET })
    }

    if (addGenderWiseDataByAudienceTypeError) {
      alert("Error Saving Data : " + addGenderWiseDataByAudienceTypeError)
      dispatch({ type: ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_RESET })
    }

    if (addGenderWiseDataByAudienceTypeSuccess) {
      message.info("Data Saved Successfully")
      dispatch({ type: ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_RESET })
      setDataCheckStatus((prevData: any) => ({
        ...prevData,
        ["Gender Wise Data"]: {
          ...prevData["Gender Wise Data"],
          [audienceCategory]: true
        }
      }));
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

  const handleDataChange = (gender: string, event: ChangeEvent<HTMLInputElement>, day: any, unique: boolean) => {
    const enterValue = parseFloat(event.target.value);
    const newGenderData = JSON.parse(JSON.stringify(genderDataByMarketSite?.[gender]));
    if (day === null) {
      newGenderData.percent = enterValue;
    } else if (!unique) {
      newGenderData.dayWiseData[day] = {
        ...newGenderData.dayWiseData[day],
        monthly: enterValue,
        daily: parseFloat((enterValue * newGenderData.percent * audiencePercent / newGenderData.dayWiseData[day].days / 10000).toFixed(2)),
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
    if (genderDataByMarketSite["Male"].percent + genderDataByMarketSite["Female"].percent !== 100) {
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

        weekdays.daily = weekdays.monthly / weekdays.days;
        saturdays.daily = saturdays.monthly / saturdays.days;
        sundays.daily = weekdays.monthly / sundays.days;

        sampleData["gender"] = gender;
        sampleData["weight"] = genderData.percent / 100;
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
        ["Gender Wise Data"]: {
          ...prevData["Gender Wise Data"],
          [audienceCategory]: false
        }
      }));
    }
  }

  const resetButtonFunction = () => {
    dispatch(getGenderWiseDataByAudienceTypeMarketSite({ marketSite: marketSite, categoryType: audienceCategory }))
  }

  return (
    <div className="flex flex-col">
      <AudienceTableHeader tableHeader={"Gender Wise Data"}
        tableSubHeader={"(" + audienceCategory + ")"} tableType={"horizontal"} resetButton={() => resetButtonFunction()}
        lockButton={() => lockButtonFunction()} lockStatus={lockStatus} />
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
                    <p >Gender</p>
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
                  Monthly Distribution
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
                      Unique Impression/Month
                    </h1>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(genderDataByMarketSite)?.map(([gender, genderData]: [any, any], i: any) => (
            <tr key={i} className="grid grid-cols-12">
              <td className="col-span-3 border flex flex-col justify-center items-between">
                <div className="grid grid-cols-3 h-full">
                  <div className="h-full col-span-1 flex justify-center items-center">
                    <h1 className="">
                      {gender}
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
                        value={(genderData?.percent)}
                        onBlur={handleBlur}
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleDataChange(gender, e, null, false)}
                        className="w-full h-full text-center border-[#1297E2] cursor-pointer focus:border-[#1297E2]"
                        aria-label="Edit percentage"
                        title="Edit percentage"
                        disabled={lockStatus}
                        ref={(el: any) => (inputRefs.current[i] = el)}
                        autoFocus={i == 0}
                      />
                    ) : (
                      `${Number(genderData?.percent).toFixed(decimal)}%`
                    )}
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    {
                      Number(genderData?.count).toFixed(decimal) ?? 0
                    }
                  </div>
                </div>
              </td>
              <td className="col-span-2 border">
                <div className="">
                  {Object.keys(genderData?.dayWiseData)?.map((m: any, i: any) => (
                    <div className={`${i + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={i}>
                      {m.toUpperCase()}
                    </div>
                  ))}
                </div>
              </td>
              <td className="col-span-1 border">
                <div className="">
                  {Object.values(genderData?.dayWiseData)?.map((m: any, j: any) => (
                    <div className={`${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={j}>
                      {m?.days}
                    </div>
                  ))}
                </div>
              </td>
              <td className="col-span-6 border">
                {Object.entries(genderData?.dayWiseData)?.map(([day, dayWiseData]: any, j: any) => (
                  <div key={j} className="grid grid-cols-4">
                    <div
                      onMouseEnter={() => {
                        setEditableCell1({ gender: gender, index: j, column: "percentage" })
                      }}
                      onClick={() =>
                        setEditableCell({ index: j, column: "percentage" })
                      }
                      // onMouseLeave={handleBlur}
                      className={`col-span-1 ${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} col-span-1 border-slate-300 text-[#1297E2] cursor-pointer text-center p-2 flex justify-center items-center`} key={j}
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
                          className="w-full h-full text-center cursor-pointer"
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
                    <div className="col-span-1 border-x">
                      <div className={`${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={j}>
                        {dayWiseData?.daily.toFixed(2) || 0} %
                      </div>
                    </div>
                    <div className="col-span-1 border-r"
                      onClick={() => { }}
                    >
                      <div className={`${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} p-2 flex justify-center items-center`} key={j}>
                        {Number(dayWiseData?.count).toFixed(decimal) || 0}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div
                        onMouseEnter={() => {
                          setEditableCell2({ gender: gender, index: j, column: "unique" })
                        }}
                        onClick={() =>
                          setEditableCell({ index: j, column: "percentage" })
                        }
                        // onMouseLeave={handleBlur}
                        className={`col-span-1 ${j + 1 === Object.keys(genderData?.dayWiseData)?.length ? "" : "border-b"} col-span-1 border-slate-300 text-[#1297E2] cursor-pointer text-center p-2 flex justify-center items-center`}
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
                            className="w-full h-full text-center cursor-pointer"
                          />
                        ) : (
                          `${Number(dayWiseData?.unique).toFixed(decimal)}%`
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

export default AudienceGenderWiseTable;
