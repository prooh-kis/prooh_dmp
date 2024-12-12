import {
  AudienceDataTimeZoneWiseFemaleView,
  AudienceDataTimeZoneWiseView,
  AudienceTypeWiseView,
  ChartInfo,
  DailyWiseDistribution,
  ImpactOfOtherThingVisit,
  ImpactView,
} from "../../components";
import { getRegisterHeroDataDetails } from "../../actions/heroDataAction";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const timeArray: string[] = ["T1", "T2", "T3", "T4"];

export const DashboardPage = () => {
  const dispatch = useDispatch<any>();
  const urlParams = new URLSearchParams(window.location.search);

  const heroDataDetails = useSelector((state: any) => state.heroDataDetails);
  const { loading, error, success, data } = heroDataDetails;

  console.log("data : ", data);
  const [selectedTime, setSelectedTime] = useState<string>("T1");

  useEffect(() => {
    dispatch(getRegisterHeroDataDetails(urlParams.get("userId")));
  }, [dispatch]);
  return (
    <div className="pt-24 bg-gray-100 pt-8 flex flex-col gap-4 h-full">
      <div className="gap-4 flex justify-between bg-[#FFFFFF] border border-1 p-4">
        <div className="flex gap-4 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRPWpO-12m19irKlg8znjldmcZs5PO97B6A&s"
            alt=""
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h1 className="text-[#0E212E] text-[20px] font-semibold p-0 m-0">
              {data?.user?.name}
            </h1>
            <h1 className="text-[14px] text-[#0E212E] p-0 m-0">
              last updated-2 dec 2024
            </h1>
          </div>
        </div>
        <div className="flex gap-4 text-[#0E212E]">
          <select
            id="underline_select"
            className="py-2.5 px-0 w-auto text-sm text-gray-500 bg-transparent border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected className="py-2 px-4">
              Choose a City
            </option>
            <option value="Gurgaon" className="py-2 px-4">
              Gurgaon
            </option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Gurgaon">Gurgaon</option>
          </select>
          <select
            id="underline_select"
            className="py-2.5 px-0 w-auto text-sm text-gray-500 bg-transparent border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Choose a Touch points</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Gurgaon">Gurgaon</option>
          </select>
        </div>
      </div>
      <div className="px-4 flex flex-col gap-4 h-full bg-gray-100">
        <div className="flex gap-4 h-[400px] ">
          <div className="bg-[#ffffff] w-[70vw]  rounded-md p-8 h-full">
            <AudienceTypeWiseView />
          </div>
          <div className="bg-[#ffffff] w-[30vw]  rounded-md p-4 h-full">
            <DailyWiseDistribution />
          </div>
        </div>

        <div className="h-[500px] bg-[#FFFFFF] rounded-lg ">
          <div className="border border-b-1 p-4 text-[20px] font-bold pl-8">
            Audience Data Time Zone Wise
          </div>
          <div className="flex gap-4">
            <div className="w-[70vw]">
              <div className="flex gap-8 h-[300px] ">
                <AudienceDataTimeZoneWiseView />
                <AudienceDataTimeZoneWiseFemaleView />
              </div>
            </div>
            <ChartInfo
              timeArray={timeArray}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </div>
        </div>

        <div className="flex gap-4 h-[400px] px-4 bg-gray-100">
          <div className="bg-[#ffffff] w-[70vw] rounded-md p-8 h-full">
            <ImpactOfOtherThingVisit />
          </div>
          <div className="bg-[#ffffff] w-[30vw] rounded-md p-4 h-full">
            <ImpactView />
          </div>
        </div>
      </div>
    </div>
  );
};
