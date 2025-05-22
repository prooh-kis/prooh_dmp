import {
  GET_AUDIENCE_DATA_BASED_ON_FILTERS_FAIL,
  GET_AUDIENCE_DATA_BASED_ON_FILTERS_REQUEST,
  GET_AUDIENCE_DATA_BASED_ON_FILTERS_RESET,
  GET_AUDIENCE_DATA_BASED_ON_FILTERS_SUCCESS,
  GET_RESPONDENT_COUNT_INDUSTRY_WISE_FAIL,
  GET_RESPONDENT_COUNT_INDUSTRY_WISE_REQUEST,
  GET_RESPONDENT_COUNT_INDUSTRY_WISE_RESET,
  GET_RESPONDENT_COUNT_INDUSTRY_WISE_SUCCESS,
  GET_RESPONDENT_PROFILE_INDUSTRY_WISE_FAIL,
  GET_RESPONDENT_PROFILE_INDUSTRY_WISE_REQUEST,
  GET_RESPONDENT_PROFILE_INDUSTRY_WISE_RESET,
  GET_RESPONDENT_PROFILE_INDUSTRY_WISE_SUCCESS,
  GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_FAIL,
  GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_REQUEST,
  GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_RESET,
  GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_SUCCESS
} from "../constants/dashboardConstants";

export function getRespondentCountIndustryWiseReducer(state = {}, action) {
  switch (action.type) {
    case GET_RESPONDENT_COUNT_INDUSTRY_WISE_REQUEST:
      return {
        loading: true
      };
    case GET_RESPONDENT_COUNT_INDUSTRY_WISE_SUCCESS:
      return {
        loading: false, data: action.payload, success: true
      };
    case GET_RESPONDENT_COUNT_INDUSTRY_WISE_FAIL:
      return {
        loading: false, error: action.payload
      };
    case GET_RESPONDENT_COUNT_INDUSTRY_WISE_RESET:
      return {};
    default:
      return state;
  }
}


export function getThirdPartyAudienceCountSourceWiseReducer(state = {}, action) {
  switch (action.type) {
    case GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_REQUEST:
      return {
        loading: true
      };
    case GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_SUCCESS:
      return {
        loading: false, data: action.payload, success: true
      };
    case GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_FAIL:
      return {
        loading: false, error: action.payload
      };
    case GET_THIRD_PARTY_AUDIENCE_COUNT_SOURCE_WISE_RESET:
      return {};
    default:
      return state;
  }
}


export function getRespondentProfileIndustryWiseReducer(state = {}, action) {
  switch (action.type) {
    case GET_RESPONDENT_PROFILE_INDUSTRY_WISE_REQUEST:
      return {
        loading: true
      };
    case GET_RESPONDENT_PROFILE_INDUSTRY_WISE_SUCCESS:
      return {
        loading: false, data: action.payload, success: true
      };
    case GET_RESPONDENT_PROFILE_INDUSTRY_WISE_FAIL:
      return {
        loading: false, error: action.payload
      };
    case GET_RESPONDENT_PROFILE_INDUSTRY_WISE_RESET:
      return {};
    default:
      return state;
  }
}


export function getAudienceDataOnFiltersReducer(state = {}, action) {
  switch (action.type) {
    case GET_AUDIENCE_DATA_BASED_ON_FILTERS_REQUEST:
      return {
        loading: true
      };
    case GET_AUDIENCE_DATA_BASED_ON_FILTERS_SUCCESS:
      return {
        loading: false, data: action.payload, success: true
      };
    case GET_AUDIENCE_DATA_BASED_ON_FILTERS_FAIL:
      return {
        loading: false, error: action.payload
      };
    case GET_AUDIENCE_DATA_BASED_ON_FILTERS_RESET:
      return {};
    default:
      return state;
  }
}