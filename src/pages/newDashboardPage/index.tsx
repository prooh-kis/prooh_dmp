import { message, Tooltip } from 'antd';
import { ALL_COHORTS } from '../../constants/helperConstant';
import React, { useEffect, useState } from 'react';
import { CheckboxInput } from '../../components/atoms/CheckboxInput';
import { MultiColorLinearBar2 } from './MultiColorLinearBar2';
import { SectionHeaderWithSwitch } from './SectionHeaderWithSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { getAudienceDataOnFiltersAction, getRespondentCountIndustryWiseAction, getRespondentProfileIndustryWiseAction, getThirdPartyAudienceCountSourceWiseAction } from '../../actions/dashboardAction';
import { DashboardPieChart } from './DashboardPieChart';
import { DataHeroProfilePopup } from './DataHeroProfilePopup';

const dataSourceTab = [{
    label: "Third Party Data",
    icon: null,
    value: "thirdPartyData",
    key: 0,
}, {
    label: "Respondant Data",
    icon: null,
    value: "respondantData",
    key: 1,
}];

const audienceDataSource = [{
    label: "All",
    value: "all",
    key: 0
}, ...ALL_COHORTS?.map((d: any, i: any) => {
    return ({
        label: d,
        value: d,
        key: i+1
    })
})];

const filterHelperTexts = [{
    label: "cities",
    value: "cityWiseData",
    header: "Cities",
    icon: "fi-sr-marker"
},{
    label: "touchPoints",
    value: "touchPointWiseData",
    header: "Touchpoints",
    icon: "fi-sr-land-location"
},{
    label: "locations",
    value: "locationWiseData",
    header: "Site Locations",
    icon: "fi-sr-screen"
},{
    label: "genders",
    value: "genderWiseData",
    header: "Genders",
    icon: "fi-sr-venus-mars"
},{
    label: "dayTypes",
    value: "dayWiseData",
    header: "Movement Pattern",
    icon: "fi-br-walking"
},{
    label: "timezones",
    value: "timezoneWiseData",
    header: "Time Zone Partition",
    icon: "fi-sr-clock"
},{
    label: "impactFactor",
    value: "impactFactorData",
    header: "Impact Factor",
    icon: "fi-br-arrow-trend-up"
}]

