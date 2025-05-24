import { getAudienceTypePercentForGenderWiseTab } from "../../actions/audienceAction";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface StepSliderHomePageProps {
  step: number;
  setStep?: any;
  id?: any;
  setAudienceCategory?: any;
  setAudiencePercent?: any;
  audienceCategory?: any;
}


export const VerticalStepper = ({ id, setStep, step, setAudienceCategory, setAudiencePercent, audienceCategory }: StepSliderHomePageProps) => {

  const dispatch = useDispatch<any>();

  const [steps, setSteps] = useState(1);
  const [stepLabels, setStepLabels] = useState<string[]>([]);

  const handleStepClick = (value: number) => {
    setStep(value);
  };

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
  }, [dispatch, id]);

  useEffect(() => {
      if (audienceTypePercentError) {
          alert("Error Fetching Data : " + audienceTypePercentError)
      }

      if (audienceTypePercentSuccess) {
          setAudienceTypes(audienceTypePercent)
          setSteps(Object.keys(audienceTypePercent).length);
          setStepLabels(Object.keys(audienceTypePercent) || []);
          const [audienceCategory, percent] = Object.entries(audienceTypePercent)[0];
          setAudienceCategory(audienceCategory)
          setAudiencePercent(percent)
      }

  }, [audienceTypePercentSuccess, audienceTypePercentError, audienceTypePercent, setAudienceCategory, setAudiencePercent])

  return (
    <div className="w-full h-full p-6">
      <div className="flex flex-col items-center relative">
        {/* Steps */}
        {[...Array(steps)].map((_, i) => (
          <div key={i} className="grid grid-cols-6 flex items-center gap-4">
            <div
              onClick={() => handleStepClick(i)}
              className="col-span-1 relative flex flex-col items-center cursor-pointer z-10"
            >

              {/* Line segment before the circle (if not the first step) */}
              {i > 0 && (
                <div className={`w-px ${i <= step ? "bg-primaryButton" : "bg-gray-300"}`} style={{ height: "24px" }} />
              )}

              {/* Step circle */}
              <div
                className={`${i == step ? "w-8 h-8" : "w-6 h-6 "} rounded-full flex items-center justify-center 
                  ${i <= step ? 'bg-primaryButton' : 'bg-gray-200'}`}
              >
                  {i < step ? (
                    <i className="fi fi-br-check text-white text-[12px]" />
                  ) : (
                    <span className={`text-[12px]  ${i === step ? 'text-white font-bold' : 'text-gray-500 font-semibold'}`}>
                      {i + 1}
                    </span>
                  )}
          
              </div>
            </div>
            {/* Step label */}

            <div className="col-span-5">
            {i !== 0 && (
              <div className={`w-px ${i <= step ? "" : ""}`} style={{ height: "24px" }} />
            )}
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-4">
                  <Tooltip title={stepLabels[i]}>
                    <h1 className={`truncate ${i === step ? 'text-primaryButton font-bold text-[14px] ' : 'text-gray-500 text-[12px]'}`}>
                      {stepLabels[i]}
                    </h1>
                  </Tooltip>
                </div>
                <div className="col-span-2 truncate">
                  <h1 className={`${i === step ? 'text-primaryButton font-bold text-[14px]' : 'text-gray-500 text-[12px]'}`}>
                      {audienceTypePercent?.[stepLabels[i]]?.toFixed(1)}%
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
