import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../actions/userAction";
import { USER_UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate, useSearchParams } from "react-router-dom";

export const UpdatePassword = (props: any) => {
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const dispatch = useDispatch<any>();
  const naviaget = useNavigate();
  const [searchParams] = useSearchParams();
  const userUpdatePassword = useSelector(
    (state: any) => state.userUpdatePassword
  );
  const { error, success, data } = userUpdatePassword;

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: USER_UPDATE_PASSWORD_RESET });
    }
    if (success) {
      alert(data);
      dispatch({ type: USER_UPDATE_PASSWORD_RESET });
      naviaget("/signin");
    }
  }, [error, success]);

  const validateForm = () => {
    if (password.length < 8) {
      alert("Password length must be atleast 8");
      return false;
    } else if (password != confirmPassword) {
      alert("Password amd confirm password mismatch");
      setPassword("");
      setConfirmPassword("");
      return false;
    } else {
      return true;
    }
  };

  //   userUpdatePassword

  const handleSavePassword = () => {
    if (validateForm()) {
      dispatch(updateUserPassword(searchParams.get("email") || "", password));
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-100">
      <div className="w-[90%] lg:w-[400px] rounded-[15px] bg-white px-5 lg:px-8 py-6 lg:py-10 shadow-lg">
        <div className="flex flex-col gap-4">
          <h1 className="items-center text-xl font-bold">
            Set New Password
          </h1>
          <div className="flex flex-col gap-2">
            <label>New Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter new password"
              className="border border-solid rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Confirm New Password*</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Enter confirm new password"
              className="border border-solid rounded p-2"
            />
          </div>
          <div className="flex justify-center pt-4">
            <button
              className="w-full rounded border-2 border-[#129BFF]  bg-[#129BFF] text-[#ffffff] text-xl py-2  hover:bg-[#107ACC]"
              type={"submit"}
              onClick={handleSavePassword}
            >
              Save New Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
