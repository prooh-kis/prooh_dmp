import React from 'react';

interface GenderSelectorProps {
    genderData: {};
    genderType: string;
    genderTabClick: Function;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
    genderData, genderType, genderTabClick
}) => {
    return (
        <div className="flex mb-5">
            {Object.entries(genderData).map(([gender, percent], index) => {
                return (
                    <div
                        key={gender}
                        className={`relative flex items-center px-3 py-2 border ${(genderType === gender) ? 'bg-green-600 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-200'}
                        ${index === 0 ? 'rounded-l-md' : 'rounded-r-md'} cursor-pointer transition`}
                        onClick={() => genderTabClick(gender)}>
                        <span className="font-medium">{gender}</span>
                        <span className="ml-2 text-sm">{(percent as number).toFixed(0)}%</span>
                    </div>
                );
            })}
        </div>
    );
};
