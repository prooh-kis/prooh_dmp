import React, { useState } from 'react';

interface GenderSelectorProps {
    genderData: {};
    genderType : string;
    setGenderType : Function;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
    genderData , genderType , setGenderType
}) => {
    return (
        <div className="flex mb-5">
            {Object.entries(genderData).map(([gender, percent], index) => {
                const isSelected = genderType === gender;

                return (
                    <div
                        key={gender}
                        className={`relative flex items-center px-3 py-2 border ${isSelected ? 'bg-green-600 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-200'}
                        ${index === 0 ? 'rounded-l-md' : 'rounded-r-md'} cursor-pointer transition`}
                        onClick={() => setGenderType(gender)}>
                        <span className="font-medium">{gender}</span>
                        <span className="ml-2 text-sm">{(percent as number)}%</span>

                        {/* Triangle */}
                        {isSelected && index === 0 && (
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-blue-500" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
