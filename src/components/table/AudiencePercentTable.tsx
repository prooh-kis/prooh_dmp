import { AudienceTableHeader } from "../../components/layouts/AudienceTableHeader";
import { getAvgAudienceDataByMarketSite } from "../../actions/audienceAction";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface AudiencePercentData {
  category: string;
  percent: number;
  count: number;
}

interface AudiencePercentTableProps {
  marketSite: String;
  id : string;
  setId : string;
}

export const AudiencePercentTable: React.FC<AudiencePercentTableProps> = ({
  marketSite , id , setId
}) => {

  const dispatch = useDispatch<any>();
  const [totalCount, setTotalCount] = useState(0);
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

  const checkAudienceData = () => {
    var total = 0
    audienceDataByMarketSite.array.forEach((element: AudiencePercentData) => {
      total += element.percent
    });
  }

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


  useEffect(() => {
    dispatch(getAvgAudienceDataByMarketSite({ marketSite: marketSite }))
  }, [])

  useEffect(() => {
    if (audienceDataByMarketSiteError) {
      alert("Error Fetching Data : " + audienceDataByMarketSiteError)
    }

    if (audienceDataByMarketSiteSuccess) {
      setAudienceTypeWiseData(audienceDataByMarketSite?.data)
      setTotalCount(audienceDataByMarketSite?.totalAvgCount)
    }

  }, [audienceDataByMarketSiteSuccess, audienceDataByMarketSiteError])


  return (
    <div className="flex flex-col">
      <AudienceTableHeader tableHeader={"Audience Type Data"} tableSubHeader={""} tableType={""} 
      resetButton={()=> {}} lockButton={()=> {}}/>
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
                    value={(data.percent).toFixed(0)}
                    onBlur={handleBlur}
                    onWheel={(e) => e.currentTarget.blur()}
                    onChange={(e) => handleDataChange(e, index)}
                    className="w-full h-full text-center border-[#1297E2] cursor-pointer focus:border-[#1297E2]"
                    aria-label="Edit percentage"
                    title="Edit percentage"
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el: any) => (inputRefs.current[index] = el)}
                    autoFocus={index == 0}
                  />
                ) : (
                  `${(data.percent).toFixed(0)}%`
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
