import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<string>("Home");
  useEffect(() => {}, []);
  const sss = [
    {
      label: "Home",
      path: "/home",
    },
    {
      label: "About Us",
      path: "/aboutUs",
    },
    {
      label: "Contact Us",
      path: "/contactUs",
    },
    {
      label: "Research",
      path: "/research",
    },
    {
      label: "Help",
      path: "/home",
    },
    {
      label: "Login",
      path: "/home",
    },
  ];

  return (
    <div className="w-full h-16 bg-white border border-b flex items-center justify-between fixed z-50">
      <div className="col-span-2 flex items-center mx-10">
        <div
          className="flex flex-col mb-2 -space-y-1 pt-2"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl font-black">PROOH.AI</h1>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-end pr-4">
        <div className="flex gap-4">
          {sss?.map((data: any, index: any) => (
            <div
              className="flex flex-col gap-1 text-[#888888]"
              key={index}
              onClick={() => setCurrent(data?.label)}
            >
              <h1>{data?.label}</h1>
              {current === data?.label && (
                <div className="border border-1 border-[#129BFF] "></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
