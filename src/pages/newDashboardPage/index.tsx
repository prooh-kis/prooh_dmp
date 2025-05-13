import React, { useState } from 'react';
import { Tab } from '../../components/atoms/Tab';
import { Footer } from '../../components/atoms/Footer';
import { FootfallDataSourceWise } from '../../components/table/FootfallDataSourceWise';
import { AudiencePercentTable } from '../../components/table';
import { ImpactFactorTable } from '../../components/table/ImpactFactorTable';
import { AudienceGenderWiseTimezoneWiseData } from '../../components/layouts/AudienceGenderWiseTimezoneWiseData';

const Dashboard: React.FC = () => {
    const tabs = [
        { label: 'Footfall Data' },
        { label: 'Audience Type Data (0%)' },
        { label: 'Gender Wise Data (0%)' },
        { label: 'Impact Factor Data (0%)' },
    ];

    const [currentStep, setCurrentStep] = useState(1)
    const [id, setId] = useState("")

    const handleTabClick = (index: number) => {
        setCurrentStep(index + 1)
    };

    const stepComponents: Record<number, React.FC<any>> = {
        1: FootfallDataSourceWise,
        2: AudiencePercentTable,
        3: AudienceGenderWiseTimezoneWiseData,
        4: ImpactFactorTable
    };
    const StepComponent = stepComponents[currentStep] || null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-lg font-semibold mb-2">DLF CyberHub Gurugram, Haryana</h2>

            {/* Tabs */}
            <div className="flex border-b pb-2 mb-4">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        isActive={index === currentStep - 1}
                        onClick={() => handleTabClick(index)}
                    />
                ))}
            </div>

            <StepComponent
                marketSite={"CyberCity Gurgaon"}
                id={id}
                setId={setId}
            />

            {/* Footer */}
            <Footer currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
    );
};

export { Dashboard };
