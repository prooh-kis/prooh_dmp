import React from "react";

export const ChartInfo = ({
  timeArray,
  selectedTime,
  setSelectedTime,
}: any) => {
  return (
    <div className="border border-left-1 p-4 w-[30vw]">
      <h1 className="text-[15px] text-[#0E212E] font-bold p-0 m-0">
        Chart info
      </h1>
      <div className="flex gap-4 pt-4">
        {timeArray?.map((value: string, index: any) => (
          <div
            key={index}
            onClick={() => setSelectedTime(value)}
            className={
              selectedTime == value
                ? "p-2 bg-[#129BFF] text-[#ffffff] border border-1 text-[10px] rounded-lg"
                : "p-2 border border-1 text-[10px] rounded-lg"
            }
          >
            {value}
          </div>
        ))}
      </div>
      <div className="pt-4 text-[12px] w-[70%]">
        <div className="flex justify-between pt-6">
          <h1 className="">Audience %</h1>
          <h1 className="">3.14 %</h1>
        </div>
        <div className="flex justify-between pt-6">
          <h1 className="">Total Unique impression count per time Zone</h1>
          <h1 className="">38182</h1>
        </div>
        <div className="flex justify-between pt-6">
          <h1 className="">Total Unique per spot ( 10secs/3 mins) %</h1>
          <h1 className="">60</h1>
        </div>
        <div className="flex justify-between pt-6">
          <h1 className="">Impressions per spot over a 10 days campaign</h1>
          <h1 className="">15.90</h1>
        </div>
      </div>
    </div>
  );
};
