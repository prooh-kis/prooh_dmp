import React, { useEffect, useRef, useState } from "react";
export const Loading = ({ grid = { cols: 1, rows: 3 }}: any) => {
  const generateColumnWidths = (cols: number) => {
    // Common column configurations
    const commonWidths: Record<number, string> = {
      1: 'w-full',
      2: 'w-1/2',
      3: 'w-1/3',
      4: 'w-1/4',
    };

    // Return common width if available, otherwise calculate
    if (commonWidths[cols]) {
      return Array(cols).fill(commonWidths[cols]);
    }
    
    // Fallback for other column counts
    const width = 100 / cols;
    return Array(cols).fill(`w-[${width}%]`);
  };

  return (
    <div className={`grid gap-1 w-full h-full py-1`}>
      {Array.from({ length: grid.rows })?.map((_, rowIndex) => {
        const columnWidths = generateColumnWidths(grid.cols);

        return (
          <div key={`row-${rowIndex}`} className={`grid grid-cols-${grid.cols} gap-1 w-full`}>
            {Array.from({ length: grid.cols })?.map((_, colIndex) => (
              <div
                key={`col-${colIndex}`}
                className={`p-1 animate-pulse bg-[#D7D7D7] h-10 w-full`}
              ></div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
