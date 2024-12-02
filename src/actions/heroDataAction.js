import Axios from "axios";
import {
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";
import {
  GET_HERO_DATA_DETAILS_FAIL,
  GET_HERO_DATA_DETAILS_REQUEST,
  GET_HERO_DATA_DETAILS_SUCCESS,
} from "../constants/heroDataConstant";

const URL = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/heroData`;

export const registerHeroData = (reqBody) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: reqBody,
  });
  try {
    const { data } = await Axios.post(`${URL}/register`, reqBody);
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRegisterHeroDataDetails = (userId) => async (dispatch) => {
  dispatch({
    type: GET_HERO_DATA_DETAILS_REQUEST,
    payload: userId,
  });
  try {
    const { data } = await Axios.get(`${URL}?dataHeroUserId=${userId}`);
    dispatch({
      type: GET_HERO_DATA_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_HERO_DATA_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
