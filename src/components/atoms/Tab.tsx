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
    const checkTickStatus = () => {
        switch (index) {
            case 2: {
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
            className={`flex items-center border px-2 py-1 mr-2 rounded-t-lg cursor-pointer ${!isActive ? 'bg-white border-b-white' : 'bg-gray-100'}`}
            onClick={onClick}
        >
            <span className="mr-2 text-sm font-medium">{label}</span>
            {label !== "Footfall Data" && <div>
                {checkTickStatus() ?
                    <span className="text-green-600 text-sm">✔</span>
                    : <span className="text-red-500 text-sm">✕</span>}
            </div>}
        </div>
    );
};
