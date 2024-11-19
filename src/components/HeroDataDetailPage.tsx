import React, { useCallback, useState } from "react";
import { MyTab } from "./MyTab";
import { SingleRowTable } from "./table";
import { dataAsPerOurIotDevices } from "../HardCodedData/tabData";

export const HeroDataDetailPage = ({ data }: any) => {
  console.log("data : ", data);
  const [open, setOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleSetCurrent = useCallback(
    (value: number) => {
      setCurrent(value);
    },
    [current]
  );

  const getTable = (current: number) => {
    switch (current) {
      case 0:
        return (
          <SingleRowTable
            data={{
              "DFMD 1": 2000,
              "DFMD 2": 2000,
              "DFMD 3": 2000,
              "DFMD 4": 3000,
              Total: 9000,
            }}
          />
        );
      case 1:
        return (
          <SingleRowTable
            data={{
              "Entrance 1": 2000,
              "Entrance 2": 2000,
              "Entrance 3": 2000,
              "Exit Gate": 2000,
              Total: 8000,
            }}
          />
        );

      case 2:
        return (
          <SingleRowTable
            data={{ "Google traffic and RTO data": 53453, Total: 53453 }}
          />
        );
      case 3:
        return (
          <SingleRowTable
            data={{ "As Per Roadster Iot Device Data": 34324, Total: 34324 }}
          />
        );

      default:
        return (
          <SingleRowTable
            data={{ "As Per Our Mobile SDK Data": 2345, Total: 2345 }}
          />
        );
        break;
    }
  };
  return (
    <div className="bg-white">
      <div className="p-8 flex justify-between">
        <div className="flex gap-4 justify-center items-center ">
          <i className="fi fi-bs-angle-left"></i>
          <img
            src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
            alt=""
            className="h-[64px] w-[64px] rounded-md"
          />
          <div>
            <h1 className="text-[#0E212E] text-[24px] font-semibold">
              {data?.name}
            </h1>
            <h1 className="text-[#254354]">{data?.role}</h1>
          </div>
        </div>
        <div>
          <div className="flex gap-4 justify-start items-center">
            <i className="fi fi-sr-envelope text-[#00A0FA]"></i>
            <h1>{data?.email}</h1>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <i className="fi fi-sr-phone-call text-[#00A0FA]"></i>
            <h1>{data?.phone}</h1>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <i className="fi fi-sr-envelope text-[#00A0FA]"></i>
            <h1>{data?.upiId}</h1>
          </div>
        </div>
      </div>
      <div className="border border-1"></div>
      <div className="p-8">
        <h1 className="py-4">You Are Working On</h1>
        <table className="border-collapse w-full text-[15px]">
          <thead>
            <tr className="text-[#FFFFFF] bg-[#1297E2] ">
              <th className="border border-slate-300 py-2">
                Selected TouchPoint
              </th>
              <th colSpan={3} className="border border-slate-300 py-2">
                Selected Cities
              </th>
              <th className="border border-slate-300 py-2">
                Total Average FootFall
              </th>
              <th className="border border-slate-300 py-2">View Full Data</th>
            </tr>
          </thead>
          <tbody className="w-full border border-1">
            <tr>
              <td className="border border-slate-300 text-center py-2">
                {data?.touchPoints}
              </td>
              {["Ara", "Patna", "Delhi"]?.map(
                (value: string, index: number) => (
                  <td
                    className="border border-slate-300 text-center py-2"
                    key={index}
                  >
                    {value}
                  </td>
                )
              )}
              <td
                onClick={handleOpen}
                className="border border-slate-300 text-[#1297E2] cursor-pointer hover:text-blue-700 text-center py-2"
              >
                1000000
              </td>
              <td className="border border-slate-300 text-gray-400 cursor-pointer hover:text-gray-400 text-center py-2">
                <i className="fi fi-ss-eye"></i>
              </td>
            </tr>
          </tbody>
        </table>
        {open && (
          <div className="py-4 font-bold text-[20px]">
            <h1 className="py-4">Data As Per Our Iot Devices</h1>
            <MyTab
              data={dataAsPerOurIotDevices}
              current={current}
              setCurrent={handleSetCurrent}
            />
            <div className="py-4">{getTable(current)}</div>
          </div>
        )}
      </div>
    </div>
  );
};
