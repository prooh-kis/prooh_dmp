import React, { useEffect, useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAudienceTypePercentForGenderWiseTab } from '../../actions/audienceAction';

type AudienceSelectorProps = {
    id: string;
    audienceCategory: string;
    setAudienceCategory: Function;
    setAudiencePercent: Function;
};

const AudienceSelector: React.FC<AudienceSelectorProps> = ({ id, audienceCategory, setAudienceCategory,
    setAudiencePercent }) => {
    const dispatch = useDispatch<any>();
    const [audienceTypes, setAudienceTypes] = useState([])

    const getAudienceTypePercentForGenderWiseTabData = useSelector(
        (state: any) => state.getAudienceTypePercentForGenderWiseTab
    );
    const {
        loading: audienceTypePercentLoading,
        data: audienceTypePercent,
        success: audienceTypePercentSuccess,
        error: audienceTypePercentError
    } = getAudienceTypePercentForGenderWiseTabData;

    useEffect(() => {
        dispatch(getAudienceTypePercentForGenderWiseTab({ id: id }))
    }, [])

    useEffect(() => {
        if (audienceTypePercentError) {
            alert("Error Fetching Data : " + audienceTypePercentError)
        }

        if (audienceTypePercentSuccess) {
            setAudienceTypes(audienceTypePercent)
            const [audienceCategory, percent] = Object.entries(audienceTypePercent)[0];
            setAudienceCategory(audienceCategory)
            setAudiencePercent(percent)
        }

    }, [audienceTypePercentSuccess, audienceTypePercentError])

    return (
        <div className="p-4 w-96">
            <h2 className="text-lg font-semibold mb-4">Select Audience Type</h2>
            <div className="flex flex-col relative">

                {Object.entries(audienceTypes).map(([audienceType, percent], index) => {
                    const isSelected = audienceCategory === audienceType;
                    const isLast = index === Object.entries(audienceTypes).length - 1;

                    return (
                        <div key={audienceType} className="relative flex gap-3 pl-[26px]">
                            {/* Vertical Line */}
                            {!isLast && (
                                <div className="absolute left-[11px] top-6 bottom-0 w-px bg-gray-300 z-0" />
                            )}

                            {/* Icon */}
                            <div
                                className="absolute left-0 top-[4px] z-10"
                                onClick={() => {
                                    setAudienceCategory(audienceType);
                                    setAudiencePercent(percent);
                                }}
                            >
                                {isSelected ? (
                                    <CheckCircle className="text-blue-500 w-5 h-5 cursor-pointer" />
                                ) : (
                                    <Circle className="text-gray-300 w-5 h-5 cursor-pointer" />
                                )}
                            </div>

                            {/* Label and Percent */}
                            <div
                                className="flex justify-between items-center w-full py-2 cursor-pointer"
                                onClick={() => {
                                    setAudienceCategory(audienceType);
                                    setAudiencePercent(percent);
                                }}
                            >
                                <span className={`${isSelected ? "text-blue-600 font-medium" : "text-gray-700"} mb-2`}>
                                    {audienceType}
                                </span>
                                <span className="text-gray-700 text-sm">{(percent as number).toFixed(2)}%</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AudienceSelector;
