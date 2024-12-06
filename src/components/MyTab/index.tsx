import React from "react";
interface Data {
  label: String;
  icon: any;
  value: any;
  key: number;
}
interface Props {
  data: Data[];
  current: number;
  setCurrent: (value: number) => void;
}

export const MyTab = ({ data, current, setCurrent }: Props) => {
  return (
    // <div className="w-full overflow-x-auto no-scrollbar">
    <div className="w-full ">

      <div className="flex flex-wrap text-[14px] font-bold whitespace-nowrap">
        {data?.map(({ label, icon, value, key }: Data) => (
          <div
            onClick={() => setCurrent(key)}
            key={key}
            className="flex flex-col gap-2 py-2"
          >
            <div
              className={
                current === key
                  ? "flex gap-1 text-[#1297E2] pr-6 items-center "
                  : "flex gap-1 text-[#949494] pr-6 items-center "
              }
            >
              {icon} {label} {value ? `(${(value * 100).toFixed(0)}%)` : ""}
            </div>
            <div
              className={
                current === key
                  ? "border border-2 border-[#1297E2]"
                  : " border border-2border-[#949494]"
              }
            ></div>
          </div>
        ))}
      </div>
    </div>

  );
};
