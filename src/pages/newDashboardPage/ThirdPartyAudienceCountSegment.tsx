import { useSelector, useDispatch } from "react-redux";
import { DashboardPieChart } from "./DashboardPieChart"
import { useEffect, useState } from "react";
import { getThirdPartyAudienceCountSourceWiseAction } from "../../actions/dashboardAction";

export const ThirdPartyAudienceCountSegment = () => {
  const dispatch = useDispatch<any>();
  const [thirdPartyData, setThirdPartyData] = useState<any>([]);
  
  const {
    loading: loadingThirdPartyAudienceCount,
    error: errorThirdPartyAudienceCount,
    data: thirdPartyAudienceCount
} = useSelector((state: any) => state.getThirdPartyAudienceCountSourceWise);


  useEffect(() => {
      if (thirdPartyAudienceCount) {
          setThirdPartyData((thirdPartyAudienceCount.response));
      }

  }, [thirdPartyAudienceCount]);
  useEffect(() => {
    dispatch(getThirdPartyAudienceCountSourceWiseAction());
  },[dispatch]);
  return (
    <div className="row-span-1 grid grid-rows-12">
      <div className="row-span-6 flex items-center border-b">
        {!thirdPartyAudienceCount && loadingThirdPartyAudienceCount ? (
            <div className="rounded-[8px] bg-white animate-pulse h-20 p-1">
                <div className="bg-gray-200 h-full" />
            </div>
        ) : thirdPartyAudienceCount && (
            <div className="p-4 flex items-center">
                <DashboardPieChart
                    type="Third Party Data"
                    total={thirdPartyAudienceCount.totalCount}
                    data={thirdPartyData}
                />
            </div>
        )}
    </div>
    <div className="row-span-6 p-4 overflow-y-scroll no-scrollbar">
        {Object.keys(thirdPartyData)?.map((key: any, i: number) => (
            <div key={i}>
                <h1 className="text-[16px] font-semibold">
                    {key === "totalCameraData" ? "Camera Data" : key === "totalRoadsterData" ? "Roadster Data" : key === "totalDmfdData" ? "DMFD Data" : key === "totalTrafficData" ? "Traffic Data" : key === "totalMobileDeviceSdkData" ? "Mobile Device SDK" : ""}
                </h1>
                <p className="text-[14px] text-gray-500">
                    {thirdPartyData[key].description}
                </p>
            </div>
        ))}
    </div>
  </div>
  )
}