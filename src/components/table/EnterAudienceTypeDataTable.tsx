import React from "react";

export const EnterAudienceTypeDataTable = ({
  audienceTypeWiseData,
  setAudienceTypeWiseData,
  currentAudienceType,
}: any) => {
  const ss = 1000000;
  console.log("audienceTypeWiseData : ", audienceTypeWiseData);

  const handleData = (gender: string, value: any) => {
    const ddd = audienceTypeWiseData?.map((d: any, i: number) => {
      if (i === currentAudienceType) {
        return {
          ...d,
          genderWiseData: d?.genderWiseData?.map((d1: any, index: number) => {
            if (d1?.gender == gender) {
              d1.weight = value;
              return d1;
            } else {
              d1.weight = 100 - Number(value);
              return d1;
            }
          }),
        };
      } else return d;
    });
    setAudienceTypeWiseData(ddd);
  };
  return (
    <table className="border-collapse w-full text-[14px]">
      <thead>
        <tr className="text-[#FFFFFF] bg-[#1297E2] ">
          <th className="border border-slate-300 py-2" colSpan={3}>
            Audience Sprit
          </th>
          <th className="border border-slate-300 py-2">
            Distribution Of Month
          </th>
          <th className="border border-slate-300 py-2">Total Days</th>
          <th className="border border-slate-300 py-2" colSpan={4}>
            Total Audience Weighage
          </th>
        </tr>
      </thead>
      <tbody className="w-full border border-1">
        <tr>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-blue-50">
            Type
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-blue-50">
            {"         " + "%" + "     "}
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-blue-50">
            Monthly Count
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-blue-50"></td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-blue-50"></td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-blue-50">
            Monthly
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-blue-50">
            Daily
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-blue-50">
            Daily Count
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-blue-50">
            Unique Impression/Month
          </td>
        </tr>
        <tr>
          <td
            rowSpan={3}
            className="border border-slate-300 text-[#1297E2] cursor-pointer text-center py-2 bg-blue-50"
          >
            Male
          </td>
          <td rowSpan={3} className="border border-slate-300 text-[#1297E2]">
            <input
              title=""
              placeholder="male"
              className="text-[#1297E2] cursor-pointer  text-center w-full h-100% bg-blue-200 py-4"
              value={
                audienceTypeWiseData?.[currentAudienceType]?.genderWiseData[0]
                  ?.weight ?? 0
              }
              onChange={(e) => {
                handleData("Male", e.target.value);
              }}
            />
          </td>
          <td
            rowSpan={3}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            {ss *
              audienceTypeWiseData?.[currentAudienceType]?.genderWiseData[0]
                ?.weight *
              0.01}
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            WeekDay
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            22
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            70%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            3.1%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            545212
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 ">
            70
          </td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            Saturday
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            4
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            70%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            3.1%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            545212
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 ">
            70
          </td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            Sunday
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            4
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            70%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            3.1%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            545212
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 ">
            70
          </td>
        </tr>
        <tr>
          <td
            rowSpan={3}
            className="border border-slate-300 text-[#6C21C7] cursor-pointer  text-center py-2 bg-[#6C21C7]-50"
          >
            Female
          </td>
          <td rowSpan={3} className="">
            <input
              title=""
              placeholder="female"
              className="text-[#1297E2] cursor-pointer  text-center w-full h-100% bg-blue-200 py-4"
              value={
                audienceTypeWiseData?.[currentAudienceType]?.genderWiseData[1]
                  ?.weight ?? 0
              }
              onChange={(e) => {
                handleData("Female", e.target.value);
              }}
            />
          </td>
          <td
            rowSpan={3}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            {ss *
              audienceTypeWiseData?.[currentAudienceType]?.genderWiseData[1]
                ?.weight *
              0.01}
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            WeekDay
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            22
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            70%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            3.1%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            545212
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 ">
            70
          </td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            Saturday
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            4
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            70%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            3.1%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            545212
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 ">
            70
          </td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            Sunday
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            4
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            70%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            3.1%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            545212
          </td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 ">
            70
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EnterAudienceTypeDataTable;
