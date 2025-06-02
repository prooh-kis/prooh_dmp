import { AudienceTableHeader } from "../../components/layouts/AudienceTableHeader";
import { addImpactFactorData, getImpactFactorDataByMarketSite } from "../../actions/audienceAction";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { ADD_IMPACT_FACTOR_DATA_RESET, GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_RESET, IMPACT_FACTOR_DATA_STATUS } from "../../constants/audienceConstant";

interface ImpactFactorTableProps {
  marketSite: String;
  id: string;
  setId: string;
  dataCheckStatus: any;
  setDataCheckStatus: Function;
  avgBoolData: Boolean;
}

export const ImpactFactorTable: React.FC<ImpactFactorTableProps> = ({ marketSite, id, setDataCheckStatus,
  dataCheckStatus, avgBoolData }) => {

  const dispatch = useDispatch<any>();
  const getImpactFactorDataByMarketSiteData = useSelector(
    (state: any) => state.getImpactFactorDataByMarketSite
  );
  const {
    loading: impactFactorByMarketSiteLoading,
    data: impactFactorByMarketSite,
    success: impactFactorByMarketSiteSuccess,
    error: impactFactorByMarketSiteError
  } = getImpactFactorDataByMarketSiteData;

  const addImpactFactorDataSelector = useSelector(
    (state: any) => state.addImpactFactorData
  );
  const {
    loading: addImpactFactorDataLoading,
    data: addImpactFactorDataData,
    success: addImpactFactorDataSuccess,
    error: addImpactFactorDataError
  } = addImpactFactorDataSelector;

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [impactFactorData, setImpactFactorData] = useState<any>({});
  const [editableCell, setEditableCell] = useState<{
    dayType: string;
    factorKey: string;
  } | null>(null);
  const [lockStatus, setLockStatus] = useState(dataCheckStatus[IMPACT_FACTOR_DATA_STATUS]);

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleBlur = () => {
    setEditableCell(null);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    dayType: string,
    factorKey: string
  ) => {
    const inputValue = parseFloat(event.target.value) || 0;

    setImpactFactorData((prevData: any) => ({
      ...prevData,
      [dayType]: {
        ...prevData[dayType],
        [factorKey]: inputValue
      }
    }));

  };

  const resetButtonFunction = () => {
    dispatch(getImpactFactorDataByMarketSite({ marketSite: marketSite, id: id, avgDataBool: avgBoolData }))
  }

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

  useEffect(() => {
    dispatch(getImpactFactorDataByMarketSite({ marketSite: marketSite, id: id, avgDataBool: avgBoolData }))
  }, [])

  useEffect(() => {
    if (impactFactorByMarketSiteError) {
      alert("Error Fetching Data : " + impactFactorByMarketSiteError)
      dispatch({ type: GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_RESET })
    }

    if (impactFactorByMarketSiteSuccess) {
      setImpactFactorData(impactFactorByMarketSite?.response)
      if (impactFactorByMarketSite.audienceDataStatus != null)
        setDataCheckStatus(impactFactorByMarketSite?.audienceDataStatus)
      dispatch({ type: GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_RESET })
    }

    if (addImpactFactorDataSuccess) {
      message.info("Data Saved Successfully")
      dispatch({ type: ADD_IMPACT_FACTOR_DATA_RESET })
      resetButtonFunction()
    }

    if (addImpactFactorDataError) {
      alert("Error Saving Data : " + addImpactFactorDataError)
      dispatch({ type: ADD_IMPACT_FACTOR_DATA_RESET })
    }

  }, [impactFactorByMarketSiteSuccess, impactFactorByMarketSiteError,
    addImpactFactorDataSuccess, addImpactFactorDataError
  ])

  const impactFactorLabels: Record<string, string> = {
    govtHolidays: "Government Holidays",
    longWeekendHolidays: "Long Weekend Holidays",
    festivals: "Festivals",
    peakWinters: "Peak Winters",
    peakSummers: "Peak Summers",
    summerHolidaysSchool: "School Summer Holidays",
  };

  const checkData = () => {
    for (const dayTypeData of Object.values(impactFactorData) as {}[]) {
      for (const impactTypeData of Object.values(dayTypeData) as number[]) {
        if (impactTypeData < -1 || impactTypeData > 1) {
          alert("Impact Factor should be between -1 and 1")
          return false
        }
      }
    }
    return true
  }

  const lockButtonFunction = () => {
    console.log(checkData() , lockStatus)
    if (checkData() && lockStatus === false) {
      setLockStatus(!lockStatus)
      dispatch(addImpactFactorData({
        id: id,
        data: impactFactorData
      }))
    }
    else if (lockStatus === true) {
      setLockStatus(!lockStatus)
      setDataCheckStatus((prevData: any) => ({
        ...prevData,
        ["Impact Factor Data"]: false
      }));
    }
  }

  return (
    <div className="flex flex-col rounded-[8px] shadow-sm bg-white pr-2">
      <div className="p-4">
        <AudienceTableHeader tableHeader={"Impact of Other Factors on Visit"}
          tableSubHeader={"Approval shall be granted in  hours post application and the research paper shall be completed in 48"}
          tableType={""} resetButton={() => resetButtonFunction()} lockButton={() => lockButtonFunction()} lockStatus={lockStatus} />
        <table className="border-collapse w-full text-[12px]">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-2 bg-[#F7F7F7] text-[#6F7F8E]">Gender Type</th>
              <th className="border p-2 bg-[#F7F7F7] text-[#6F7F8E]">Distribution of Month</th>
              {Object.values(impactFactorLabels).map((label) => (
                <th key={label} className="border p-2 text-[#ffffff] bg-[#FF5050]">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(impactFactorData).map(([dayType, factors], index) => (
              <tr key={dayType} className="text-center">
                {index === 0 && (
                  <td
                    className="border p-2 font-bold bg-[#F5FFFA] text-[#3A9868]"
                    rowSpan={Object.keys(impactFactorData).length}
                  >
                    {"Male & Female"}
                  </td>
                )}
                <td className="border-b p-2 font-semibold border-r-[#FF5050]">{capitalizeFirst(dayType)}</td>
                {Object.keys(impactFactorLabels).map((factorKey) => (
                  <td key={factorKey} className="border border-[#FF5050] p-2 text-[#FF5050] cursor-pointer"
                    // onMouseEnter={() =>
                    //   setEditableCell({ dayType, factorKey })
                    // }
                    onClick={() =>
                      setEditableCell({ dayType, factorKey })
                    }>
                    {editableCell?.dayType === dayType &&
                      editableCell.factorKey === factorKey ? (
                      <input
                        type="number"
                        value={(((factors || {} as any)[dayType] || {} as any)[factorKey])}
                        onBlur={handleBlur}
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleChange(e, dayType, factorKey)}
                        className="w-full h-full text-center cursor-pointer focus:outline-none bg-[#F7F7F7]"
                        aria-label="Edit percentage"
                        title="Edit percentage"
                        disabled={lockStatus}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el: any) => (inputRefs.current[index] = el)}
                        autoFocus={index == 0}
                      />
                    ) : (
                      `${(factors as any)[factorKey]}%`
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
