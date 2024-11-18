import React from "react";

export const EnterAudienceTypeDataTable = () => {
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
            Total Audience Weightage
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
          <td
            rowSpan={3}
            className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 "
          >
            80%
          </td>
          <td
            rowSpan={3}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            120000
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
            Sunday
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
          <td
            rowSpan={3}
            className="border border-slate-300 text-[#6C21C7] cursor-pointer  text-center py-2 bg-[#6C21C7]-50"
          >
            Female
          </td>
          <td
            rowSpan={3}
            className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 "
          >
            20%
          </td>
          <td
            rowSpan={3}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            141241
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
            Sunday
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
      </tbody>
    </table>
  );
};

export default EnterAudienceTypeDataTable;
