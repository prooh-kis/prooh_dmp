import React from "react";

type SwitchProps = {
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
  onColor?: string;
  offColor?: string;
};

export const SwitchInput: React.FC<SwitchProps> = ({
  isEnabled,
  onToggle,
  onColor = "bg-[#348730]",
  offColor = "bg-gray-300",
}) => {
  return (
    <div className="relative inline-block w-8 h-4">
      <button
        type="button"
        title="switch"
        onClick={() => onToggle(!isEnabled)}
        className={`absolute inset-0 w-full h-full rounded-full transition-colors focus:outline-none ${
          isEnabled ? onColor : offColor
        }`}
      >
        <span className="sr-only">Toggle</span>
      </button>
      <span
        className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
          isEnabled ? 'left-4' : 'left-0.5'
        }`}
      />
    </div>
  );
};

export const SwitchInputCenter: React.FC<SwitchProps> = ({
  isEnabled,
  onToggle,
  onColor = "bg-[#348730]",
  offColor = "bg-gray-300",
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative inline-block w-11 h-5">
        <button
          type="button"
          title="switch"
          onClick={() => onToggle(!isEnabled)}
          className={`absolute inset-0 w-full h-full rounded-full transition-colors focus:outline-none ${
            isEnabled ? onColor : offColor
          }`}
        >
          <span className="sr-only">Toggle</span>
        </button>
        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
            isEnabled ? 'left-6' : 'left-0.5'
          }`}
        />
      </div>
    </div>
  );
};
