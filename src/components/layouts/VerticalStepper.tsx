import { getAudienceTypePercentForGenderWiseTab } from "../../actions/audienceAction";
import { Tooltip } from "antd";
import { GENDER_WISE_DATA_STATUS, TIMEZONE_WISE_DATA_STATUS } from "../../constants/audienceConstant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface StepSliderHomePageProps {
  audienceCategoryStep: number;
  setAudienceCategoryStep?: any;
  id?: any;
  dataCheckStatus?: any;
  setAudienceCategory?: any;
  setAudiencePercent?: any;
  audienceCategory?: any;
}

export const VerticalStepper = ({ id, setAudienceCategoryStep, audienceCategoryStep, dataCheckStatus, setAudienceCategory, setAudiencePercent, audienceCategory }: StepSliderHomePageProps) => {

  const dispatch = useDispatch<any>();

  const [audienceTypes, setAudienceTypes] = useState([]);

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
  }, [dispatch, id]);

  useEffect(() => {
    var count = 0
    for (const audienceCategory of Object.keys(dataCheckStatus[GENDER_WISE_DATA_STATUS])) {
      count++;
      if (count === audienceCategoryStep+1) {
        setAudienceCategory(audienceCategory)
        break;
      }
    }
  }, [audienceCategoryStep, setAudienceCategory])

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

  }, [audienceTypePercentSuccess, audienceTypePercentError, audienceTypePercent, setAudienceCategory, setAudiencePercent])

  return (
    <div className="w-full h-full p-6">
      <div className="flex flex-col items-left relative">
        {/* Steps */}
        {Object.entries(audienceTypes).map(([audienceType, percent], i) => (
          <div key={i} className="grid grid-cols-6 flex items-center cursor-pointer gap-4"
            onClick={() => {
              setAudienceCategory(audienceType);
              setAudiencePercent(percent);
              setAudienceCategoryStep(i)
            }}>
            <div className="col-span-1 relative flex flex-col items-center z-10">
              {/* Line segment before the circle (if not the first step) */}
              {i > 0 && (
                <div className={`w-px ${i <= audienceCategoryStep ? "bg-primaryButton" : "bg-gray-300"}`} style={{ height: "24px" }} />
              )}

              {/* Step circle */}
              <div
                className={`${i == audienceCategoryStep ? "w-8 h-8" : "w-6 h-6 "} rounded-full flex items-center justify-center 
                  ${i <= audienceCategoryStep ? 'bg-primaryButton' : 'bg-gray-200'}`}>
                {(dataCheckStatus[GENDER_WISE_DATA_STATUS][audienceType] && dataCheckStatus[TIMEZONE_WISE_DATA_STATUS][audienceType]) ? (
                  <i className="fi fi-br-check text-white text-[12px]" />
                ) : (
                  <span className={`text-[12px]  ${i === audienceCategoryStep ? 'text-white font-bold' : i < audienceCategoryStep ?
                    'text-white font-semibold' : 'text-gray-500 font-semibold'}`}>
                    {i + 1}
                  </span>
                )}

              </div>
            </div>
            {/* Step label */}

            <div className="col-span-5">
              {i !== 0 && (
                <div className={`w-px ${i <= audienceCategoryStep ? "" : ""}`} style={{ height: "24px" }} />
              )}
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-4">
                  <Tooltip title={audienceType}>
                    <h1 className={`truncate ${i === audienceCategoryStep ? 'text-primaryButton font-bold text-[14px] ' : 'text-gray-500 text-[12px]'}`}>
                      {audienceType}
                    </h1>
                  </Tooltip>
                </div>
                <div className="col-span-2 truncate">
                  <h1 className={`${i === audienceCategoryStep ? 'text-primaryButton font-bold text-[14px]' : 'text-gray-500 text-[12px]'}`}>
                    {(percent as number).toFixed(2)}%
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
