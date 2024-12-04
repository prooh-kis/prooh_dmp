import {
  GET_AUDIENCE_DATA_FAIL,
  GET_AUDIENCE_DATA_REQUEST,
  GET_AUDIENCE_DATA_SUCCESS,
  GET_HERO_DATA_DETAILS_FAIL,
  GET_HERO_DATA_DETAILS_REQUEST,
  GET_HERO_DATA_DETAILS_RESET,
  GET_HERO_DATA_DETAILS_SUCCESS,
  SAVE_AUDIENCE_DATA_FAIL,
  SAVE_AUDIENCE_DATA_REQUEST,
  SAVE_AUDIENCE_DATA_RESET,
  SAVE_AUDIENCE_DATA_SUCCESS,
} from "../constants/heroDataConstant";
import {
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_RESET,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";

export function heroDataRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, data: action.payload, success: true };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNUP_RESET:
      return {};
    default:
      return state;
  }
}

export function getHeroDataDetailsReducer(state = {}, action) {
  switch (action.type) {
    case GET_HERO_DATA_DETAILS_REQUEST:
      return { loading: true };
    case GET_HERO_DATA_DETAILS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_HERO_DATA_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GET_HERO_DATA_DETAILS_RESET:
      return {};
    default:
      return state;
  }
}

export function audienceDataSaveReducer(state = {}, action) {
  switch (action.type) {
    case SAVE_AUDIENCE_DATA_REQUEST:
      return { loading: true };
    case SAVE_AUDIENCE_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload, success: true };
    case SAVE_AUDIENCE_DATA_FAIL:
      return { loading: false, error: action.payload };
    case SAVE_AUDIENCE_DATA_RESET:
      return {};
    default:
      return state;
  }
}

export function audienceDataGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_AUDIENCE_DATA_REQUEST:
      return { loading: true };
    case GET_AUDIENCE_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_AUDIENCE_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}