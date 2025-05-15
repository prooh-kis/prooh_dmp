import React from 'react';

type FooterProps = {
    currentStep: number;
    setCurrentStep: Function;
    dataCheckStatus: any;
};

export const Footer: React.FC<FooterProps> = ({ currentStep, setCurrentStep, dataCheckStatus }) => {
    const increaseStepVal = () => {
        switch (currentStep) {
            case 1: setCurrentStep(currentStep + 1);
                break
            case 2: {
                if (dataCheckStatus["Audience Type Data"]) {
                    setCurrentStep(currentStep + 1)
                }
                else {
                    alert("Lock the Audience Percent Data First")
                }
            }
                break
            case 3: {
                var checkStatus = 0
                for (const genderData of Object.values(dataCheckStatus["Gender Wise Data"])) {
                    if (!genderData) {
                        checkStatus = 1
                    }
                }

                for (const timezoneData of Object.values(dataCheckStatus["Timezone Wise Data"])) {
                    if (!timezoneData) {
                        checkStatus = 1
                    }
                }

                if (checkStatus) {
                    alert("Lock the Gender And Timezone Data for All Audience Types First")
                }
                else
                    setCurrentStep(currentStep + 1)
            }
                break

            default: setCurrentStep(4)
                break
        }
    }

    return (
        <div className="flex justify-end items-center px-4 py-4 border-t bg-white mt-4 gap-4">
            {currentStep === 3 && <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
                Reset All
            </button>}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={() => increaseStepVal()}>
                {currentStep === 1 ? "Continue" : "Save And Continue"}
            </button>
        </div>
    );
};
