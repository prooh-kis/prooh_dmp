import axios from "axios";
import {
    ADD_AUDIENCE_TYPE_PERCENT_DATA_FAIL,
    ADD_AUDIENCE_TYPE_PERCENT_DATA_REQUEST,
    ADD_AUDIENCE_TYPE_PERCENT_DATA_SUCCESS,
    ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_FAIL,
    ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_REQUEST,
    ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_SUCCESS,
    ADD_IMPACT_FACTOR_DATA_FAIL,
    ADD_IMPACT_FACTOR_DATA_REQUEST,
    ADD_IMPACT_FACTOR_DATA_SUCCESS,
    ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_FAIL,
    ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_REQUEST,
    ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_SUCCESS,
    GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_FAIL,
    GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_REQUEST,
    GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_SUCCESS,
    GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_FAIL,
    GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_REQUEST,
    GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_SUCCESS, 
    GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_FAIL,
    GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_REQUEST, 
    GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_SUCCESS,
    GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_FAIL,
    GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_REQUEST,
    GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_SUCCESS,
    GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_FAIL,
    GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_REQUEST,
    GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_SUCCESS,
    GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_FAIL,
    GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_REQUEST,
    GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_SUCCESS
} from "../constants/audienceConstant";
import { AUDIENCE_URL } from "../constants/urlConstant";

export const getAvgFootfallDataByMarketSite = (input) => async (dispatch , getState) => {
    dispatch({
        type: GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/getAvgFootfallDataByMarketSite`, input);
        dispatch({
            type: GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_AVG_FOOTFALL_DATA_BY_MARKET_SITE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const getAvgAudienceDataByMarketSite = (input) => async (dispatch , getState) => {
    dispatch({
        type: GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/getAvgAudienceDataByMarketSite`, input);
        dispatch({
            type: GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_AVG_AUDIENCE_DATA_BY_MARKET_SITE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getGenderWiseDataByAudienceTypeMarketSite = (input) => async (dispatch , getState) => {
    dispatch({
        type: GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/getGenderWiseDataByAudienceTypeMarketSite`, input);
        dispatch({
            type: GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getTimezoneWiseDataByAudienceTypeMarketSite = (input) => async (dispatch , getState) => {
    dispatch({
        type: GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/getTimezoneWiseDataByAudienceTypeMarketSite`, input);
        dispatch({
            type: GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_MARKET_SITE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getAudienceTypePercentForGenderWiseTab = (input) => async (dispatch , getState) => {
    dispatch({
        type: GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/getAudienceTypePercentForGenderWiseTab`, input);
        dispatch({
            type: GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_AUDIENCE_TYPE_PERCENT_FOR_GENDER_WISE_TAB_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const getImpactFactorDataByMarketSite = (input) => async (dispatch , getState) => {
    dispatch({
        type: GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/getImpactFactorDataByMarketSite`, input);
        dispatch({
            type: GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_IMPACT_FACTOR_DATA_BY_MARKET_SITE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addAudienceTypePercentData = (input) => async (dispatch , getState) => {
    dispatch({
        type: ADD_AUDIENCE_TYPE_PERCENT_DATA_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/addAudienceTypePercentData`, input);
        dispatch({
            type: ADD_AUDIENCE_TYPE_PERCENT_DATA_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADD_AUDIENCE_TYPE_PERCENT_DATA_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const addGenderWiseDataByAudienceType = (input) => async (dispatch , getState) => {
    dispatch({
        type: ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/addGenderWiseDataByAudienceType`, input);
        dispatch({
            type: ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADD_GENDER_WISE_DATA_BY_AUDIENCE_TYPE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addTimezoneWiseDataByAudienceType = (input) => async (dispatch , getState) => {
    dispatch({
        type: ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/addTimezoneWiseDataByAudienceType`, input);
        dispatch({
            type: ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADD_TIMEZONE_WISE_DATA_BY_AUDIENCE_TYPE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const addImpactFactorData = (input) => async (dispatch , getState) => {
    dispatch({
        type: ADD_IMPACT_FACTOR_DATA_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/addImpactFactorData`, input);
        dispatch({
            type: ADD_IMPACT_FACTOR_DATA_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADD_IMPACT_FACTOR_DATA_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};