import React, { ElementType } from "react";
import { Header } from "../../components/header";

interface IProps {
  layout: ElementType;
}

export const PublicRoute = (props: any) => {
  const { children } = props;

  return (
    <div className="h-[100vh] w-[100vw] p-0 m-0">
      <Header />
      <div className="h-[100vh] w-[100vw]  bg-gray-100 pt-32">{children}</div>
    </div>
  );
};
