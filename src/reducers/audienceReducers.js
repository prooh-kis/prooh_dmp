import {
    GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_FAIL,
    GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_REQUEST,
    GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_RESET,
    GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_SUCCESS,
    GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_FAIL,
    GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_REQUEST,
    GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_RESET,
    GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_SUCCESS,
    GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_FAIL,
    GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_REQUEST,
    GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_RESET,
    GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_SUCCESS,
    GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_FAIL,
    GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_REQUEST,
    GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_RESET,
    GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_SUCCESS,
    GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_FAIL,
    GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_REQUEST,
    GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_RESET,
    GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_SUCCESS,
    GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_FAIL,
    GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_REQUEST,
    GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_RESET,
    GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_SUCCESS
} from "../constants/audienceConstant";

export function getAvgFootfallDataByMarketSiteReducer(state = {}, action) {
    switch (action.type) {
        case GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_REQUEST:
            return { loading: true };
        case GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_SUCCESS:
            return { loading: false, data: action.payload, success: true };
        case GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_FAIL:
            return { loading: false, error: action.payload };
        case GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_RESET:
            return {};
        default:
            return state;
    }
}

export function getAvgAudienceDataByMarketSiteReducer(state = {}, action) {
    switch (action.type) {
        case GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_REQUEST:
            return { loading: true };
        case GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_SUCCESS:
            return { loading: false, data: action.payload, success: true };
        case GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_FAIL:
            return { loading: false, error: action.payload };
        case GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_RESET:
            return {};
        default:
            return state;
    }
}

export function getGenderWiseDataByAudienceTypeMarketSiteReducer(state = {}, action) {
    switch (action.type) {
        case GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_REQUEST:
            return { loading: true };
        case GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_SUCCESS:
            return { loading: false, data: action.payload, success: true };
        case GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_FAIL:
            return { loading: false, error: action.payload };
        case GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_RESET:
            return {};
        default:
            return state;
    }
}

export function getTimezoneWiseDataByAudienceTypeMarketSiteReducer(state = {}, action) {
    switch (action.type) {
        case GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_REQUEST:
            return { loading: true };
        case GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_SUCCESS:
            return { loading: false, data: action.payload, success: true };
        case GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_FAIL:
            return { loading: false, error: action.payload };
        case GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_RESET:
            return {};
        default:
            return state;
    }
}

export function getAudienceTypePercentForGenderWiseTabReducer(state = {}, action) {
    switch (action.type) {
        case GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_REQUEST:
            return { loading: true };
        case GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_SUCCESS:
            return { loading: false, data: action.payload, success: true };
        case GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_FAIL:
            return { loading: false, error: action.payload };
        case GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_RESET:
            return {};
        default:
            return state;
    }
}

export function getImpactfactorDataByMarketSiteReducer(state = {}, action) {
    switch (action.type) {
        case GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_REQUEST:
            return { loading: true };
        case GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_SUCCESS:
            return { loading: false, data: action.payload, success: true };
        case GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_FAIL:
            return { loading: false, error: action.payload };
        case GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_RESET:
            return {};
        default:
            return state;
    }
}