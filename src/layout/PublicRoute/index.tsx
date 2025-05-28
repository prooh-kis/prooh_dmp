import React, { ElementType } from "react";
import { Header } from "../../components/header";

interface IProps {
  layout: ElementType;
}

export const PublicRoute = (props: any) => {
  const { children , value } = props;

  return (
    <div className="h-screen w-screen flex flex-col font-custom">
      <Header value={value} />
      <div className="flex-grow bg-gray-100 pt-16 overflow-auto">{children}</div>
    </div>
  );
};
