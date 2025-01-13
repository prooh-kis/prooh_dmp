import {
  EnterAudienceDataTimeZoonWiseTable,
  EnterAudienceTypeDataTable,
  MyButton,
  SingleRowTable,
  MyTab,
  HeroDataDetailPage,
  EnterWeightCohortWise,
} from "../../components/index";
import { Checkbox } from "antd";
import React, { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAudienceDataAction,
  getRegisterHeroDataDetails,
  saveAudienceDataAction,
} from "../../actions/heroDataAction";
import { message } from "antd";
import {
  GET_HERO_DATA_DETAILS_RESET,
  SAVE_AUDIENCE_DATA_RESET,
} from "../../constants/heroDataConstant";
import { ALL_COHORTS } from "../../constants/helperConstant";
import { EnterImpactFactorTable } from "../../components/table/EnterImpactFactorTable";

const monthDays = {
  weekdays: 22,
  saturdays: 4,
  sundays: 4,
};

export const HomePage = () => {
  const dispatch = useDispatch<any>();
  const urlParams = new URLSearchParams(window.location.search);

  const [totalCount, setTotalCount] = useState<number>(1000000);
  const [selectedMarketSite, setSelectedMarketSite] = useState<any>("");
  const [certified, setCertified] = useState<any>(false);
  const [genderData, setGenderData] = useState<any>(null);

  const [audienceTypeWiseData, setAudienceTypeWiseData] = useState<any>(
    ALL_COHORTS?.map((val: any) => {
      return {
        categoryType: val,
        percentage: 0,
        genderWiseData: [],
      };
    })
  );
  const [currentAudienceType, setCurrentAudienceType] = useState<number>(0);

  const heroDataDetails = useSelector((state: any) => state.heroDataDetails);
  const { loading, error, success, data: heroDataUser } = heroDataDetails;

  const audienceDataSave = useSelector((state: any) => state.audienceDataSave);
  const {
    loading: loadingSave,
    error: errorSave,
    success: successSave,
    data: savedData,
  } = audienceDataSave;

  const audienceDataGet = useSelector((state: any) => state.audienceDataGet);
  const {
    loading: loadingAudienceData,
    error: errorAudienceData,
    data: gotAudienceData,
  } = audienceDataGet;

  useEffect(() => {
    if (
      audienceTypeWiseData?.[currentAudienceType]?.genderWiseData?.length > 0
    ) {
      setGenderData(audienceTypeWiseData[currentAudienceType]?.genderWiseData);
    } else {
      setGenderData([
        {
          gender: "Male",
          weight: 0,
          weekdays: {
            days: 22,
            monthly: 0,
            daily: 0,
            unique: 0,
            cohort: {
              morning: 0,
              afternoon: 0,
              evening: 0,
              night: 0,
            },
            impactFactor: {
              govtHolidays: 0,
              longWeekendHolidays: 0,
              festivals: 0,
              peakWinters: 0,
              peakSummers: 0,
              summerHolidaysSchool: 0,
            },
          },
          saturdays: {
            days: 4,
            monthly: 0,
            daily: 0,
            unique: 0,
            cohort: {
              morning: 0,
              afternoon: 0,
              evening: 0,
              night: 0,
            },
            impactFactor: {
              govtHolidays: 0,
              longWeekendHolidays: 0,
              festivals: 0,
              peakWinters: 0,
              peakSummers: 0,
              summerHolidaysSchool: 0,
            },
          },
          sundays: {
            days: 4,
            monthly: 0,
            daily: 0,
            unique: 0,
            cohort: {
              morning: 0,
              afternoon: 0,
              evening: 0,
              night: 0,
            },
            impactFactor: {
              govtHolidays: 0,
              longWeekendHolidays: 0,
              festivals: 0,
              peakWinters: 0,
              peakSummers: 0,
              summerHolidaysSchool: 0,
            },
          },
        },
        {
          gender: "Female",
          weight: 0,
          weekdays: {
            days: 22,
            monthly: 0,
            daily: 0,
            unique: 0,
            cohort: {
              morning: 0,
              afternoon: 0,
              evening: 0,
              night: 0,
            },
            impactFactor: {
              govtHolidays: 0,
              longWeekendHolidays: 0,
              festivals: 0,
              peakWinters: 0,
              peakSummers: 0,
              summerHolidaysSchool: 0,
            },
          },
          saturdays: {
            days: 4,
            monthly: 0,
            daily: 0,
            unique: 0,
            cohort: {
              morning: 0,
              afternoon: 0,
              evening: 0,
              night: 0,
            },
            impactFactor: {
              govtHolidays: 0,
              longWeekendHolidays: 0,
              festivals: 0,
              peakWinters: 0,
              peakSummers: 0,
              summerHolidaysSchool: 0,
            },
          },
          sundays: {
            days: 4,
            monthly: 0,
            daily: 0,
            unique: 0,
            cohort: {
              morning: 0,
              afternoon: 0,
              evening: 0,
              night: 0,
            },
            impactFactor: {
              govtHolidays: 0,
              longWeekendHolidays: 0,
              festivals: 0,
              peakWinters: 0,
              peakSummers: 0,
              summerHolidaysSchool: 0,
            },
          },
        },
      ]);
    }
  }, [audienceTypeWiseData, currentAudienceType]);

  useEffect(() => {
    dispatch(getRegisterHeroDataDetails(urlParams.get("userId")));
    if (selectedMarketSite !== "") {
      dispatch(
        getAudienceDataAction({
          dataHeroId: urlParams.get("userId"),
          selectedMarketSite: selectedMarketSite,
        })
      );
    }
  }, [dispatch, selectedMarketSite]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch({ type: GET_HERO_DATA_DETAILS_RESET });
    }
    if (errorAudienceData) {
      message.error(errorAudienceData);
    }

    if (errorSave) {
      message.error(errorAudienceData);
      dispatch({
        type: SAVE_AUDIENCE_DATA_RESET,
      });
    }

    if (heroDataDetails?.audienceData?.audiencePercentCategories?.length > 0) {
      setAudienceTypeWiseData(heroDataDetails?.audienceData);
      if (selectedMarketSite === "") {
        setSelectedMarketSite(
          heroDataDetails?.user?.touchPoints[0].marketSites?.[0]
        );
      }
      // setTotalCount(heroDataDetails?.audienceData?.totalAudienceCount);
    }

    if (
      gotAudienceData &&
      gotAudienceData?.audiencePercentCategories?.length > 0
    ) {
      setAudienceTypeWiseData(gotAudienceData.audiencePercentCategories);
      setTotalCount(gotAudienceData.totalAudienceCount);
    }
  }, [
    dispatch,
    selectedMarketSite,
    heroDataDetails,
    errorAudienceData,
    errorSave,
    error,
    gotAudienceData,
  ]);

  useEffect(() => {
    if (successSave) {
      message.success(
        "Your response for audience data has been updated successfully..."
      );
      setAudienceTypeWiseData(savedData.audiencePercentCategories);
      setTotalCount(savedData.totalAudienceCount);
      dispatch({
        type: SAVE_AUDIENCE_DATA_RESET,
      });
    }
  }, [dispatch, successSave, savedData]);

  const handleSaveData = (audienceData: any) => {
    const bodyToSend = {
      dataHeroUserId: heroDataUser?.user?._id,
      dataHeroUserEmail: heroDataUser?.user?.email,
      market: heroDataUser?.user?.market,
      marketSite: selectedMarketSite,
      touchPoints: heroDataUser?.user?.touchPoints
        ?.filter((t: any) => t.marketSite === selectedMarketSite)
        .map((g: any) => g.touchPoint),
      totalAudienceCount: totalCount,
      audiencePercentCategories: audienceData,
      certified: certified,
    };

    dispatch(saveAudienceDataAction(bodyToSend));
  };

  return (
    <div>
      <div className="p-12 gap-4 flex flex-col bg-gray-100">
        <HeroDataDetailPage
          totalCount={totalCount}
          data={heroDataUser?.user}
          setSelectedMarketSite={setSelectedMarketSite}
          selectedMarketSite={selectedMarketSite}
        />
        <div className="bg-white rounded-md">
          <div className="px-8 py-4">
            <h1 className="text-[12px] text-[#74848E] pb-4">
              Note: Approval Shall Be Granted In Hours Post Application And The
              Research Paper Shall Be Completed In 48 hours...
            </h1>
            <div className="flex justify-between items-center">
              <h1 className="text-[16px] text-[#0E212E] font-bold py-4">
                1. Enter Audience Segment Wise Data
              </h1>
              <div
                className="flex items-center"
                onClick={() => {
                  handleSaveData(audienceTypeWiseData);
                }}
              >
                <i
                  className={`fi fi-sr-check-circle text-green-500 flex items-center`}
                ></i>
              </div>
            </div>

            <EnterWeightCohortWise
              totalCount={totalCount}
              audienceTypeWiseData={audienceTypeWiseData}
              setAudienceTypeWiseData={setAudienceTypeWiseData}
            />
          </div>
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-[16px] text-[#0E212E] font-bold">
                2. Enter Audience Type Wise Data
              </h1>
              <div
                className="flex items-center"
                onClick={() => {
                  handleSaveData(audienceTypeWiseData);
                }}
              >
                <i className="fi fi-sr-check-circle text-green-500 flex items-center"></i>
              </div>
            </div>
            <div className="py-4">
              <MyTab
                data={audienceTypeWiseData?.map((data: any, index: number) => {
                  return {
                    label: data.categoryType,
                    key: index,
                    value: data.percentage,
                  };
                })}
                current={currentAudienceType}
                setCurrent={(value: number) => setCurrentAudienceType(value)}
              />
            </div>
            <EnterAudienceTypeDataTable
              genderData={genderData}
              setGenderData={setGenderData}
              monthDays={monthDays}
              totalCount={totalCount}
              audienceTypeWiseData={audienceTypeWiseData}
              setAudienceTypeWiseData={setAudienceTypeWiseData}
              currentAudienceType={currentAudienceType}
            />
          </div>
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-[16px] text-[#0E212E] font-bold py-4">
                3. Enter Audience Data TIme Zone Wise
              </h1>
              <div
                className="flex items-center"
                onClick={() => {
                  handleSaveData(audienceTypeWiseData);
                }}
              >
                <i className="fi fi-sr-check-circle text-green-500 flex items-center"></i>
              </div>
            </div>
            <EnterAudienceDataTimeZoonWiseTable
              genderData={genderData}
              setGenderData={setGenderData}
              monthDays={monthDays}
              totalCount={totalCount}
              audienceTypeWiseData={audienceTypeWiseData}
              setAudienceTypeWiseData={setAudienceTypeWiseData}
              currentAudienceType={currentAudienceType}
            />
          </div>
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-[16px] text-[#0E212E] font-bold py-4">
                4. Impact Factor Analysis
              </h1>
              <div
                className="flex items-center"
                onClick={() => {
                  handleSaveData(audienceTypeWiseData);
                }}
              >
                <i className="fi fi-sr-check-circle text-green-500 flex items-center"></i>
              </div>
            </div>
            <EnterImpactFactorTable
              genderData={genderData}
              setGenderData={setGenderData}
              monthDays={monthDays}
              totalCount={totalCount}
              audienceTypeWiseData={audienceTypeWiseData}
              setAudienceTypeWiseData={setAudienceTypeWiseData}
              currentAudienceType={currentAudienceType}
            />
          </div>
        </div>
        <div className="bg-white rounded-md">
          <div className="p-8 flex flex-col">
            <h1 className="text-[14px] py-1">I certify that, </h1>
            {/* <Checkbox>
              I have filled out this form based on my knowledge and experience
            </Checkbox> */}
            <Checkbox
              onChange={(e) => {
                setCertified(e.target.checked);
              }}
            >
              I have provided information in this form according to my own
              knowledge and experience.
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md w-full">
        <div className="px-16  py-4 flex justify-end gap-4">
          {/* <MyButton
            title="Reset"
            width="72px"
            height="24px"
            outLine="2"
            color="#000000"
            bgColor="#FFFFFF"
            disabled={true}
            onClick={() => {

            }}
          /> */}
          <MyButton
            title="Save"
            width="72px"
            height="24px"
            disabled={!certified}
            onClick={() => {
              handleSaveData(audienceTypeWiseData);
            }}
          />
        </div>
      </div>
    </div>
  );
};
