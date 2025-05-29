import { useSelector, useDispatch } from "react-redux";
import { DashboardPieChart } from "./DashboardPieChart"
import { useEffect, useState } from "react";
import { DataHeroProfilePopup } from "./DataHeroProfilePopup";
import { getRespondentCountIndustryWiseAction, getRespondentProfileIndustryWiseAction } from "../../actions/dashboardAction";

export const RespondentDataSegment = ({industry, setValue}: any) => {
  const dispatch = useDispatch<any>();
  const [respondentData, setRespondentData] = useState<any>([]);
  const [respondentProfile, setRespondentProfile] = useState<any>([]);

  const [openDataHeroPopup, setOpenDataHeroPopup] = useState<any>(false);
  const [selectedHero, setSelectedHero] = useState<any>(null);

  const {
      loading: loadingRespondentCount,
      error: errorRespondentCount,
      data: respondentCount
  } = useSelector((state: any) => state.getRespondentCountIndustryWise);

  const {
      loading: loadingRespondentProfile,
      error: errorRespondentProfile,
      data: respondentProfileData
  } = useSelector((state: any) => state.getRespondentProfileIndustryWise);
  useEffect(() => {
    if (respondentCount) {
        setRespondentData(respondentCount.response);
    }
    if (respondentProfileData) {
        setRespondentProfile(respondentProfileData);
    }
  }, [respondentCount, respondentProfileData]);

  useEffect(() => {
    dispatch(getRespondentCountIndustryWiseAction());
    dispatch(getRespondentProfileIndustryWiseAction({ industry: industry }));
  },[dispatch, industry]);
  console.log(respondentData)
  return (
    <div className="row-span-1 grid grid-rows-12">
      <DataHeroProfilePopup
          open={openDataHeroPopup}
          onClose={() => {
              setOpenDataHeroPopup(false);
          }}
          heroDetails={selectedHero}
      />
      <div className="row-span-6 flex items-center justify-center border-b">
          {!respondentCount && loadingRespondentCount ? (
              <div className="rounded-[8px] bg-white animate-pulse h-20 p-1">
                  <div className="bg-gray-200 h-full" />
              </div>
          ) : respondentCount && (
              <div className="p-4 flex items-center ">
                  <DashboardPieChart
                      type="Respondent Data"
                      total={respondentData.length}
                      data={respondentData}
                      setValue={setValue}
                  />
              </div>
          )}
      </div>
      <div className="row-span-6 grid grid-rows-12 overflow-y-scroll no-scrollbar">
          <div className="px-4 row-span-2">
              {respondentCount && (
                  <h1 className="pt-2 text-[16px] font-semibold">Respondent Profile ({respondentCount?.total})</h1>
              )}
          </div>
          <div className="px-4 row-span-10">
              {loadingRespondentProfile ? (
                  <div className="rounded-[8px] bg-white animate-pulse h-20 p-1">
                      <div className="bg-gray-200 h-full" />
                  </div>
              ) : respondentProfileData && (
                  <div className="grid grid-cols-3 gap-4 overflow-y-scroll no-scrollbar">
                      {respondentProfile?.filter((rspdt: any) => industry.includes(rspdt?.industry))?.map((respondent: any, j: any) => (
                          <div
                              key={j}
                              className="col-span-1 w-full h-full py-1"
                              onClick={() => {
                                  setOpenDataHeroPopup(true);
                                  setSelectedHero(respondent);
                              }}
                          >
                              <div className="h-24 rounded-[8px] bg-white border border-[#D7D7D720]">
                                  <img className="rounded-[8px] h-full w-full" src={respondent?.avatar} alt={respondent.name} />
                              </div>
                              <div className="py-1">
                                  <h1 className="text-[14px] font-semibold truncate">{respondent.name}</h1>
                                  <p className="text-[12px] text-gray-500 truncate">{respondent.role}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      </div>
    </div>
  )
}