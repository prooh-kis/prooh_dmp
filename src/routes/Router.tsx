import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, HomePageLayout } from "../components";

import {
  AuthPage,
  ForgetPassword,
  HomePage,
  LandingPage,
  PageNotFound,
  UpdatePassword,
  VerifyEmail,
} from "../pages";

import { PrivateRoute } from "./PrivateRoute";
import {
  AUTH,
  FORGET_PASSWORD,
  HOME,
  HOMEPAGE,
  UPDATE_PASSWORD,
  VERIFY_EMAIL,
} from "./routes";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path={AUTH}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <AuthPage />
            </PrivateRoute>
          }
        />
        <Route
          path={VERIFY_EMAIL}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <VerifyEmail />
            </PrivateRoute>
          }
        />
        <Route
          path={FORGET_PASSWORD}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <ForgetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path={UPDATE_PASSWORD}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
        <Route path={HOME} element={<LandingPage />} />
        <Route path={HOMEPAGE} element={<HomePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
