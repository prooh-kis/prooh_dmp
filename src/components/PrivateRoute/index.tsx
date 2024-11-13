import React from "react";

export const PrivateRoute = (props: any) => {
  return (
    <div className="w-full h-full grid grid-cols-12 p-8">{props.Children}</div>
  );
};
