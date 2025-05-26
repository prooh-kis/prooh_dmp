import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  PageNotFound,
  Dashboard,
  DataHeroPage,
  InputPage,
  VerifyEmail,
  UpdatePassword,
} from "../pages";

import {
  AUTH,
  DASHBOARD,
  FORGET_PASSWORD,
  HOME,
  HOMEPAGE,
  RESEARCH,
  SIGN_UP,
  UPDATE_PASSWORD,
  VERIFY_EMAIL,
} from "./routes";
import { PublicRoute } from "../layout/PublicRoute";
import { PrivateRoute } from "../layout/PrivateRoute";
import { SignIn } from "../pages/AuthPage/SignIn";
import { ForgetPassword } from "../pages/AuthPage/ForgetPassword";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AUTH}
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path={SIGN_UP}
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path={VERIFY_EMAIL}
          element={
            <PublicRoute>
              <VerifyEmail/>
            </PublicRoute>
          }
        />
        <Route
          path={FORGET_PASSWORD}
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route
          path={UPDATE_PASSWORD}
          element={
            <PublicRoute>
              <UpdatePassword />
            </PublicRoute>
          }
        />
        <Route
          path={HOME}
          element={
            <PublicRoute>
              <DataHeroPage />
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
        <Route
          path={RESEARCH}
          element={
            <PublicRoute>
              <InputPage />
            </PublicRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
