import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH, DASHBOARD, HOME } from "../../routes/routes";
import { Layer } from "../../assets";
import ButtonInput from "../../components/atoms/ButtonInput";
import { Menu } from "./Menu";

interface Tab {
  label: string;
  path: string;
}

export const Header: React.FC<{ value?: string }> = ({ value }) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<string>("Home");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const [tabs] = useState<Tab[]>([
    { label: "Home", path: HOME },
    { label: "Dashboard", path: DASHBOARD },
  ]);

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab.label);
    navigate(tab.path);
  };

  const handleLogoClick = () => {
    navigate(userInfo ? `/research/${userInfo?._id}` : "/");
  };

  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between fixed z-50 px-4 sm:px-10">
      {/* Logo Section */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleLogoClick}
      >
        <img src={Layer} className="h-8 w-8" alt="Layer logo" />
        <div>
          <h1 className="text-base text-[#1E376E] font-black">Layer</h1>
          <p className="text-xs text-[#6F7F8E]">
            powered by <span className="italic">PROOH.AI</span>
          </p>
        </div>
      </div>

      {/* Navigation Section */}
      {userInfo ? (
        <div className="flex items-center space-x-2 relative">
          <img
            src={userInfo?.avatar}
            alt="User profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="truncate max-w-[120px]">
            <h3 className="text-lg font-semibold truncate">{userInfo.name}</h3>
            <p className="text-xs font-bold text-gray-700 truncate">
              {userInfo.userRole}
            </p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <Menu userInfo={userInfo} />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`text-sm sm:text-base transition-colors border-b-2 py-4 ${
                  currentTab === tab.label
                    ? "text-[#129BFF] border-[#129BFF] font-medium"
                    : "text-[#888888] hover:text-[#129BFF] border-[#FFFFFF]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <ButtonInput
            onClick={() => navigate(AUTH)}
            rounded="full"
            className="min-w-[100px]"
          >
            Sign In
          </ButtonInput>
        </div>
      )}
    </header>
  );
};