export const Dashboard: React.FC = () => {
    const dispatch = useDispatch<any>();
    const disabledOption = "impactFactorData"
    const [industry, setIndustry] = useState<any>(["Advertising", "Sports", "Housing"]);
    const [dataSource, setDataSource] = useState<any>(1);
    const [audienceType, setAudienceType] = useState<any>(0);

    const [thirdPartyData, setThirdPartyData] = useState<any>([]);
    const [respondentData, setRespondentData] = useState<any>([]);
    const [respondentProfile, setRespondentProfile] = useState<any>([]);
    const [respondentAudienceData, setRespondentAudienceData] = useState<any>({});
    const [respondentAudienceGenderData, setRespondentAudienceGenderData] = useState<any>({});

    const [value, setValue] = useState<any>("");

    const [openDataHeroPopup, setOpenDataHeroPopup] = useState<any>(false);
    const [selectedHero, setSelectedHero] = useState<any>(null);


    const [filters, setFilters] = useState<any>({
        audienceType: "All",
        cities: [],
        touchPoints: [],
        locations: [],
        genders: [],
        dayTypes: [],
        timezones: [],
    });

    const [allValues, setAllValues] = useState<any>({
        cities: [],
        touchPoints: [],
        locations: [],
        genders: [],
        dayTypes: [],
        timezones: [],
    });

    const {
        loading: loadingRespondentCount,
        error: errorRespondentCount,
        data: respondentCount
    } = useSelector((state: any) => state.getRespondentCountIndustryWise);

    const {
        loading: loadingThirdPartyAudienceCount,
        error: errorThirdPartyAudienceCount,
        data: thirdPartyAudienceCount
    } = useSelector((state: any) => state.getThirdPartyAudienceCountSourceWise);

    const {
        loading: loadingRespondentProfile,
        error: errorRespondentProfile,
        data: respondentProfileData
    } = useSelector((state: any) => state.getRespondentProfileIndustryWise);

    const {
        loading: loadingAudienceData,
        error: errorAudienceData,
        data: audienceData
    } = useSelector((state: any) => state.getAudienceDataOnFilters);

    const hasSetInitialFilters = React.useRef(false);

    useEffect(() => {

        if (value.split("").length > 0) {
            setIndustry([value]);
        }

        if (audienceType == -1) {
            setFilters((prev: any) => ({
                ...prev,
                audienceType: "All"
            }));
        } else {
            setFilters((prev: any) => ({
                ...prev,
                audienceType: ALL_COHORTS[audienceType]
            }));
        }
    },[audienceType, value]);

    useEffect(() => {
        if (audienceData) {
            if (!hasSetInitialFilters.current) {
                hasSetInitialFilters.current = true;
                setFilters((prev: any) => ({
                    ...prev,
                    cities: Object.keys(audienceData.cityWiseData || []),
                    touchPoints: Object.keys(audienceData.touchPointWiseData || []),
                    locations: Object.keys(audienceData.locationWiseData || []),
                    genders: Object.keys(audienceData.genderWiseData || []),
                    dayTypes: Object.keys(audienceData.dayWiseData || []),
                    timezones: Object.keys(audienceData.timezoneWiseData || []),
                    impactFactors: Object.keys(audienceData.impactFactorWiseData || []),
                }));
    
                setAllValues((prev: any) => ({
                    ...prev,
                    cities: Object.keys(audienceData.cityWiseData || []),
                    touchPoints: Object.keys(audienceData.touchPointWiseData || []),
                    locations: Object.keys(audienceData.locationWiseData || []),
                    genders: Object.keys(audienceData.genderWiseData || []),
                    dayTypes: Object.keys(audienceData.dayWiseData || []),
                    timezones: Object.keys(audienceData.timezoneWiseData || []),
                    impactFactors: Object.keys(audienceData.impactFactorWiseData || []),
                }));
            }
            
            const { genderWiseData, ...filteredData } = audienceData;
            setRespondentAudienceData({...filteredData});
            setRespondentAudienceGenderData(genderWiseData);
        }
    }, [audienceData]);

    useEffect(() => {
        if (thirdPartyAudienceCount) {
            setThirdPartyData((thirdPartyAudienceCount.response));
        }

        if (respondentCount) {
            setRespondentData(respondentCount.response);
        }

        if (respondentProfileData) {
            setRespondentProfile(respondentProfileData);
        }

    }, [thirdPartyAudienceCount, respondentCount, respondentProfileData]);

    useEffect(() => {
        dispatch(getRespondentCountIndustryWiseAction());
        dispatch(getThirdPartyAudienceCountSourceWiseAction());
        dispatch(getRespondentProfileIndustryWiseAction({ industry: industry }));
        dispatch(getAudienceDataOnFiltersAction(filters));

    }, [dispatch, filters, industry]);

    const handleClick = ({ type, value, checked }: { type: string; value: string; checked: boolean }) => {

        if (checked) {
            let valuesToAdd: string[];
            if (value === "All") {
                valuesToAdd = Object.keys(audienceData[filterHelperTexts?.find((f: any) => f.label === type)?.value || type] || []);
            } else {
                valuesToAdd = [...filters[type], value].length === allValues[type].length - 1 ? [...filters[type], value, "All"] : [...filters[type], value];
            }
            setFilters((prev: any) => {
                return {
                    ...prev,
                    [type]: valuesToAdd
                }
            });

        } else {
            let valuesToKeep: string[];

            if (value === "All") {
                valuesToKeep = [];
            } else {
                valuesToKeep = filters[type]?.filter((f: any) => f !== "All" && f !== value);
            }
            setFilters((prev: any) => {
                return {
                    ...prev,
                    [type]: valuesToKeep
                }
            });
        }
    }
    return (
        <div className="font-custom grid grid-rows-12 bg-gray-100 h-[90vh]">
            <DataHeroProfilePopup
                open={openDataHeroPopup}
                onClose={() => {
                    setOpenDataHeroPopup(false);
                }}
                heroDetails={selectedHero}
            />
            <div className="row-span-1 px-8 bg-white flex gap-2 items-center">
                <div className="flex items-center justify-center bg-[#3A9868] rounded-[8px] p-2">
                    <i className="fi fi-br-analyse text-[12px] text-white flex items-center justify-center motion-safe:animate-bounce"></i>
                </div>
                <h1 className="text-[20px] font-medium">Research Analysis</h1>
            </div>

            <div className="row-span-11 p-2 grid grid-cols-12 gap-2 grid-rows-1">
                <div className="col-span-4 grid grid-rows-12 rounded-[8px] bg-white shadow-sm">
                    <div className="row-span-2">
                        <div className="flex gap-2 items-center px-4 pt-4 pb-2">
                            <h1 className="text-[16px] font-semibold">Our Data Sources <span className="text-gray-500">(2)</span></h1>
                        </div>
                        <div className="grid grid-cols-2 flex items-center border-b border-[#E5E5E5] overflow-x-scroll no-scrollbar">
                            {dataSourceTab?.map((data: any) => (
                                <div
                                    key={data.key}
                                    className={`${dataSource === data.key ? "border-b border-[#3A9868]" : ""} col-span-1 py-2 px-4 cursor-pointer`}
                                    onClick={() => setDataSource(data.key)}
                                >
                                    <h1 className={`${dataSource === data.key ? "text-[#3A9868] font-semibold" : ""} text-[14px] font-medium truncate`}>
                                        {data.label}
                                    </h1>
                                </div>
                            ))}
                        </div>
                    </div>
                    

                    <div className="row-span-10 grid grid-rows-1">
                        {dataSource === 0 ? (
                            <div className="row-span-1 grid grid-rows-12">
                                <div className="row-span-6 flex items-center border-b">
                                    {loadingAudienceData ? (
                                        <div className="rounded-[8px] bg-white animate-pulse h-20 p-1">
                                            <div className="bg-gray-200 h-full" />
                                        </div>
                                    ) : thirdPartyAudienceCount && (
                                        <div className="p-4 flex items-center">
                                            <DashboardPieChart
                                                type="Third Party Data"
                                                total={thirdPartyAudienceCount.totalCount}
                                                data={thirdPartyData}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="row-span-6 p-4 overflow-y-scroll no-scrollbar">
                                    {Object.keys(thirdPartyData)?.map((key: any, i: number) => (
                                        <div key={i}>
                                            <h1 className="text-[16px] font-semibold">
                                                {key === "totalCameraData" ? "Camera Data" : key === "totalRoadsterData" ? "Roadster Data" : key === "totalDmfdData" ? "DMFD Data" : key === "totalTrafficData" ? "Traffic Data" : key === "totalMobileDeviceSdkData" ? "Mobile Device SDK" : ""}
                                            </h1>
                                            <p className="text-[14px] text-gray-500">
                                                {thirdPartyData[key].description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : dataSource === 1 ? (
                            <div className="row-span-1 grid grid-rows-12">
                                <div className="row-span-6 flex items-center justify-center border-b">
                                    {loadingRespondentCount ? (
                                        <div className="rounded-[8px] bg-white animate-pulse h-20 p-1">
                                            <div className="bg-gray-200 h-full" />
                                        </div>
                                    ) : respondentCount && (
                                        <div className="p-4 flex items-center ">
                                            <DashboardPieChart
                                                type="Respondent Data"
                                                total={respondentData.length}
                                                data={respondentData}
                                                setValue={setValue}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="row-span-6 grid grid-rows-12 overflow-y-scroll no-scrollbar">
                                    <div className="px-4 row-span-2">
                                        {respondentCount && (
                                            <h1 className="pt-2 text-[16px] font-semibold">Respondent Profile ({respondentCount?.total})</h1>
                                        )}
                                    </div>
                                    <div className="px-4 row-span-10">
                                        {loadingRespondentProfile ? (
                                            <div className="rounded-[8px] bg-white animate-pulse h-20 p-1">
                                                <div className="bg-gray-200 h-full" />
                                            </div>
                                        ) : respondentProfileData && (
                                            <div className="grid grid-cols-3 gap-4 overflow-y-scroll no-scrollbar">
                                                {respondentProfile?.filter((rspdt: any) => industry.includes(rspdt?.industry))?.map((respondent: any, j: any) => (
                                                    <div
                                                        key={j}
                                                        className="col-span-1 w-full h-full py-1"
                                                        onClick={() => {
                                                            setOpenDataHeroPopup(true);
                                                            setSelectedHero(respondent);
                                                        }}
                                                    >
                                                        <div className="h-24 rounded-[8px] bg-white border border-[#D7D7D720]">
                                                            <img className="rounded-[8px] h-full w-full" src={respondent?.avatar} alt={respondent.name} />
                                                        </div>
                                                        <div className="py-1">
                                                            <h1 className="text-[14px] font-semibold truncate">{respondent.name}</h1>
                                                            <p className="text-[12px] text-gray-500 truncate">{respondent.role}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="col-span-8 grid grid-cols-1 grid-rows-12 gap-2">
                    <div className="row-span-3 col-span-1 rounded-[8px] bg-white shadow-sm">
                        <div className="flex gap-2 items-center px-4 pt-4 pb-2">
                            <h1 className="text-[16px] font-semibold">Total Audience Data</h1>
                        </div>
                        <div className="border-b border-[#E5E5E5]">
                            <div className="flex items-center justify-between mx-2 overflow-x-scroll no-scrollbar">
                                {audienceDataSource?.map((data: any) => (
                                    <div key={data.key} className={`${audienceType === data.key ? "border-b border-[#3A9868]" : ""} px-4 py-2 cursor-pointer`} onClick={() => setAudienceType(data.key)}>
                                        <Tooltip title={data.label}>
                                            <h1 className={`${audienceType === data.key ? "text-[#3A9868] font-semibold" : ""} text-[14px] font-medium truncate`}>
                                                {data.label}
                                            </h1>
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-4 py-3 flex items-center gap-8">
                            <h1 className="text-[#6F7F8E] text-[14px]">Filters</h1>
                            {Object.keys(respondentAudienceGenderData)?.map((gender: any, m: any) => (
                                <div key={m} className="flex items-center">
                                    <CheckboxInput
                                        label={`${gender} (${respondentAudienceGenderData[gender].percentage?.toFixed(1)}%)`}
                                        checked={
                                            filters[filterHelperTexts?.find((d: any) => d.value === "genderWiseData")?.label || "genderWiseData"]?.includes(gender)
                                            // filters.genders?.length === 0 || filters.genders?.includes("All")
                                        }
                                        color="#6F7F8E"
                                        textSize="14px"
                                        onChange={(checked) => handleClick({
                                            type: "genders",
                                            value: gender,
                                            checked: checked
                                        })}
                                        disabled={
                                            Object.keys(filters[filterHelperTexts?.find((d: any) => d.value === "genderWiseData")?.label || "genderWiseData"] || []).length === 1 ||
                                            Object.keys(filters[filterHelperTexts?.find((d: any) => d.value === "genderWiseData")?.label || "genderWiseData"] || []).length === 2 && filters[filterHelperTexts?.find((d: any) => d.value === "genderWiseData")?.label || "genderWiseData"]?.includes("All")
                                        }
                                    />
                                </div>
                            ))}
                            {allValues?.["genders"]?.filter((a: any) => !Object.keys(respondentAudienceGenderData)?.includes(a))?.map((key: any, p: any) => (
                                <div key={p} className="flex items-center gap-2">
                                    <CheckboxInput
                                        label={key}
                                        checked={false}
                                        color="#6F7F8E"
                                        textSize="14px"
                                        onChange={(checked) => handleClick({
                                            type: "genders",
                                            value: key,
                                            checked: checked
                                        })}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row-span-9 grid grid-rows-1">
                        {loadingAudienceData ? (
                            <div className="row-span-1 grid grid-cols-6 gap-2">
                                {[1, 2, 3, 4, 5, 6]?.map((n: any) => (
                                    <div key={n} className="col-span-2 h-80 rounded-[8px] animatie-pulse bg-white">

                                    </div>
                                ))}
                            </div>
                        ) : errorAudienceData ? (
                            <div className="row-span-1 p-4">
                                {"Error in getting audience data, please reload the page or contact support..."}
                            </div>
                        ) : (
                            <div className="row-span-1 grid grid-cols-6 gap-2 grid-rows-2">
                                {audienceData && Object.keys(respondentAudienceData)?.map((data: any, n: any) => (
                                    <div key={n} className="row-span-1 col-span-2 bg-[#FFFFFF] rounded-[8px] border border-gray-100 shadow-sm">
                                        <div className="p-4">
                                            <div className="border-b">
                                                <SectionHeaderWithSwitch
                                                    iconClass={filterHelperTexts?.find((d: any) => d.value === data)?.icon || "fi-sr-marker"}
                                                    title={filterHelperTexts?.find((d: any) => d.value === data)?.header || ""}
                                                    bgColor=" bg-[#3A9868]"
                                                    showPercent={true}
                                                    setShowPercent={() => {}}
                                                    switchShow={false}
                                                />
                                            </div>
                                            <div className="py-2">
                                                {Object.keys(respondentAudienceData[data])?.map((key: any, i: any) => (
                                                    <div key={i} className="grid grid-cols-6 flex items-center gap-2 pt-1">
                                                        <div className="col-span-2">
                                                            <CheckboxInput
                                                                disabled={
                                                                    data === "impactFactorData" ||
                                                                    Object.keys(filters[filterHelperTexts?.find((d: any) => d.value === data)?.label || data] || []).length === 1 ||
                                                                    Object.keys(filters[filterHelperTexts?.find((d: any) => d.value === data)?.label || data] || []).length === 2 && filters[filterHelperTexts?.find((d: any) => d.value === data)?.label || data]?.includes("All")
                                                                }
                                                                label={key.toUpperCase()}
                                                                checked={data === disabledOption || (filters[filterHelperTexts?.find((d: any) => d.value === data)?.label || data]?.includes(key) || false)}
                                                                textSize={"10px"}
                                                                color={"#6F7F8E"}
                                                                onChange={(checked) => {
                                                            
                                                                    if (data !== disabledOption) {
                                                                        handleClick({
                                                                            type: filterHelperTexts?.find((d: any) => d.value === data)?.label || data,
                                                                            value: key,
                                                                            checked: checked
                                                                        });
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-span-4 flex items-center w-full gap-2">
                                                            <MultiColorLinearBar2
                                                                delivered={respondentAudienceData[data][key]?.percentage}
                                                                expected={respondentAudienceData[data][key]?.percentage}
                                                                total={100}
                                                                deliveredColor="bg-[#3A9868]"
                                                                expectedColor="bg-[#3A9868]"
                                                                totalColor="bg-[#D3EDFF]"
                                                                height="h-[5px]"
                                                            />
                                                            <h1 className="text-[10px]">
                                                                {`${(respondentAudienceData[data][key]?.percentage)?.toFixed(0)}%`}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                ))}
                                                
                                                {allValues[filterHelperTexts?.find((d: any) => d.value === data)?.label  || data]?.filter((a: any) => !Object.keys(respondentAudienceData[data])?.includes(a))?.map((key: any, i: any) => (
                                                    <div key={i} className="grid grid-cols-6 flex items-center gap-2 pt-1">
                                                        <div className="col-span-2">
                                                            <CheckboxInput
                                                                disabled={filters[filterHelperTexts?.find((d: any) => d.value === data)?.label  || data]?.filter((f: any) => f !== key)?.length === 1 && filters[filterHelperTexts?.find((d: any) => d.value === data)?.label  || data].filter((f: any) => f !== key)[0] === "All" ? true : data === disabledOption}
                                                                label={key.toUpperCase()}
                                                                checked={data === disabledOption || (filters[filterHelperTexts?.find((d: any) => d.value === data)?.label || data]?.includes(key) || false)}
                                                                textSize={"10px"}
                                                                color={"#6F7F8E"}
                                                                onChange={(checked) => {
                                                            
                                                                    if (data !== disabledOption) {
                                                                        handleClick({
                                                                            type: filterHelperTexts?.find((d: any) => d.value === data)?.label || data,
                                                                            value: key,
                                                                            checked: checked
                                                                        });
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
