import React, { useEffect, useState } from 'react';
import { Tab } from '../../components/atoms/Tab';
import { Footer } from '../../components/atoms/Footer';
import { FootfallDataSourceWise } from '../../components/table/FootfallDataSourceWise';
import { AudiencePercentTable } from '../../components/table';
import { ImpactFactorTable } from '../../components/table/ImpactFactorTable';
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

    return (
        <div className="bg-gray-100">
            <h2 className="text-lg font-semibold mb-2">DLF CyberHub Gurugram, Haryana</h2>

            {/* Tabs */}
            <div className="flex border-b pb-2 mb-4">
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

            <div className='bg-gray-100'>
                <StepComponent
                    marketSite={"CyberCity Gurgaon"}
                    id={id}
                    setId={setId}
                    dataCheckStatus={dataCheckStatus}
                    setDataCheckStatus={setDataCheckStatus}
                />
            </div>

            {/* Footer */}
            <Footer currentStep={currentStep} setCurrentStep={setCurrentStep} dataCheckStatus={dataCheckStatus} />
        </div>
    );
};

export { Dashboard };
