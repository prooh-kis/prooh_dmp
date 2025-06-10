import React from 'react';
import {
    GENDER_WISE_DATA_STATUS, TIMEZONE_WISE_DATA_STATUS,
    PERCENT_DATA_STATUS, IMPACT_FACTOR_DATA_STATUS
} from "../../constants/audienceConstant";

interface TabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    index: number;
    currentIndex: number;
    dataCheckStatus: any;
}

export const Tab: React.FC<TabProps> = ({ label, isActive, onClick, index, currentIndex, dataCheckStatus }) => {
    console.log("index", index)
    const checkTickStatus = () => {
        console.log(index);
        switch (index) {
            case 1: {
                return true;
            }
            case 2: {
                console.log(dataCheckStatus[PERCENT_DATA_STATUS]);
                if (dataCheckStatus[PERCENT_DATA_STATUS]) {
                    return true
                }
                else {
                    false
                }
            }
                break
            case 3: {
                for (const genderData of Object.values(dataCheckStatus[GENDER_WISE_DATA_STATUS])) {
                    if (!genderData) {
                        return false
                    }
                }

                for (const timezoneData of Object.values(dataCheckStatus[TIMEZONE_WISE_DATA_STATUS])) {
                    if (!timezoneData) {
                        return false
                    }
                }

                if (Object.values(dataCheckStatus[GENDER_WISE_DATA_STATUS] || {}).length == 0)
                    return false
                else
                    return true
            }
                break

            case 4: {
                if (dataCheckStatus[IMPACT_FACTOR_DATA_STATUS]) {
                    return true
                }
                else {
                    false
                }
            }
                break
        }
    }
    return (
        <div
            className={`flex gap-4 items-center p-2 cursor-pointer 
                ${label === "Footfall Data" && isActive ? 
                    "border-b-2 border-black font-bold"
                : index < currentIndex && !checkTickStatus() ? 
                    "border-b-2 border-red-500"
                : checkTickStatus() ?
                    "border-b-2 border-[#129BFF50]"
                : isActive ? 'border-b-2 border-red-100 font-normal'
                : 'border-b-2 border-red-500 text-red-500 font-bold'}`}
            onClick={onClick}
        >
            <span className="text-sm truncate">{label}</span>
            <div className="flex items-center">
                {label !== "Footfall Data" && <div>
                    {checkTickStatus() ?
                        <span className="text-[#129BFF] text-sm">✔</span>
                        : <span className="text-red-500 text-sm">✕</span>}
                </div>}
            </div>
        </div>
    );
};
