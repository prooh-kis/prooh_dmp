import { useEffect, useState } from "react";
import { AudienceGenderWiseTable, AudienceTimezoneWiseTable } from "../../components/table"
import AudienceSelector from "./AudienceSelector";
import { useNavigate } from "react-router-dom";
import { VerticalStepper } from "./VerticalStepper";


interface AudienceGenderWiseTimezoneWiseDataProps {
    marketSite: String;
    id: string;
    setId: string;
    dataCheckStatus: any;
    setDataCheckStatus: Function;
}

export const AudienceGenderWiseTimezoneWiseData: React.FC<AudienceGenderWiseTimezoneWiseDataProps> = ({
    marketSite, id, setId, dataCheckStatus, setDataCheckStatus
}) => {


    const [step, setStep] = useState<any>(0);

    const navigate = useNavigate();
    const [audienceCategory, setAudienceCategory] = useState("Working Professionals-A")
    const [audiencePercent, setAudiencePercent] = useState(0.0)

    useEffect(() => {
        navigate(`/research/${id}`)
    }, [navigate, id])

    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3 bg-[#ffffff]">
                {/* <AudienceSelector id={id} audienceCategory={audienceCategory} setAudienceCategory={setAudienceCategory}
                    setAudiencePercent={setAudiencePercent} /> */}
                <VerticalStepper
                    step={step}
                    setStep={setStep}
                    id={id}
                    audienceCategory={audienceCategory}
                    setAudienceCategory={setAudienceCategory}
                    setAudiencePercent={setAudiencePercent}
                />
            </div>

            <div className="col-span-9 flex flex-col gap-10">
                <AudienceGenderWiseTable marketSite={marketSite} audienceCategory={audienceCategory}
                    audiencePercent={audiencePercent} id={id} setId={setId} dataCheckStatus={dataCheckStatus}
                    setDataCheckStatus={setDataCheckStatus} />
                {dataCheckStatus["Gender Wise Data"][audienceCategory] && <AudienceTimezoneWiseTable marketSite={marketSite} audienceCategory={audienceCategory}
                    audiencePercent={audiencePercent} id={id} setId={setId} dataCheckStatus={dataCheckStatus}
                    setDataCheckStatus={setDataCheckStatus} />}
            </div>
        </div>
    )
}