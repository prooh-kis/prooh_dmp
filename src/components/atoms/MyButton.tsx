import React from "react";

export const MyButton = ({
  width = "full",
  height = "61px",
  size = "16px",
  color = "#FFFFFF",
  bgColor = "#1297E2",
  title = "Save",
  rounded = "md",
  onClick,
  disabled,
}: any) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`border border-2  h-[${height}] w-[${width}]  hover:text-[${bgColor}] text-[${color}] hover:bg-[${color}]  bg-[${bgColor}] text-[${size}] font-medium rounded-${rounded} px-5 py-2.5`}
    >
      {title}
    </button>
  );
};
