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
            className={`flex items-center border px-2 py-1 mr-2 rounded-t-lg cursor-pointer ${!isActive ? 'bg-white border-b-white' : 'bg-gray-100'}`}
            onClick={onClick}
        >
            <span className="mr-2 text-sm font-medium">{label}</span>
            {label !== "Footfall Data" && <div>
                {showTick ?
                    <span className="text-green-600 text-sm">✔</span>
                    : <span className="text-red-500 text-sm">✕</span>}
            </div>}
        </div>
    );
};
