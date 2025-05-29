import React, { useEffect, useState } from 'react';
import { Tab } from '../../components/atoms/Tab';
import { Footer } from '../../components/atoms/Footer';
import { FootfallDataSourceWise } from '../../components/table/FootfallDataSourceWise';
import { AudiencePercentTable } from '../../components/table';
import { ImpactFactorTable } from '../../components/table/ImpactFactorTable';
import HeaderIcon from '../../assets/icons/header-icon.svg'
import { AudienceGenderWiseTimezoneWiseData } from '../../components/layouts/AudienceGenderWiseTimezoneWiseData';
import { SwitchInputCenter } from '../../components/atoms/SwitchInput';
import { Tooltip } from 'antd';
import { GENDER_WISE_DATA_STATUS, IMPACT_FACTOR_DATA_STATUS, PERCENT_DATA_STATUS, TIMEZONE_WISE_DATA_STATUS } from '../../constants/audienceConstant';

const InputPage: React.FC = () => {
    const tabs = [
        { label: 'Footfall Data' },
        { label: 'Audience Type Data' },
        { label: 'Gender Wise Data' },
        { label: 'Impact Factor Data' },
    ];

    const [dataCheckStatus, setDataCheckStatus] = useState<any>({
        "percentDataStatus": false,
        "genderWiseDataStatus": {},
        "timezoneWiseDataStatus": {},
        "impactFactorDataStatus": false
    })
    const [currentStep, setCurrentStep] = useState(1)
    const [id, setId] = useState("")
    const [audienceCategoryStep, setAudienceCategoryStep] = useState<any>(0);
    const [avgDataBool, setAvgDataBool] = useState(false);
    const [toggleVisible, setToggleVisible] = useState(false);

    useEffect(() => {
        const currentUrl = window.location.href;
        setId(currentUrl.split("/").pop() || "research")
    }, [])

    const handleTabClick = (index: number) => {
        switch (index) {
            case 0: setCurrentStep(index + 1);
                break
            case 1: setCurrentStep(index + 1);
                break
            case 2: {
                if (dataCheckStatus.PERCENT_DATA_STATUS) {
                    setCurrentStep(index + 1)
                }
                else {
                    alert("Lock the Audience Percent Data First")
                }
            }
                break
            case 3: {
                var checkStatus = 0
                for (const genderData of Object.values(dataCheckStatus.GENDER_WISE_DATA_STATUS)) {
                    if (!genderData) {
                        checkStatus = 1
                    }
                }

                for (const timezoneData of Object.values(dataCheckStatus.TIMEZONE_WISE_DATA_STATUS)) {
                    if (!timezoneData) {
                        checkStatus = 1
                    }
                }

                if (checkStatus) {
                    alert("Lock the Gender And Timezone Data for All Audience Types First")
                }
                else
                    setCurrentStep(index + 1)
            }
                break
        }
    };

    const stepComponents: Record<number, React.FC<any>> = {
        1: FootfallDataSourceWise,
        2: AudiencePercentTable,
        3: AudienceGenderWiseTimezoneWiseData,
        4: ImpactFactorTable
    };
    const StepComponent = stepComponents[currentStep] || null;

    const colorData = [{
        title: "fixed data",
        color: "#000000"
    }, {
        title: "you can edit",
        color: "#FF5050"
    }, {
        title: "edited",
        color: "#129BFF"
    }]

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gray-100">
            <div className='bg-[#ffffff]'>
                <div className='flex flex-row gap-2 px-6 pt-2 mt-2 pb-2'>
                    <h2 className="text-[20px] font-medium">DLF CyberHub Gurugram, Haryana</h2>
                    <img src={HeaderIcon} alt="" />
                    <h3 className="text-[12px] font-medium text-[#6F7F8E] flex items-center justify-center cursor-pointer">View Images</h3>

                    {toggleVisible && <div className="ml-auto mr-4">
                        <Tooltip title={`${avgDataBool ? "Switch To View Your Last Input" : "Switch To View Avg Data"}`}>
                            <SwitchInputCenter
                                isEnabled={avgDataBool}
                                onToggle={setAvgDataBool}
                                onColor="bg-[#348730]"
                                offColor="bg-red-500" />
                        </Tooltip>
                    </div>}
                </div>

                <div className='px-6 pt-2 shadow-sm flex flex-row justify-between items-center'>
                    <div className="flex gap-4">
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.label}
                                isActive={index === currentStep - 1}
                                onClick={() => handleTabClick(index)}
                                index={index + 1}
                                currentIndex={currentStep}
                                dataCheckStatus={dataCheckStatus}
                            />
                        ))}
                    </div>
                    <div className='flex gap-4'>
                        {colorData.map((singleData, index) => (
                            <div key={index} className='grid grid-cols-4 gap-2'>
                                <div className={`col-span-1 mt-[2px] h-3 w-3 bg-[${singleData.color}] rounded-full`} />
                                <h1 className='col-span-3 text-[10px] truncate'>{singleData.title}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex-grow p-2'>
                <StepComponent
                    marketSite={"CyberCity Gurgaon"}
                    id={id}
                    setId={setId}
                    step={audienceCategoryStep}
                    setStep={setAudienceCategoryStep}
                    dataCheckStatus={dataCheckStatus}
                    setDataCheckStatus={setDataCheckStatus}
                    setToggleVisible={setToggleVisible}
                    avgDataBool={avgDataBool}
                    setAvgDataBool={setAvgDataBool}
                />
            </div>

            <div className="border-t bg-white py-2">
                <Footer currentStep={currentStep} setCurrentStep={setCurrentStep} dataCheckStatus={dataCheckStatus}
                    audienceStep={audienceCategoryStep} setAudienceStep={setAudienceCategoryStep} />
            </div>
        </div>
    );
};

export { InputPage };
