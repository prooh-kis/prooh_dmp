import { AUTH } from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../actions/userAction";
import { useState } from "react";

export const Menu = (props: any) => {
  const { userInfo } = props;
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const signOutHandler = () => {
    toggleDropdown();
    dispatch(signout());
    navigate('/');
  };

  const managerArray = [
    {
      label: "Research",
      path: `/research/${userInfo?._id}`,
    },
  ];

  return (
    <div className="relative inline-block text-left">
      <i
        className="fi fi-ss-angle-down flex items-center cursor-pointer"
        onClick={toggleDropdown}
      ></i>
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)} // Close dropdown on mouse leave
          className="absolute z-10 mt-2 w-[200px] bg-[#FFFFFF] border border-[#D6D2D2] rounded-md shadow-lg right-0 font-bold text-lg text-black-1000"
        >
          {managerArray.map((data: any, index: any) => (
            <div
              key={index}
              onClick={() => {
                toggleDropdown();
                navigate(data.path);
              }}
              className="px-4 py-2  text-gray-700 hover:bg-[#129BFF] hover:text-[#FFFFFF] cursor-pointer"
            >
              {data?.label}
            </div>
          ))}
          <div
            onClick={signOutHandler}
            className="px-4 py-2 text-gray-700 hover:bg-[#129BFF] hover:text-[#FFFFFF] cursor-pointer"
          >
            Log out
          </div>
        </div>
      )}
    </div>
  );
};
