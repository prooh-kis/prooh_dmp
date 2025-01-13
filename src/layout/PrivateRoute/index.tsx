import React, { ElementType, useEffect } from "react";
import { Header } from "../../components/header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";

interface IProps {
  layout: ElementType;
}

export const PrivateRoute = (props: any) => {
  const { children } = props;
  const navigate = useNavigate();

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

//   useEffect(() => {
//     if (!userInfo) {
//       navigate(AUTH);
//     }
//   }, [userInfo]);

  return (
    <div className="h-[100vh] w-[100vw] p-0 m-0">
      <Header />
      <div className="h-[100vh] w-[100vw]  bg-gray-100 pt-8">{children}</div>
    </div>
  );
};
