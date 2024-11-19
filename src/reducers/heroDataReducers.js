import {
  GET_HERO_DATA_DETAILS_FAIL,
  GET_HERO_DATA_DETAILS_REQUEST,
  GET_HERO_DATA_DETAILS_RESET,
  GET_HERO_DATA_DETAILS_SUCCESS,
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
      return { loading: false, data: action.payload, success: true };
    case GET_HERO_DATA_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GET_HERO_DATA_DETAILS_RESET:
      return {};
    default:
      return state;
  }
}
