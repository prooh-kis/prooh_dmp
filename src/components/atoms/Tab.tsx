import React from 'react';

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
                if (dataCheckStatus["Audience Type Data"]) {
                    return true
                }
                else {
                    false
                }
            }
                break
            case 3: {
                for (const genderData of Object.values(dataCheckStatus["Gender Wise Data"])) {
                    if (!genderData) {
                        return false
                    }
                }

                for (const timezoneData of Object.values(dataCheckStatus["Timezone Wise Data"])) {
                    if (!timezoneData) {
                        return false
                    }
                }

                if (Object.values(dataCheckStatus["Gender Wise Data"]).length == 0)
                    return false
                else
                    return true
            }
                break

            case 4: {
                if (dataCheckStatus["Impact Factor Data"]) {
                    return true
                }
                else {
                    false
                }
            }
                break
        }
    }

    const showTick = checkTickStatus();
    return (
        <div
            className={`flex gap-4 items-center p-2 cursor-pointer ${label === "Footfall Data" && isActive ? "border-b-2 border-black font-bold" : index < currentIndex && !showTick ? "border-b-2 border-gray-200" : showTick ? "border-b-2 border-[#129BFF50]" : !isActive ? 'border-b-2 border-red-100 font-normal' : 'border-b-2 border-red-500 text-red-500 font-bold'}`}
            onClick={onClick}
        >
            <span className="text-sm">{label}</span>
            <div className="flex items-center">
                {/* {label == "Footfall Data" || showTick ?
                    <span className={`${label == "Footfall Data" ? "text-gray-500": "text-[#129BFF]"} text-sm font-bold`}>✔</span>
                    : <span className="text-red-500 text-sm font-black">✕</span>} */}
                {label == "Footfall Data" || showTick ?
                    <i className={`fi fi-br-check ${label == "Footfall Data" ? "text-gray-500": "text-[#129BFF]"} flex items-center text-[12px] font-bold`}></i>
                    : <i className={`fi fi-br-cross-small text-red-500 flex items-center text-[16px] font-bold`}></i>
                }


            </div>
        </div>
    );
};
