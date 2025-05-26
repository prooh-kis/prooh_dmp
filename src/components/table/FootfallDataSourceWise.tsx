import { useDispatch } from "react-redux";
import { DataCard } from "../../components/atoms/DataCard"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAvgFootfallDataByMarketSite } from "../../actions/audienceAction";
import { AUDIENCE_GET_FOOTFALL_DATA_BY_MARKET_SITE } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";


interface FootfallDataSourceWiseProps {
    marketSite: String;
    id: string;
    setId: Function;
    dataCheckStatus: {};
    setDataCheckStatus: Function;
}

export const FootfallDataSourceWise: React.FC<FootfallDataSourceWiseProps> = ({ marketSite, id, setId }) => {

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [totalCount, setTotalCount] = useState(0);
    const [audienceCount, setAudienceCount] = useState({
        "totalCameraData": 0,
        "totalDmfdData": 0,
        "totalTrafficData": 0,
        "totalRoadsterData": 0,
        "totalMobileDeviceSdkData": 0
    });

    const userSignin = useSelector((state: any) => state.userSignin);
    const {
        error: errorSignIn,
        success: successSignin,
        userInfo: userInfo,
    } = userSignin;

    const getAvgFootfallDataByMarketSiteData = useSelector(
        (state: any) => state.getAvgFootfallDataByMarketSite
    );
    const {
        loading: audienceCountByMarketSiteLoading,
        data: audienceCountByMarketSite,
        success: audienceCountByMarketSiteSuccess,
        error: audienceCountByMarketSiteError
    } = getAvgFootfallDataByMarketSiteData;

    useEffect(() => {
        console.log(id)
        if (id !== "research") {
            navigate(`/research/${id}`)
        }
    }, [navigate, id])

    useEffect(() => {
        dispatch(getAvgFootfallDataByMarketSite({
            marketSite: userInfo?.touchPoints?.[0]?.marketSites?.[0],
            event: AUDIENCE_GET_FOOTFALL_DATA_BY_MARKET_SITE
        }))
    }, [])

    useEffect(() => {
        if (audienceCountByMarketSiteError) {
            alert("Error Fetching Data : " + audienceCountByMarketSiteError)
        }

        if (audienceCountByMarketSiteSuccess) {
            setAudienceCount(audienceCountByMarketSite?.response)
            setTotalCount(audienceCountByMarketSite?.totalAvgCount)
            if (audienceCountByMarketSite.audienceData != null) {
                setId(audienceCountByMarketSite.audienceData._id.toString())
            }
        }

    }, [audienceCountByMarketSiteSuccess, audienceCountByMarketSiteError])

    return (
        <div>
            {/* Footfall Data */}
            <div className="mb-4 bg-[#ffffff] p-4">
                <h3 className="font-bold text-lg mb-2">Footfall Data</h3>
                <p className="text-sm text-gray-500 mb-4">
                    Approval Shall Be Granted In Hours Post Application And The Research Paper Shall Be Completed In 48
                </p>

                <div className="grid grid-cols-5 gap-2 flex-wrap">
                    <DataCard title="As per property management" source="Drmdb" value={audienceCount?.totalDmfdData} icon={"fi fi-rs-apartment"} />
                    <DataCard title="Camera Data" source="Quividi" value={audienceCount?.totalCameraData} icon={"fi fi-ss-camera-cctv"} />
                    <DataCard title="Google traffic and RTO data" source="Google" value={audienceCount?.totalTrafficData} icon={"fi fi-rs-cars"} />
                    <DataCard title="Roadster Data" source="" value={audienceCount?.totalRoadsterData} icon={"fi fi-ss-road"} />
                    <DataCard title="Mobile Device Sdk Data" source="" value={audienceCount?.totalMobileDeviceSdkData} icon={"fi fi-rr-smartphone"} />
                </div>

                <div className="mt-4 text-base">
                    Total Average Footfall - <span className="font-semibold">{totalCount}</span> Data From Sources
                </div>
            </div>
        </div>
    )
}

