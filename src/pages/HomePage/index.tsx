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

import { audienceTypeDataTab } from "../../HardCodedData/tabData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRegisterHeroDataDetails } from "../../actions/heroDataAction";
import { message } from "antd";
import { GET_HERO_DATA_DETAILS_RESET } from "../../constants/heroDataConstant";
import { ALL_COHORTS } from "../../constants/heplerConstant";

export const HomePage = () => {
  const dispatch = useDispatch<any>();
  const [totalCount, setTotalCount] = useState<number>(100000);

  const heroDataDetails = useSelector((state: any) => state.heroDataDetails);
  const { loading, error, success, data } = heroDataDetails;

  useEffect(() => {
    var urlParams = new URLSearchParams(window.location.search);
    dispatch(getRegisterHeroDataDetails(urlParams.get("userId")));
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch({ type: GET_HERO_DATA_DETAILS_RESET });
    }
  }, [error]);

  const [audienceTypeWiseData, setAudienceTypeWiseData] = useState<any>([]);
  const [currentAudienceType, setCurrentAudienceType] = useState<number>(0);
  console.log("audienceTypeWiseData :", audienceTypeWiseData);

  useEffect(() => {
    let ddd = ALL_COHORTS?.map((value: string) => {
      return {
        categoryType: value,
        percentage: 0.1514,
        genderWiseData: [
          {
            gender: "Male",
            weight: 45,
            weekdays: {
              days: 22,
              monthly: 0.7,
              daily: 0.03,
              unique: 0.3,
              cohort: {
                morning: 0.5,
                afternoon: 0.1,
                evening: 0.2,
                night: 0.2,
              },
            },
            saturdays: {
              days: 4,
              monthly: 0.2,
              daily: 0.05,
              unique: 0.4,
              cohort: {
                morning: 0.2,
                afternoon: 0.2,
                evening: 0.2,
                night: 0.4,
              },
            },
            sundays: {
              days: 4,
              monthly: 0.1,
              daily: 0.025,
              unique: 0.2,
              cohort: {
                morning: 0.2,
                afternoon: 0.2,
                evening: 0.3,
                night: 0.3,
              },
            },
          },
          {
            gender: "Female",
            weight: 0.6598,
            weekdays: {
              days: 22,
              monthly: 0.6,
              daily: 0.027,
              unique: 0.4,
              cohort: {
                morning: 0.3,
                afternoon: 0.2,
                evening: 0.3,
                night: 0.2,
              },
            },
            saturdays: {
              days: 4,
              monthly: 0.3,
              daily: 0.075,
              unique: 0.4,
              cohort: {
                morning: 0.2,
                afternoon: 0.1,
                evening: 0.3,
                night: 0.4,
              },
            },
            sundays: {
              days: 4,
              monthly: 0.1,
              daily: 0.025,
              unique: 0.2,
              cohort: {
                morning: 0.2,
                afternoon: 0.1,
                evening: 0.4,
                night: 0.3,
              },
            },
          },
        ],
        impact_factor: {
          govt_holidays: 0.11,
          long_weekends_holidays: 0.7,
          festivals: 0.8,
          peak_winters: 0.6,
          peak_summers: 0.8,
          summer_holidays_school: 0.6,
        },
      };
    });
    setAudienceTypeWiseData(ddd);
  }, []);

  return (
    <div>
      <div className="p-12 gap-4 flex flex-col bg-gray-100">
        <HeroDataDetailPage data={data} />
        <div className="bg-white rounded-md">
          <div className="p-8">
            <h1 className="text-[24px] text-[#0E212E] font-bold py-4">
              1. Total Responded-14
            </h1>
            <EnterWeightCohortWise
              audienceTypeWiseData={audienceTypeWiseData}
              setAudienceTypeWiseData={setAudienceTypeWiseData}
              currentAudienceType={currentAudienceType}
            />
          </div>
          <div className="p-8">
            <h1 className="text-[24px] text-[#0E212E] font-bold">
              2. Enter Audience Type Wise
            </h1>
            <h1 className="text-[#74848E] pb-8">
              Approval Shall Be Granted In Hours Post Application And The
              Research Paper Shall Be Completed In 48{" "}
            </h1>
            <div className="py-4">
              <MyTab
                data={audienceTypeWiseData?.map((data: any, index: number) => {
                  return { label: data.categoryType, key: index };
                })}
                current={currentAudienceType}
                setCurrent={(value: number) => setCurrentAudienceType(value)}
              />
            </div>
            <EnterAudienceTypeDataTable
              audienceTypeWiseData={audienceTypeWiseData}
              setAudienceTypeWiseData={setAudienceTypeWiseData}
              currentAudienceType={currentAudienceType}
            />
          </div>
          <div className="p-8">
            <h1 className="text-[24px] text-[#0E212E] font-bold">
              3. Enter Audience Data TIme Zone Wise
            </h1>
            <h1 className="text-[#74848E] pb-8">
              Approval Shall Be Granted In Hours Post Application And The
              Research Paper Shall Be Completed In 48{" "}
            </h1>
            <EnterAudienceDataTimeZoonWiseTable />
          </div>
        </div>
        <div className="bg-white rounded-md">
          <div className="p-8 flex flex-col">
            <h1>I Certified</h1>
            <Checkbox>
              I have filled out this form based on my knowledge and experience
            </Checkbox>
            <Checkbox disabled>
              I have provided information in this form according to my own
              knowledge and experience
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md w-full">
        <div className="px-16  py-4 flex justify-end gap-4">
          <MyButton
            title="Reset"
            width="72px"
            height="24px"
            outLine="2"
            color="#000000"
            bgColor="#FFFFFF"
          />
          <MyButton title="Save" width="72px" height="24px" />
        </div>
      </div>
    </div>
  );
};
