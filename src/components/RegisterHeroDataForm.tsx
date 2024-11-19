import React, { useEffect } from "react";
import { Form, Input, Select, message } from "antd";
import { IconInputField } from "./atoms/IconInputField";
import { ALL_TOUCHPOINTS, ALL_MARKETS } from "../constants/heplerConstant";
import { useDispatch } from "react-redux";
import { registerHeroData } from "../actions/heroDataAction";
import { useSelector } from "react-redux";
import { USER_SIGNUP_RESET } from "../constants/userConstants";
const { Option } = Select;

export const RegisterHeroDataForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<any>();

  const heroDataRegister = useSelector((state: any) => state.heroDataRegister);
  const { loading, error, success, data } = heroDataRegister;

  const onFinish = (values: any) => {
    console.log("values", values);
    dispatch(
      registerHeroData({ ...values, email: values.email.toLowerCase() })
    );
  };

  useEffect(() => {
    if (success) {
      message.success(data);
      dispatch({ type: USER_SIGNUP_RESET });
      form.resetFields();
    }

    if (error) {
      message.error(error);
      dispatch({ type: USER_SIGNUP_RESET });
    }
  }, [success, error]);

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 w-[736px] pt-4">
          <Form.Item
            label={<label style={{ color: "#000000" }}>Full Name</label>}
            name="name"
            rules={[
              {
                required: true,
                message: "Enter full name",
              },
            ]}
          >
            <Input size="large" placeholder="Enter Full Name" />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "#000000" }}>I Am An</label>}
            name="role"
            rules={[
              {
                required: true,
                message: "Select role",
              },
            ]}
          >
            <Select size="large" placeholder="Select">
              <Option value={"Media Buyer"}>
                <div className="flex gap-2 items-center text-[#5A7E92]">
                  <i className="fi fi-sr-user"></i>
                  <h1>Media Buyer</h1>
                </div>
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "#000000" }}>Email Id</label>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please email!",
              },
            ]}
          >
            <IconInputField
              icon={<i className="fi fi-sr-envelope text-blue-500"></i>}
              placeholder="Please Enter Email"
            />
          </Form.Item>

          <Form.Item
            label={
              <label style={{ color: "#000000" }}>
                I Am The Export The City
              </label>
            }
            name="market"
            rules={[{ required: true, message: "Please select market" }]}
          >
            <Select size="large" placeholder="Please select market">
              {ALL_MARKETS.map((value, index) => (
                <Option value={value} key={index}>
                  <div className="flex gap-2 items-center text-[#5A7E92]">
                    <i className="fi fi-rs-marker"></i>
                    <h1>{value}</h1>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "#000000" }}>Phone Number</label>}
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter phone number!",
              },
            ]}
          >
            <IconInputField
              icon={<i className="fi fi-sr-phone-call text-[#5A7E92]"></i>}
              placeholder="Please Enter Phone Number"
            />
          </Form.Item>

          <Form.Item
            label={
              <label style={{ color: "#000000" }}>Selected TouchPoint</label>
            }
            name="touchPoints"
            rules={[
              {
                required: true,
                message: "Select touch points!",
              },
            ]}
          >
            <Select size="large" placeholder="Select touch points">
              {ALL_TOUCHPOINTS.map((value, index) => (
                <Option value={value} key={index}>
                  <div className="flex gap-2 items-center text-[#5A7E92]">
                    <i className="fi fi-rs-marker"></i>
                    <h1>{value}</h1>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "#000000" }}>UPI Id</label>}
            name="upiId"
            rules={[
              {
                required: true,
                message: "Please Enter UPI Id",
              },
            ]}
          >
            <IconInputField
              icon={<i className="fi fi-br-expense text-[#5A7E92]"></i>}
              placeholder="Please Enter UPI Id"
            />
          </Form.Item>
        </div>
        <Form.Item>
          <button
            type="submit"
            className="h-16 w-full bg-[#D9DFE2] text-white text-[20px] font-semibold flex justify-center items-center rounded-md hover:bg-gray-400"
          >
            Send Me Link
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
