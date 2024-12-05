import React, { useCallback, useEffect, useState } from "react";
import { MyTab } from "./MyTab";
import { SingleRowTable } from "./table";
import { dataAsPerOurIotDevices } from "../HardCodedData/tabData";
import { DropdownInput } from "./atoms/DropdownInput";

export const HeroDataDetailPage = ({ data, selectedMarketSite, setSelectedMarketSite }: any) => {
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

  useEffect(() => {
    if (data && selectedMarketSite === "") {
      setSelectedMarketSite(data?.touchPoints[0].marketSites?.[0]);
    }
  },[data, selectedMarketSite, setSelectedMarketSite]);

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
          {/* <i className="fi fi-bs-angle-left"></i> */}
          <div>
            <h1 className="text-[#0E212E] text-[24px] font-semibold">
              {data?.name}
            </h1>
            <h1 className="text-[12px] text-[#254354]">{data?.role}</h1>
            <h1 className="text-[12px] text-[#254354]">{data?.market}</h1>

          </div>
        </div>
        <div>
          <div className="flex gap-4 justify-start items-center">
            <i className="fi fi-sr-envelope text-[#00A0FA] flex items-center"></i>
            <h1 className="text-[14px]">{data?.email}</h1>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <i className="fi fi-sr-phone-call text-[#00A0FA] flex items-center"></i>
            <h1 className="text-[14px]">{data?.phone}</h1>
          </div>
          <div className="flex gap-4 justify-start items-center flex items-center">
            <i className="fi fi-sr-envelope text-[#00A0FA]"></i>
            <h1 className="text-[14px]">{data?.upiId}</h1>
          </div>
        </div>
      </div>
      <div className="border border-1"></div>
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h1 className="py-4 text-[14px]">You Are Working On</h1>
          <div className="w-1/4">
            <DropdownInput
              inputType="text"
              placeHolder="Locations"
              height="h-8"
              width="w-full"
              options={data?.touchPoints[0].marketSites.map((m: any) => {
                return { label: m, value: m, status: false }
              })}
              selectedOption={selectedMarketSite}
              setSelectedOption={(e: any) => setSelectedMarketSite(e)}
            />
          </div>
        </div>
        <table className="border-collapse w-full text-[14px]">
          <thead>
            <tr className="text-[#FFFFFF] bg-[#1297E2] ">
              <th colSpan={1} className="border border-slate-300 py-2">
                Selected TouchPoint
              </th>
              <th colSpan={3} className="border border-slate-300 py-2">
                Selected Locations
              </th>
              <th colSpan={1} className="border border-slate-300 py-2">
                Total Average FootFall
              </th>
              <th colSpan={1} className="border border-slate-300 py-2">View Full Data</th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr>
              <td colSpan={1} className="border border-slate-300 text-center py-2">
                {data?.touchPoints[0].touchPoint}
              </td>
              <td colSpan={3} className="text-center py-2 border border-slate-300">
                {/* <div className="flex items-center justify-evenly">
                  {data?.touchPoints[0].marketSites?.map(
                    (value: string, index: number) => (
                      <div
                        className={index === 0 ? "text-center p-2" : "border-l text-center p-2"}
                        key={index}
                      >
                        {value}
                      </div>
                    )
                  )}
                </div> */}
                {selectedMarketSite}
                
              </td>
              
              <td
                colSpan={1}
                onClick={handleOpen}
                className="border border-slate-300 text-[#1297E2] cursor-pointer hover:text-blue-700 text-center py-2"
              >
                1000000
              </td>
              <td
                colSpan={1}
                onClick={handleOpen}
                className="border border-slate-300 text-gray-400 cursor-pointer hover:text-gray-400 text-center py-2"
              >
                <i className="fi fi-ss-eye"></i>
              </td>
            </tr>
          </tbody>
        </table>
        {open && (
          <div className="py-4 font-bold text-[20px]">
            <h1 className="py-4">Data as per our trusted 3rd party sources</h1>
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
