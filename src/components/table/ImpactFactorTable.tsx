import { AudienceTableHeader } from "../../components/layouts/AudienceTableHeader";
import { addImpactFactorData, getImpactFactorDataByMarketSite } from "../../actions/audienceAction";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { ADD_IMPACT_FACTOR_DATA_RESET, GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_RESET } from "../../constants/audienceConstant";

interface ImpactFactorTableProps {
  marketSite: String;
  id: string;
  setId: string;
  dataCheckStatus: any;
  setDataCheckStatus: Function;
}

export const ImpactFactorTable: React.FC<ImpactFactorTableProps> = ({ marketSite, id , setDataCheckStatus , dataCheckStatus }) => {

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
  const [lockStatus, setLockStatus] = useState(dataCheckStatus["Impact Factor Data"]);

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
    dispatch(getImpactFactorDataByMarketSite({ marketSite: marketSite }))
  }, [])

  useEffect(() => {
    if (impactFactorByMarketSiteError) {
      alert("Error Fetching Data : " + impactFactorByMarketSiteError)
      dispatch({ type: GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_RESET })
    }

    if (impactFactorByMarketSiteSuccess) {
      setImpactFactorData(impactFactorByMarketSite)
      dispatch({ type: GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_RESET })
    }

    if (addImpactFactorDataSuccess) {
      message.info("Data Saved Successfully")
      dispatch({ type: ADD_IMPACT_FACTOR_DATA_RESET })
      setDataCheckStatus((prevData: any) => ({
        ...prevData,
        ["Impact Factor Data"]: true
      }));
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

  const resetButtonFunction = () => {
    dispatch(getImpactFactorDataByMarketSite({ marketSite: marketSite }))
  }

  return (
    <div className="flex flex-col">
      <AudienceTableHeader tableHeader={"Impact of Other Factors on Visit"}
        tableSubHeader={"Approval shall be granted in  hours post application and the research paper shall be completed in 48"}
        tableType={""} resetButton={() => resetButtonFunction()} lockButton={() => lockButtonFunction()} lockStatus={lockStatus} />
      <table className="border-collapse w-full text-sm">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border p-2">Gender Type</th>
            <th className="border p-2">Distribution of Month</th>
            {Object.values(impactFactorLabels).map((label) => (
              <th key={label} className="border p-2">
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
                  className="border p-2 font-bold bg-gray-100"
                  rowSpan={Object.keys(impactFactorData).length}
                >
                  {"Male & Female"}
                </td>
              )}
              <td className="border p-2 font-medium">{capitalizeFirst(dayType)}</td>
              {Object.keys(impactFactorLabels).map((factorKey) => (
                <td key={factorKey} className="border p-2 text-blue-600"
                  onMouseEnter={() =>
                    setEditableCell({ dayType, factorKey })
                  }
                  onClick={() =>
                    setEditableCell({ dayType, factorKey })
                  }>
                  {editableCell?.dayType === dayType &&
                    editableCell.factorKey === factorKey ? (
                    <input
                      type="number"
                      value={((factors as any)[factorKey])}
                      onBlur={handleBlur}
                      onWheel={(e) => e.currentTarget.blur()}
                      onChange={(e) => handleChange(e, dayType, factorKey)}
                      className="w-full h-full text-center border-[#1297E2] cursor-pointer focus:border-[#1297E2]"
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
  );
};
