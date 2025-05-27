import React, { useState } from "react";

interface CheckboxProps {
  label?: any;
  checked?: boolean;
  textSize?: string;
  color?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;  // Added disabled prop to be more specific
}

export const CheckboxInput: React.FC<CheckboxProps> = ({ disabled, color, textSize, label, checked, onChange }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <label className="grid grid-cols-4 gap-2 flex items-center space-x-2 cursor-pointer truncate">
      <input
        type="checkbox"
        className={`col-span-1 form-checkbox h-4 w-4 ${disabled ? 'accent-[#3A9868]' : 'accent-[#3A9868]'}`}
        checked={checked !== undefined ? checked : false}
        disabled={disabled}
        onChange={handleCheckboxChange}
      />
      <span className={`col-span-3 text-[${color ? color : "#21394F"}] text-[${textSize ? textSize : "14px"}] truncate`}>
        {label}
      </span>
    </label>
  );
};
