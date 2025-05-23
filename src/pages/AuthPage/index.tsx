import React, { useEffect, useState } from "react";

import { Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signin } from "../../actions/userAction";
import { useSelector } from "react-redux";

export { ForgetPassword } from "./ForgetPasswod";
export { VerifyEmail } from "./VerifyEmail";
export { UpdatePassword } from "./UpdatePassword";

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState<any>(
    localStorage.getItem("myapp-email") || ""
  );
  const [password, setPassword] = useState<any>(
    localStorage.getItem("myapp-password") || ""
  );
  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading, error: errorSignIn, success, userInfo } = userSignin;

  useEffect(() => {
    localStorage.setItem("myapp-email", email);
  }, [email]);

  useEffect(() => {
    if (success) {
      navigate("/research");
    }
    if (errorSignIn) {
      message.error(errorSignIn);
    }
  }, [errorSignIn, success, navigate]);

  const onFinish = (values: any) => {
    dispatch(signin(email));
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16 ">
      <div className="w-[90%] lg:w-[400px] rounded-[15px] bg-white px-5 lg:px-8 py-6 lg:py-10 shadow-lg">
        <div className="flex flex-col gap-4">
          <h1 className="items-center text-xl font-bold"> Welcome Back</h1>
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            fields={[
              { name: ["email"], value: email },
              { name: ["password"], value: password },
            ]}
          >
            <Form.Item
              label={
                <h1 className="items-center text-[16px] font-bold text-[#555555]">
                  Email
                </h1>
              }
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                value={email}
                placeholder="Enter username or email"
                onChange={(e) => setEmail(e.target.value)}
                size="large"
                style={{ borderColor: "#DDDDDD", padding: "6px 12px" }}
              />
            </Form.Item>

            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-1">
                <input
                  title="q"
                  type="checkbox"
                  id="rememberMe"
                  checked
                  onChange={() => {}}
                />
                <label className="text-sm" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
            </div>

            <Form.Item style={{ marginBottom: "0", paddingTop: "20px" }}>
              <div className="pt-2 flex flex-col gap-4">
                <button
                  className="w-full bg-[#129BFF] text-[#ffffff] text-xl py-2 "
                  type={"submit"}
                >
                  {loading ? "Please wait..." : "Sign In"}
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
