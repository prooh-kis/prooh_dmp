import React from 'react';

type FooterProps = {
    currentStep: number;
    setCurrentStep: Function;
};

export const Footer: React.FC<FooterProps> = ({ currentStep, setCurrentStep }) => {

    const increaseStepVal = () => {
        var step = currentStep + 1
        if (step > 4)
            step = 1
        setCurrentStep(step)
    }

    return (
        <div className="flex justify-end items-center px-4 py-4 border-t bg-white mt-4 gap-4">
            {currentStep != 1 && <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
                Reset All
            </button>}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={() => increaseStepVal()}>
                {currentStep === 1 ? "Continue" : "Save And Continue"}
            </button>
        </div>
    );
};
