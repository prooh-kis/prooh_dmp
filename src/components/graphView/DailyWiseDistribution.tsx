import { LinearBar } from "../../components/LinearBar";
import React from "react";

export const DailyWiseDistribution = () => {
  const data: any = {
    dsaaaaaaa: {
      male: 34,
      female: 66,
    },
    asdasdasdasdas: {
      male: 56,
      female: 66,
    },
    dsadsadas: {
      male: 78,
      female: 66,
    },
    "ewrewq wqqrrqw": {
      male: 98,
      female: 66,
    },
    "rwerw rwe rwe  rewrwe": {
      male: 23,
      female: 66,
    },
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-[20px] text-[#1C304D] font-bold">
          day wise distribution
        </h1>
        <select
          id="underline_select"
          className="py-2.5 px-0 w-auto text-sm text-gray-500 bg-transparent  appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option selected>Wednesday</option>
          <option value="Gurgaon">Thrusday</option>
          <option value="Gurgaon">Friday</option>
          <option value="Gurgaon">Saturday</option>
          <option value="Gurgaon">Sunday</option>
          <option value="Gurgaon">Monday</option>
          <option value="Gurgaon">Tuesday</option>
        </select>
      </div>
      <div className="flex  justify-between text-[14px] w-full pt-4">
        <div className="flex gap-4 w-full">
          <div className="flex flex-col ">
            <div className="p-0 m-0">Male</div>
            <div className="p-0 m-0">Female</div>
          </div>
          <div className="flex flex-col w-full gap-4 ">
            <div className="flex ">
              <div className="bg-[#FFB371] w-[20%] p-1"></div>
              <div className="bg-[#6AC0FF] w-[80%] p-1"></div>
            </div>
            <div className="flex ">
              <div className="bg-[#FFB371] w-[70%] p-1"></div>
              <div className="bg-[#BFB4FF] w-[30%] p-1"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pl-2">
          <div>40%</div>
          <div>60%</div>
        </div>
      </div>
      <div className="flex justify-between pt-8">
        <h1>Audience Type Impression %</h1>
        <select
          id="underline_select"
          className="py-2.5 px-0 w-auto text-sm text-gray-500 bg-transparent  appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option selected>Male</option>
          <option value="Gurgaon">Female</option>
        </select>
      </div>
      <table className="w-full text-[#0E212E] text-[14px]">
        <tbody className="w-full">
          {Object.keys(data)?.map((cp: any, index: any) => (
            <tr key={index} className="pt-2">
              <td>{cp}</td>
              <td className="w-32">
                <LinearBar
                  value={data[cp].male}
                  colors={["#E1F3FF", "#6AC0FF"]}
                  highest={100}
                />
              </td>
              <td className="pl-4">{data[cp].male}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-4 text-[12px] pt-8">
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 bg-[#6AC0FF] rounded-full"></div>
          <h1>Male</h1>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 bg-[#BFB4FF] rounded-full"></div>
          <h1>Female</h1>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 bg-[#FFB876] rounded-full"></div>
          <h1>Unique Impression</h1>
        </div>
      </div>
    </div>
  );
};
