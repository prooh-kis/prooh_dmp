import { Select } from "antd";
import React from "react";

export const IconInputField = ({ value, onChange, placeholder, icon }: any) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <div className="absolute left-3 top-3">{icon}</div>
    </div>
  );
};
