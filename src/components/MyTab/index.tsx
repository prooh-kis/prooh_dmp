import React from "react";
interface Data {
  label: String;
  icon: any;
  key: number;
}
interface Props {
  data: Data[];
  current: number;
  setCurrent: (value: number) => void;
}

export const MyTab = ({ data, current, setCurrent }: Props) => {
  return (
    <div className="flex text-[14px] font-bold w-full truncate">
      {data?.map(({ label, icon, key }: Data) => (
        <div
          onClick={() => setCurrent(key)}
          key={key}
          className="flex flex-col gap-2"
        >
          <div
            className={
              current === key
                ? "flex gap-1 text-[#1297E2] pr-6 items-center "
                : "flex gap-1 text-[#949494] pr-6 items-center "
            }
          >
            {icon} {label}
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
  );
};
