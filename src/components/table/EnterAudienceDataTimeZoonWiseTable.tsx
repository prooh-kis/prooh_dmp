import React from 'react'

export const EnterAudienceDataTimeZoonWiseTable = () => {
  return (
    <table className="border-collapse w-full text-[12px]">
      <thead>
        <tr className="text-[#FFFFFF] bg-[#1297E2]">
          <th className="border border-slate-300 py-2">Audience Type</th>
          <th className="border border-slate-300 py-2">
            Distribution of the Month
          </th>
          <th className="border border-slate-300 py-2">
            Per Day Audience Weighage
          </th>{" "}
          <th className="border border-slate-300 py-2">
            Per Day Audience count
          </th>{" "}
          <th className="border border-slate-300 py-2">Time Zones</th>{" "}
          <th className="border border-slate-300 py-2">% share of visits</th>{" "}
          <th className="border border-slate-300 py-2">Audience %</th>{" "}
          <th className="border border-slate-300 py-2">
            Total Unique impression count per time Zone
          </th>
          <th className="border border-slate-300 py-2 bg-[#E2FFD4] text-black">
            Total Unique per spot ( 10secs/3 mins)
          </th>
          <th className="border border-slate-300 py-2" colSpan={2}>
            Impressions per spot over a 10 days campaign
          </th>
        </tr>
      </thead>
      <tbody className="w-full border border-1">
        <tr>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-gray-100"></td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-gray-100"></td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-gray-100"></td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-gray-100"></td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-gray-100"></td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-gray-100"></td>
          <td className="border border-slate-300 text-[#1297E2] cursor-pointer  text-center py-2 bg-gray-100"></td>
          <td className="border border-slate-300 text-[#0E212E]] cursor-pointer  text-center py-2 bg-gray-100"></td>
          <td className="border border-slate-300 text-[#0E212E] cursor-pointer  text-center py-2 bg-gray-100">
            Unique
          </td>
          <td className="border border-slate-300 text-[#0E212E] cursor-pointer  text-center py-2 bg-gray-100">
            Total
          </td>
        </tr>
        <tr>
          <td
            rowSpan={12}
            className="border border-slate-300 text-[#1297E2] cursor-pointer text-center py-2 bg-blue-50 "
          >
            Male
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            WeekDay
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            3.18%
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            {/* input */}
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T2
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T3
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T4
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            Saturday
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            3.18%
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            {/* input */}
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            Sunday
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            3.18%
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            {/* input */}
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td
            rowSpan={12}
            className="border border-slate-300 text-center py-2 bg-blue-50 "
          >
            Female
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            WeekDay
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            3.18%
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            {/* input */}
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T2
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T3
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T4
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            Saturday
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            3.18%
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            {/* input */}
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            Sunday
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            3.18%
          </td>
          <td
            rowSpan={4}
            className="border border-slate-300  cursor-pointer  text-center py-2 "
          >
            {/* input */}
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
        <tr>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            T1
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            60%
          </td>
          <td className="border border-slate-300  cursor-pointer  text-center py-2 ">
            1.9%
          </td>
          <td className="border border-slate-300  text-center py-2 ">
            22909.1
          </td>
          <td className="border border-slate-300  text-center py-2 ">15•91</td>
          <td className="border border-slate-300  text-center py-2 ">54.1</td>
          <td className="border border-slate-300  text-center py-2 ">159.1</td>
        </tr>
      </tbody>
    </table>
  );
}

