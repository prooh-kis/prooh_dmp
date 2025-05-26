import Axios from "axios";
import {
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";
import {
  GET_AUDIENCE_DATA_FAIL,
  GET_AUDIENCE_DATA_REQUEST,
  GET_AUDIENCE_DATA_SUCCESS,
  GET_HERO_DATA_DETAILS_FAIL,
  GET_HERO_DATA_DETAILS_REQUEST,
  GET_HERO_DATA_DETAILS_SUCCESS,
  SAVE_AUDIENCE_DATA_FAIL,
  SAVE_AUDIENCE_DATA_REQUEST,
  SAVE_AUDIENCE_DATA_SUCCESS,
} from "../constants/heroDataConstant";

const URL = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/heroData`;
const URL2 = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/audiences`;
const USER_URL = `${process.env.REACT_APP_PROOH_SERVER}/api/v1/users`;


export const registerHeroData = (input) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: input,
  });
  try {
    const { data } = await Axios.post(`${USER_URL}/addNewDataHeroUser`, input);
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

export const saveAudienceDataAction = (audienceData) => async (dispatch) => {
  dispatch({
    type: SAVE_AUDIENCE_DATA_REQUEST,
    payload: audienceData
  });
  try {
    const { data } = await Axios.post(`${URL2}/addAudienceData`, audienceData);
    dispatch({
      type: SAVE_AUDIENCE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SAVE_AUDIENCE_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}


export const getAudienceDataAction = (dataHeroInfo) => async (dispatch) => {
  dispatch({
    type: GET_AUDIENCE_DATA_REQUEST,
    payload: dataHeroInfo
  });
  try {
    const { data } = await Axios.post(`${URL2}/getAudienceData`, dataHeroInfo);
    dispatch({
      type: GET_AUDIENCE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_AUDIENCE_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}