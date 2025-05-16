import React, { useEffect, useState } from 'react';
import { Tab } from '../../components/atoms/Tab';
import { Footer } from '../../components/atoms/Footer';
import { FootfallDataSourceWise } from '../../components/table/FootfallDataSourceWise';
import { AudiencePercentTable } from '../../components/table';
import { ImpactFactorTable } from '../../components/table/ImpactFactorTable';
import HeaderIcon from '../../assets/icons/header-icon.svg'
import { AudienceGenderWiseTimezoneWiseData } from '../../components/layouts/AudienceGenderWiseTimezoneWiseData';

const Dashboard: React.FC = () => {
    const tabs = [
        { label: 'Footfall Data' },
        { label: 'Audience Type Data' },
        { label: 'Gender Wise Data' },
        { label: 'Impact Factor Data' },
    ];

    const [dataCheckStatus, setDataCheckStatus] = useState({
        "Audience Type Data": false,
        "Gender Wise Data": {},
        "Timezone Wise Data": {},
        "Impact Factor Data": false
    })
    const [currentStep, setCurrentStep] = useState(1)
    const [id, setId] = useState("")


    useEffect(() => {
        const currentUrl = window.location.href;
        setId(currentUrl.split("/").pop() || "")
    }, [])

    const handleTabClick = (index: number) => {
        switch (index) {
            case 0: setCurrentStep(index + 1);
                break
            case 1: setCurrentStep(index + 1);
                break
            case 2: {
                if (dataCheckStatus["Audience Type Data"]) {
                    setCurrentStep(index + 1)
                }
                else {
                    alert("Lock the Audience Percent Data First")
                }
            }
                break
            case 3: {
                var checkStatus = 0
                for (const genderData of Object.values(dataCheckStatus["Gender Wise Data"])) {
                    if (!genderData) {
                        checkStatus = 1
                    }
                }

                for (const timezoneData of Object.values(dataCheckStatus["Timezone Wise Data"])) {
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
    }]

    return (
        <div className="bg-gray-100">
            <div className='bg-[#ffffff] px-6 pt-2'>
                <div className='flex flex-row gap-2 mt-2 pb-2'>
                    <h2 className="text-[20px] font-medium">DLF CyberHub Gurugram, Haryana</h2>
                    <img src={HeaderIcon} />
                    <h3 className="text-[12px] font-medium text-[#6F7F8E] flex items-center justify-center cursor-pointer">View Images</h3>
                </div>

                <div className='flex flex-row justify-between items-center'>
                    <div className="flex">
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
                    <div className='flex gap-4 mr-4'>
                        {colorData.map((singleData, index) => (
                            <div key={index} className='flex gap-2 justify-between items-center'>
                                <div className={`h-3 w-3 bg-[${singleData.color}] rounded-full`} />
                                <h1 className='flex justify-between items-center'>{singleData.title}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='p-4'>
                <StepComponent
                    marketSite={"CyberCity Gurgaon"}
                    id={id}
                    setId={setId}
                    dataCheckStatus={dataCheckStatus}
                    setDataCheckStatus={setDataCheckStatus}
                />
            </div>

            <Footer currentStep={currentStep} setCurrentStep={setCurrentStep} dataCheckStatus={dataCheckStatus} />
        </div>
    );
};

export { Dashboard };
