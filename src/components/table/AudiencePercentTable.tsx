import { AudienceTableHeader } from "../../components/layouts/AudienceTableHeader";
import { addAudienceTypePercentData, getAvgAudienceDataByMarketSite } from "../../actions/audienceAction";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { message } from "antd";
import {
  ADD_AUDIENCE_TYPE_PERCENT_DATA_RESET,
  GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_RESET
} from "../../constants/audienceConstant";

interface AudiencePercentData {
  category: string;
  percent: number;
  count: number;
}

interface AudiencePercentTableProps {
  marketSite: String;
  id: string;
  setId: Function;
  dataCheckStatus: any;
  setDataCheckStatus: Function;
}

export const AudiencePercentTable: React.FC<AudiencePercentTableProps> = ({
  marketSite, id, setId, dataCheckStatus, setDataCheckStatus
}) => {

  const dispatch = useDispatch<any>();
  const [totalCount, setTotalCount] = useState(0);
  const [lockStatus, setLockStatus] = useState<any>(dataCheckStatus["Audience Type Data"]);
  const [audienceTypeWiseData, setAudienceTypeWiseData] = useState<AudiencePercentData[]>([]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const getAvgAudienceDataByMarketSiteData = useSelector(
    (state: any) => state.getAvgAudienceDataByMarketSite
  );
  const {
    loading: audienceDataByMarketSiteLoading,
    data: audienceDataByMarketSite,
    success: audienceDataByMarketSiteSuccess,
    error: audienceDataByMarketSiteError
  } = getAvgAudienceDataByMarketSiteData;

  const addAudienceTypePercentDataSelector = useSelector(
    (state: any) => state.addAudienceTypePercentData
  );
  const {
    loading: addAudienceTypePercentLoading,
    data: addAudienceTypePercent,
    success: addAudienceTypePercentSuccess,
    error: addAudienceTypePercentError
  } = addAudienceTypePercentDataSelector;

  const handleKeyDown = (e: any, index: any) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const next: any = inputRefs.current[index + 1];
      if (next) next.focus();
    }
    // Add Enter key handling
    if (e.key === 'Enter') {

      e.preventDefault();
      const next: any = inputRefs.current[index + 1];

      if (next) next.focus();
    }
  };

  const [editableCell, setEditableCell] = useState<{
    index: number;
    column: string;
  } | null>(null);

  const handleBlur = () => {
    setEditableCell(null);
  };

  const handleDataChange = (
    event: ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    const inputValue = parseFloat(event.target.value) || 0;

    setAudienceTypeWiseData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex].percent = inputValue;
      updatedData[rowIndex].count = inputValue * totalCount / 100
      return updatedData;
    });
  };


  const getTotalPercent = () => {
    const totalPercentage = audienceTypeWiseData.reduce(
      (sum, item) => sum + (item.percent || 0),
      0
    );
    return (totalPercentage).toFixed(0);
  };

  const lockButtonFunction = () => {
    if (getTotalPercent() == "100" && lockStatus == false) {
      setLockStatus(!lockStatus)
      const data: { [key: string]: number | undefined } = {};
      for (const audience of audienceTypeWiseData) {
        data[audience.category] = audience?.percent / 100
      }

      dispatch(addAudienceTypePercentData({
        id: id,
        marketSite: "CyberCity Gurgaon",
        market: "Delhi NCR",
        touchPoints: [],
        dataHeroUserId: "674cf966c5991c8fd79e575a",
        dataHeroUserEmail: "kishan@prooh.ai",
        geoCoordinates: [],
        data: data,
      }))
    }
    else if (getTotalPercent() != "100") {
      alert("Total Percent Sum must be 100")
    }
    else {
      setLockStatus(!lockStatus)
      setDataCheckStatus((prevData: any) => ({
        ...prevData,
        ["Audience Type Data"]: false
      }));
    }
  }

  const resetButtonFunction = () => {
    dispatch(getAvgAudienceDataByMarketSite({ marketSite: marketSite }))
  }

  useEffect(() => {
    dispatch(getAvgAudienceDataByMarketSite({ marketSite: marketSite }))
  }, [])

  useEffect(() => {
    if (audienceDataByMarketSiteError) {
      alert("Error Fetching Data : " + audienceDataByMarketSiteError)
      dispatch({ type: GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_RESET })
    }

    if (addAudienceTypePercentError) {
      alert("Error Saving Data : " + addAudienceTypePercentError)
      dispatch({ type: ADD_AUDIENCE_TYPE_PERCENT_DATA_RESET })
    }

    if (audienceDataByMarketSiteSuccess) {
      setAudienceTypeWiseData(audienceDataByMarketSite?.data)
      setTotalCount(audienceDataByMarketSite?.totalAvgCount)

      const data: any = {}
      for (const audienceType of audienceDataByMarketSite?.data) {
        data[audienceType.category] = false
      }

      dispatch({ type: GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_RESET })

      if (Object.keys(dataCheckStatus["Gender Wise Data"]).length === 0 &&
        Object.keys(dataCheckStatus["Timezone Wise Data"]).length === 0) {
        setDataCheckStatus((prevData: any) => ({
          ...prevData,
          ["Gender Wise Data"]: data,
          ["Timezone Wise Data"]: data
        }));
      }
    }

    if (addAudienceTypePercentSuccess) {
      message.info("Data Saved Successfully")
      setId(addAudienceTypePercent._id)
      dispatch({ type: ADD_AUDIENCE_TYPE_PERCENT_DATA_RESET })
      setDataCheckStatus((prevData: any) => ({
        ...prevData,
        ["Audience Type Data"]: true
      }));
    }

  }, [audienceDataByMarketSiteSuccess, audienceDataByMarketSiteError,
    addAudienceTypePercentError, addAudienceTypePercentSuccess])


  return (
    <div className="flex flex-col">
      <AudienceTableHeader tableHeader={"Audience Type Data"} tableSubHeader={""} tableType={""}
        resetButton={() => resetButtonFunction()} lockButton={() => lockButtonFunction()} lockStatus={lockStatus} />
      <table className="border-collapse w-full text-[14px]">
        <thead>
          <tr className="grid grid-cols-6 text-white bg-[#1297E2]">
            <th className="col-span-4 border border-slate-300 py-2">Audience Type</th>
            <th className="col-span-1 border border-slate-300 py-2">Weightage</th>
            <th className="col-span-1 border border-slate-300 py-2">
              Audiences Count
            </th>
          </tr>
        </thead>
        <tbody>
          {audienceTypeWiseData.map((data, index) => (
            <tr key={index} className="grid grid-cols-6">
              <td className="col-span-4 border border-slate-300 py-2 px-2">
                {data.category}
              </td>
              <td
                className="col-span-1 h-full border border-slate-300 text-[#1297E2] text-center py-2"
                onMouseEnter={() =>
                  setEditableCell({ index, column: "percentage" })
                }
                onClick={() =>
                  setEditableCell({ index, column: "percentage" })
                }
              // onMouseLeave={handleBlur}
              >
                {editableCell?.index === index &&
                  editableCell.column === "percentage" ? (
                  <input
                    type="number"
                    value={(data.percent)}
                    onBlur={handleBlur}
                    onWheel={(e) => e.currentTarget.blur()}
                    onChange={(e) => handleDataChange(e, index)}
                    className="w-full h-full text-center border-[#1297E2] cursor-pointer focus:border-[#1297E2]"
                    aria-label="Edit percentage"
                    title="Edit percentage"
                    disabled={lockStatus}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el: any) => (inputRefs.current[index] = el)}
                    autoFocus={index == 0}
                  />
                ) : (
                  `${(data.percent).toFixed(2)}%`
                )}
              </td>
              <td className="col-span-1 border border-slate-300 text-center py-2">
                {(data.count).toFixed(0)}
              </td>
            </tr>
          ))}
          <tr className="grid grid-cols-6 font-bold">
            <td className="col-span-4 border border-slate-300 py-2 px-2">
              Total
            </td>
            <td className="col-span-1 border border-slate-300 text-center py-2">
              {getTotalPercent()}%
            </td>
            <td className="col-span-1 border border-slate-300 text-center py-2">
              {(totalCount * parseFloat(getTotalPercent()) * 0.01).toFixed(0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
