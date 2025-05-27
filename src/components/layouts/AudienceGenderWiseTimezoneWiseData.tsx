import { useEffect, useState } from "react";
import { AudienceGenderWiseTable, AudienceTimezoneWiseTable } from "../../components/table"
import AudienceSelector from "./AudienceSelector";
import { useNavigate } from "react-router-dom";
import { VerticalStepper } from "./VerticalStepper";


interface AudienceGenderWiseTimezoneWiseDataProps {
    marketSite: String;
    id: string;
    setId: string;
    step: any;
    setStep: Function;
    dataCheckStatus: any;
    setDataCheckStatus: Function;
    avgDataBool: Boolean;
}

export const AudienceGenderWiseTimezoneWiseData: React.FC<AudienceGenderWiseTimezoneWiseDataProps> = ({
    marketSite, id, setId, dataCheckStatus, setDataCheckStatus, step, setStep , avgDataBool
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
            <div className="col-span-3 bg-[#ffffff] overfow-hidden">
                <VerticalStepper
                    step={step}
                    setStep={setStep}
                    id={id}
                    dataCheckStatus={dataCheckStatus}
                    audienceCategory={audienceCategory}
                    setAudienceCategory={setAudienceCategory}
                    setAudiencePercent={setAudiencePercent}
                />
            </div>

            <div className="col-span-9 flex flex-col overflow-hidden">
                <div className="flex-grow overflow-y-auto pr-2">
                    <AudienceGenderWiseTable marketSite={marketSite} audienceCategory={audienceCategory}
                        audiencePercent={audiencePercent} id={id} setId={setId} dataCheckStatus={dataCheckStatus}
                        setDataCheckStatus={setDataCheckStatus} avgDataBool={avgDataBool} />
                    {dataCheckStatus["Gender Wise Data"][audienceCategory] && <AudienceTimezoneWiseTable marketSite={marketSite} audienceCategory={audienceCategory}
                        audiencePercent={audiencePercent} id={id} setId={setId} dataCheckStatus={dataCheckStatus}
                        setDataCheckStatus={setDataCheckStatus} avgDataBool={avgDataBool} />}
                </div>
            </div>
        </div>
    )
}