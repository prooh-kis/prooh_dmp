import { useState } from "react";
import { AudienceGenderWiseTable, AudienceTimezoneWiseTable } from "../../components/table"
import AudienceSelector from "./AudienceSelector";


interface AudienceGenderWiseTimezoneWiseDataProps {
    marketSite: String;
    id: string;
    setId: string;
}

export const AudienceGenderWiseTimezoneWiseData: React.FC<AudienceGenderWiseTimezoneWiseDataProps> = ({
    marketSite, id, setId
}) => {

    const [audienceCategory, setAudienceCategory] = useState("Working Professionals-A")
    const [audiencePercent, setAudiencePercent] = useState(0.0)

    return (
        <div className="flex flex-row gap-10">
            <AudienceSelector id={"67a3362484de51a314e207b7"} audienceCategory={audienceCategory} setAudienceCategory={setAudienceCategory}
                setAudiencePercent={setAudiencePercent} />
            <div className="flex flex-col gap-10">
                <AudienceGenderWiseTable marketSite={marketSite} audienceCategory={audienceCategory}
                    audiencePercent={audiencePercent} id={id} setId={setId} />
                <AudienceTimezoneWiseTable marketSite={marketSite} audienceCategory={audienceCategory}
                    audiencePercent={audiencePercent} id={id} setId={setId} />
            </div>
        </div>
    )
}