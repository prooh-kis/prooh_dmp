import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, HomePageLayout } from "../components";

import {
  AuthPage,
  DashboardPage,
  ForgetPassword,
  HomePage,
  LandingPage,
  PageNotFound,
  UpdatePassword,
  VerifyEmail,
  Dashboard
} from "../pages";

import {
  AUTH,
  DASHBOARD,
  FORGET_PASSWORD,
  HOME,
  HOMEPAGE,
  UPDATE_PASSWORD,
  VERIFY_EMAIL,
} from "./routes";
import { PublicRoute } from "../layout/PublicRoute";
import { PrivateRoute } from "../layout/PrivateRoute";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AUTH}
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path={HOME}
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path={HOMEPAGE}
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path={DASHBOARD}
          element={
            <PublicRoute>
              <Dashboard />
            </PublicRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
