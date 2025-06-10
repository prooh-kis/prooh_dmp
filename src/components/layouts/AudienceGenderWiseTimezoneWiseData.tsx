import { useEffect, useState } from "react";
import { AudienceGenderWiseTable, AudienceTimezoneWiseTable } from "../../components/table"
import { useNavigate } from "react-router-dom";
import { VerticalStepper } from "./VerticalStepper";
import { GENDER_WISE_DATA_STATUS } from "../../constants/audienceConstant";


interface AudienceGenderWiseTimezoneWiseDataProps {
    marketSite: string;
    id: string;
    setId: string;
    audienceCategoryStep: any;
    setAudienceCategoryStep: Function;
    dataCheckStatus: any;
    setDataCheckStatus: Function;
    avgDataBool: boolean;
    lockStatus: boolean;
    setLockStatus: Function;
}

export const AudienceGenderWiseTimezoneWiseData: React.FC<AudienceGenderWiseTimezoneWiseDataProps> = ({
    marketSite, id, setId, lockStatus, setLockStatus, audienceCategoryStep, setAudienceCategoryStep, dataCheckStatus, setDataCheckStatus, avgDataBool
}) => {

    const navigate = useNavigate();
    const [audienceCategory, setAudienceCategory] = useState("Working Professionals-A")
    const [audiencePercent, setAudiencePercent] = useState(0.0)

    useEffect(() => {
        if (id != null) {
            navigate(`/research/${id}`)
        }
    }, [navigate, id])

    return (
        <div className="flex-grow grid grid-cols-12 gap-2 overflow-hidden">
            <div className="col-span-3 bg-[#ffffff] overfow-hidden rounded-[8px] shadow-sm">
                <VerticalStepper
                    audienceCategoryStep={audienceCategoryStep}
                    setAudienceCategoryStep={setAudienceCategoryStep}
                    id={id}
                    dataCheckStatus={dataCheckStatus}
                    audienceCategory={audienceCategory}
                    setAudienceCategory={setAudienceCategory}
                    setAudiencePercent={setAudiencePercent}
                />
            </div>

            <div className="col-span-9 flex flex-col gap-2 overflow-hidden">
                <div className="flex-grow overflow-y-auto pr-2 rounded-[8px] shadow-sm bg-[#ffffff]">
                    <AudienceGenderWiseTable lockStatus={lockStatus} setLockStatus={setLockStatus} marketSite={marketSite} audienceCategory={audienceCategory}
                        audiencePercent={audiencePercent} id={id} setId={setId} dataCheckStatus={dataCheckStatus}
                        setDataCheckStatus={setDataCheckStatus} avgDataBool={avgDataBool} />
                </div>
                {dataCheckStatus?.[GENDER_WISE_DATA_STATUS]?.[audienceCategory] && (
                    <div className="rounded-[8px] shadow-sm bg-[#ffffff]">
                        <AudienceTimezoneWiseTable lockStatus={lockStatus} setLockStatus={setLockStatus} marketSite={marketSite} audienceCategory={audienceCategory}
                        // audiencePercent={audiencePercent} 
                        id={id} 
                        // setId={setId} 
                        dataCheckStatus={dataCheckStatus}
                        setDataCheckStatus={setDataCheckStatus} avgDataBool={avgDataBool} />
                    </div>
                )}
            </div>
        </div>
    )
}