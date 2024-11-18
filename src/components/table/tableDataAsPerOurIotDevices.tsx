export const SingleRowTable = ({ data }: any) => {
  //   ccc = { "As Per Roadster Iot Device Data": 53452, Total: 392323 };
  return (
    <table className="border-collapse w-full text-[14px]">
      <thead>
        <tr className="text-[#1297E2]  bg-[#EDF8FF] ">
          {Object.keys(data)?.map((value: string, index: number) =>
            value !== "Total" ? (
              <th className="border border-slate-300 py-2" key={index}>
                {value}
              </th>
            ) : (
              <th
                className="border border-slate-300 py-2 bg-[#1297E2] text-[#FFFFFF]"
                key={index}
              >
                {value}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="w-full border border-1">
        <tr className="text-[#0E212E]">
          {Object.keys(data)?.map((value: string, index: number) => (
            <td
              className="border border-slate-300 text-center py-2"
              key={index}
            >
              {data[value]}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
