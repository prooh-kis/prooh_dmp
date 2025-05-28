import {
    GET_AUDIENCE_DATA_BASED_ON_FILTERS_FAIL,
    GET_AUDIENCE_DATA_BASED_ON_FILTERS_REQUEST,
    GET_AUDIENCE_DATA_BASED_ON_FILTERS_SUCCESS,
    GET_RESPONDENT_COUNT_INDUSTRY_WISE_FAIL,
    GET_RESPONDENT_COUNT_INDUSTRY_WISE_REQUEST,
    GET_RESPONDENT_COUNT_INDUSTRY_WISE_SUCCESS,
    GET_RESPONDENT_PROFILE_INDUSTRY_WISE_FAIL,
    GET_RESPONDENT_PROFILE_INDUSTRY_WISE_REQUEST,
    GET_RESPONDENT_PROFILE_INDUSTRY_WISE_SUCCESS,
    GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_FAIL,
    GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_REQUEST,
    GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_SUCCESS
} from "../constants/dashboardConstants";
import axios from "axios";

import { AUDIENCE_URL } from "../constants/urlConstant";


export const getRespondentCountIndustryWiseAction = () => async (dispatch, getState) => {
    dispatch({
        type: GET_RESPONDENT_COUNT_INDUSTRY_WISE_REQUEST,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/getRespondentCountIndustryWiseDashboard`);
        dispatch({
            type: GET_RESPONDENT_COUNT_INDUSTRY_WISE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_RESPONDENT_COUNT_INDUSTRY_WISE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};



export const getThirdPartyAudienceCountSourceWiseAction = () => async (dispatch, getState) => {
    dispatch({
        type: GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_REQUEST,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/getThirdPartyAudienceCountSourceWise`);
        dispatch({
            type: GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const getRespondentProfileIndustryWiseAction = (input) => async (dispatch, getState) => {
    dispatch({
        type: GET_RESPONDENT_PROFILE_INDUSTRY_WISE_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/getRespondentProfilesIndustryWise`, input);
        dispatch({
            type: GET_RESPONDENT_PROFILE_INDUSTRY_WISE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_RESPONDENT_PROFILE_INDUSTRY_WISE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const getAudienceDataOnFiltersAction = (input) => async (dispatch, getState) => {
    dispatch({
        type: GET_AUDIENCE_DATA_BASED_ON_FILTERS_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${AUDIENCE_URL}/getAudienceDataBasedOnFiltersDashboard`, input);
        dispatch({
            type: GET_AUDIENCE_DATA_BASED_ON_FILTERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_AUDIENCE_DATA_BASED_ON_FILTERS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};