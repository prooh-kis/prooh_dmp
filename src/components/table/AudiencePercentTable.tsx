import { AudienceTableHeader } from "../../components/layouts/AudienceTableHeader";
import { addAudienceTypePercentData, getAvgAudienceDataByMarketSite, updateAudienceDataStatus } from "../../actions/audienceAction";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import {
  ADD_AUDIENCE_TYPE_PERCENT_DATA_RESET,
  GENDER_WISE_DATA_STATUS,
  GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_RESET,
  PERCENT_DATA_STATUS,
  TIMEZONE_WISE_DATA_STATUS,
  UPDATE_AUDIENCE_DATA_STATUS_RESET
} from "../../constants/audienceConstant";
import { Loading } from "../../components/Loading";
import { Percent } from "lucide-react";

interface AudiencePercentData {
  category: string;
  percent: number;
  count: number;
}

interface AudiencePercentTableProps {
  marketSite: string;
  id: string;
  setId: Function;
  dataCheckStatus: any;
  setDataCheckStatus: Function;
  avgDataBool: boolean;
}

export const AudiencePercentTable: React.FC<AudiencePercentTableProps> = ({
  marketSite, id, setId, dataCheckStatus, setDataCheckStatus, avgDataBool
}) => {

  const dispatch = useDispatch<any>();
  const [totalCount, setTotalCount] = useState(0);
  const [lockStatus, setLockStatus] = useState<any>(dataCheckStatus[PERCENT_DATA_STATUS]);
  const [audienceTypeWiseData, setAudienceTypeWiseData] = useState<AudiencePercentData[]>([]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

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

  const updateAudienceDataStatusSelector = useSelector(
    (state: any) => state.updateAudienceDataStatus
  );
  const {
    loading: updateAudienceDataStatusLoading,
    data: updateAudienceDataStatusData,
    success: updateAudienceDataStatusSuccess,
    error: updateAudienceDataStatusError
  } = updateAudienceDataStatusSelector;

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
    if (getTotalPercent() === "100" && lockStatus === false) {
      const data: { [key: string]: number | undefined } = {};
      for (const audience of audienceTypeWiseData) {
        data[audience.category] = audience?.percent / 100
      }

      dispatch(addAudienceTypePercentData({
        id: id === "research" ? null : id,
        marketSite: userInfo?.touchPoints?.[0]?.marketSites?.[0],
        market: userInfo?.market,
        touchPoints: userInfo?.touchPoints,
        dataHeroUserId: userInfo?._id,
        dataHeroUserEmail: userInfo?.email,
        geoCoordinates: [],
        data: data
      }))
    }
    else if (getTotalPercent() != "100") {
      alert("Total Percent Sum must be 100")
    }
    else {
      dispatch(updateAudienceDataStatus({
        id: id, audienceCategory: "", percentData: false
      }))
    }
  }

  const resetButtonFunction = () => {
    dispatch(getAvgAudienceDataByMarketSite({ id: id === "research" ? null : id, marketSite: marketSite, avgDataBool: avgDataBool }))
  }

  useEffect(() => {
    dispatch(getAvgAudienceDataByMarketSite({ id: id === "research" ? null : id, marketSite: marketSite, avgDataBool: avgDataBool }))
  }, [avgDataBool, dispatch, id, marketSite])

  useEffect(() => {
    setLockStatus(dataCheckStatus[PERCENT_DATA_STATUS])
  }, [dataCheckStatus])

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

      if (audienceDataByMarketSite?.audienceDataStatus !== null) {
        setDataCheckStatus(audienceDataByMarketSite?.audienceDataStatus)
      }

      dispatch({ type: GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_RESET })
    }

    if (addAudienceTypePercentSuccess) {
      message.info("Data Saved Successfully")
      setId(addAudienceTypePercent?._id)
      setDataCheckStatus(addAudienceTypePercent?.audienceDataStatus)
      dispatch({ type: ADD_AUDIENCE_TYPE_PERCENT_DATA_RESET })
    }

    if (updateAudienceDataStatusError) {
      alert("Error UnLocking Data : " + updateAudienceDataStatusError)
      dispatch({ type: UPDATE_AUDIENCE_DATA_STATUS_RESET })
    }

    if (updateAudienceDataStatusSuccess) {
      setDataCheckStatus(updateAudienceDataStatusData?.audienceDataStatus)
      dispatch({ type: UPDATE_AUDIENCE_DATA_STATUS_RESET })
    }

  }, [audienceDataByMarketSiteSuccess, audienceDataByMarketSiteError, updateAudienceDataStatusError, updateAudienceDataStatusSuccess,
    addAudienceTypePercentError, addAudienceTypePercentSuccess])


  return (
    <div className="flex flex-col px-6 py-3 bg-[#ffffff] rounded-[8px] shadow-sm">
      <AudienceTableHeader tableHeader={"Audience Type Data"} tableSubHeader={""} tableType={""}
        resetButton={() => resetButtonFunction()} lockButton={() => lockButtonFunction()} lockStatus={lockStatus} />
      <table className="border-collapse w-full text-[12px]">
        <thead>
          <tr className="grid grid-cols-6 bg-[#F7F7F7] text-[#6F7F8E]">
            <th className="col-span-4 border border-slate-300 py-2 text-left pl-4">Audience Type</th>
            <th className="col-span-1 py-2 text-[#ffffff] bg-[#FF5050]">% share</th>
            <th className="col-span-1 border border-slate-300 py-2">Audience Count</th>
          </tr>
        </thead>
        <tbody>
          {audienceDataByMarketSiteLoading && (
            <tr>
              <td>
                <Loading grid={{ cols: 1, rows: 4 }} />
              </td>
            </tr>
          )}
          {audienceTypeWiseData.map((data, index) => (
            <tr key={index} className="grid grid-cols-6">
              <td className="col-span-4 border-b border-l border-slate-300 py-2 px-4">
                {data.category}
              </td>
              <td
                className="col-span-1 h-full border-b border-x border-[#FF5050] text-[#FF5050] text-center py-2"
                // onMouseEnter={() =>
                //   setEditableCell({ index, column: "percentage" })
                // }
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
                    className="w-full h-full text-center cursor-pointer focus:outline-none"
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
              <td className="col-span-1 border-b border-r border-slate-300 text-center py-2">
                {(data.count).toFixed(0)}
              </td>
            </tr>
          ))}
          <tr className="grid grid-cols-6 font-bold pt-2">
            <td className="col-span-4 border border-slate-300 py-2 px-4 bg-[#F7F7F7] text-[#000000]">
              Total
            </td>
            <td className="col-span-1 border-y border-slate-300 text-center py-2">
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
