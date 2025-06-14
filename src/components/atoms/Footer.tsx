import { message } from 'antd';
import { GENDER_WISE_DATA_STATUS, PERCENT_DATA_STATUS, TIMEZONE_WISE_DATA_STATUS } from '../../constants/audienceConstant';
import React, { useState } from 'react';
import { SuccessMessagePopup } from '../../components/Popup/SuccessPopup';
import { useSelector } from 'react-redux';

type FooterProps = {
    audienceStep: any;
    setAudienceStep: Function;
    currentStep: number;
    setCurrentStep: Function;
    dataCheckStatus: any;
    lockStatus: boolean;
};

export const Footer: React.FC<FooterProps> = ({ currentStep, setCurrentStep, dataCheckStatus, audienceStep, setAudienceStep, lockStatus }) => {
    
    const [successMsg, setSuccessMsg] = useState<boolean>(false);

    const auth = useSelector((state: any) => state.auth);
    const { userInfo } = auth;
    
    const increaseStepVal = () => {
        switch (currentStep) {
            case 1: {
                setCurrentStep(currentStep + 1);
            }
                break
            case 2: {
                if (dataCheckStatus[PERCENT_DATA_STATUS]) {
                    setCurrentStep(currentStep + 1)
                }
                else {
                    alert("Lock the Audience Percent Data First")
                }
            }
                break
            case 3: {
                if (audienceStep <= 9) {
                    setAudienceStep(audienceStep + 1)
                    break
                }
                var checkStatus = 0
                for (const genderData of Object.values(dataCheckStatus[GENDER_WISE_DATA_STATUS])) {
                    if (!genderData) {
                        checkStatus = 1
                    }
                }

                for (const timezoneData of Object.values(dataCheckStatus[TIMEZONE_WISE_DATA_STATUS])) {
                    if (!timezoneData) {
                        checkStatus = 1
                    }
                }

                if (checkStatus === 0) {
                    alert("Lock the Gender And Timezone Data for All Audience Types First")
                }
                else
                    setCurrentStep(currentStep + 1)
            }
                break

            case 4: {
                message.info("Your response has been saved...");
                setSuccessMsg(true);

            }
                break
            default: setCurrentStep(4)
                break
        }
    }

    return (
        <div className='w-full flex justify-end items-center gap-4 text-[12px]'>
            <SuccessMessagePopup open={successMsg} onClose={() => setSuccessMsg(false)} userInfo={userInfo} />
            <div className=''>
                {currentStep === 3 && <button type="button" className="border border-blue-500 text-blue-500 p-2 rounded-md">
                    Reset All
                </button>}
            </div>
            <div className='mr-8'>
                <button type="button" className="bg-blue-600 text-white p-2 rounded-md" onClick={() => increaseStepVal()}>
                    {currentStep === 1 ? "Continue" : "Save And Continue"}
                </button>
            </div>
        </div>
    );
};
