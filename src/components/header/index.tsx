import { signout } from "../../actions/userAction";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";
import { message } from "antd";

export const Header: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState<string>("Home");

  const userSignin = useSelector((state: any) => state.userSignin);
  const {
    error: errorSignIn,
    success: successSignin,
    userInfo: userInfo,
  } = userSignin;

  const [tabs, setTabs] = useState<any>([
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Research",
      path: `/homepage?userId=${userInfo?._id}`,
    },
  ]);

  const handleClick = (index: number) => {
    setCurrent(tabs[index]?.label);
    if (index == 1) {
      if (!userInfo) {
        message.error("please  signIn");
        navigate("/auth");
      }
      navigate(`/homepage?userId=${userInfo?._id}`);
    } else {
      navigate(tabs[index].path);
    }
  };

  const handleSignOut = () => {
    dispatch(signout());
    navigate("/");
  };

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
      <div className="col-span-2 flex items-center justify-end pr-8">
        <div className="flex gap-4 items-center">
          {tabs?.map((d1: any, index: any) => (
            <button
              key={d1?.label}
              type="button"
              onClick={() => handleClick(index)}
              className={`${
                current === d1.label
                  ? "text-sm lg:text-base text-[#129BFF] border-b-2 border-[#129BFF] py-5 leading-[20.69px] tracking-[0.01rem]"
                  : "text-sm lg:text-base py-1 text-[#888888] leading-[20.69px] tracking-[0.01rem]"
              }`}
            >
              {d1?.label}
            </button>
          ))}
          {userInfo ? (
            <button
              type="button"
              onClick={handleSignOut}
              className={`${"text-sm lg:text-base py-1 text-[#888888] leading-[20.69px] tracking-[0.01rem]"}`}
            >
              {`Sign Out`}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate(AUTH)}
              className={`${"text-sm lg:text-base py-1 text-[#888888] leading-[20.69px] tracking-[0.01rem]"}`}
            >
              {`Log In`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
