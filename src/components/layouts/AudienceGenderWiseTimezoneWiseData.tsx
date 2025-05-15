import { useEffect, useState } from "react";
import { AudienceGenderWiseTable, AudienceTimezoneWiseTable } from "../../components/table"
import AudienceSelector from "./AudienceSelector";
import { useNavigate } from "react-router-dom";


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

    const navigate = useNavigate();
    const [audienceCategory, setAudienceCategory] = useState("Working Professionals-A")
    const [audiencePercent, setAudiencePercent] = useState(0.0)

    useEffect(() => {
        navigate(`/dashboard/${id}`)
    }, [])

    return (
        <div className="flex flex-row gap-10">
            <AudienceSelector id={"67a3362484de51a314e207b7"} audienceCategory={audienceCategory} setAudienceCategory={setAudienceCategory}
                setAudiencePercent={setAudiencePercent} />
            <div className="flex flex-col gap-10">
                <AudienceGenderWiseTable marketSite={marketSite} audienceCategory={audienceCategory}
                    audiencePercent={audiencePercent} id={id} setId={setId} dataCheckStatus={dataCheckStatus}
                    setDataCheckStatus={setDataCheckStatus} />
                {dataCheckStatus["Gender Wise Data"][audienceCategory] && <AudienceTimezoneWiseTable marketSite={marketSite} audienceCategory={audienceCategory}
                    audiencePercent={audiencePercent} id={id} setId={setId} dataCheckStatus={dataCheckStatus}
                    setDataCheckStatus={setDataCheckStatus}/>}
            </div>
        </div>
    )
}