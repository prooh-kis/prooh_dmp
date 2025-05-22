import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import {
  emailSendForConfirmationReducer,
  emailSendForVendorConfirmationReducer,
  userEmailVerificationReducer,
  userSendEmailToResetPasswordReducer,
  userSigninReducer,
  userSignupReducer,
  userUpdatePasswordReducer,
} from "../reducers/userReducers";
import {
  audienceDataSaveReducer,
  audienceDataGetReducer,
  getHeroDataDetailsReducer,
  heroDataRegisterReducer,
} from "../reducers/heroDataReducers";
import {
  addAudienceTypePercentDataReducer,
  addGenderWiseDataByAudienceTypeReducer,
  addImpactFactorDataReducer,
  addTimezoneWiseDataByAudienceTypeReducer,
  getAudienceTypePercentForGenderWiseTabReducer,
  getAvgAudienceDataByMarketSiteReducer,
  getAvgFootfallDataByMarketSiteReducer,
  getGenderWiseDataByAudienceTypeMarketSiteReducer,
  getImpactfactorDataByMarketSiteReducer,
  getTimezoneWiseDataByAudienceTypeMarketSiteReducer
} from "../reducers/audienceReducers";
import { getAudienceDataOnFiltersReducer, getRespondentCountIndustryWiseReducer, getRespondentProfileIndustryWiseReducer, getThirdPartyAudienceCountSourceWiseReducer } from "../reducers/dashboardReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

const store = configureStore({
  initialState,
  reducer: {
    // auth
    auth: authReducer,
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    userUpdatePassword: userUpdatePasswordReducer,
    emailVerify: userEmailVerificationReducer,
    userSendEmailToResetPassword: userSendEmailToResetPasswordReducer,
    emailSendForConfirmation: emailSendForConfirmationReducer,
    emailSendForVendorConfirmation: emailSendForVendorConfirmationReducer,

    // hero Data
    heroDataRegister: heroDataRegisterReducer,
    heroDataDetails: getHeroDataDetailsReducer,
    audienceDataSave: audienceDataSaveReducer,
    audienceDataGet: audienceDataGetReducer,

    getAvgAudienceDataByMarketSite: getAvgAudienceDataByMarketSiteReducer,
    getAvgFootfallDataByMarketSite: getAvgFootfallDataByMarketSiteReducer,
    getGenderWiseDataByAudienceTypeMarketSite: getGenderWiseDataByAudienceTypeMarketSiteReducer,
    getTimezoneWiseDataByAudienceTypeMarketSite: getTimezoneWiseDataByAudienceTypeMarketSiteReducer,
    getAudienceTypePercentForGenderWiseTab: getAudienceTypePercentForGenderWiseTabReducer,
    getImpactFactorDataByMarketSite: getImpactfactorDataByMarketSiteReducer,

    addAudienceTypePercentData : addAudienceTypePercentDataReducer,
    addGenderWiseDataByAudienceType : addGenderWiseDataByAudienceTypeReducer,
    addTimezoneWiseDataByAudienceType : addTimezoneWiseDataByAudienceTypeReducer,
    addImpactFactorData : addImpactFactorDataReducer,

    // dashboard
    getRespondentCountIndustryWise: getRespondentCountIndustryWiseReducer,
    getThirdPartyAudienceCountSourceWise: getThirdPartyAudienceCountSourceWiseReducer,
    getRespondentProfileIndustryWise: getRespondentProfileIndustryWiseReducer,
    getAudienceDataOnFilters: getAudienceDataOnFiltersReducer,
  },
  // middleware: thunk
  // devTools: process.env.NODE_ENV !== 'production'
});

store.subscribe(() => {
  const state = store.getState();
  if (state.auth.isLoggedIn) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        userInfo: state.auth.userInfo,
        loginTime: state.auth.loginTime,
      })
    );
    // localStorage.setItem(
    //   "userInfo",
    //   JSON.stringify({ userInfo: state.auth.userInfo })
    // );
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
  }
});

export default store;
