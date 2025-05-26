import React, { useEffect, useState } from "react";
import { Form, Input, Select, Tag, message } from "antd";
import { ALL_TOUCHPOINTS, ALL_MARKETS, ALL_MARKET_SITES } from "../constants/helperConstant";
import { useDispatch, useSelector } from "react-redux";
import { registerHeroData } from "../actions/heroDataAction";
import { USER_SIGNUP_RESET } from "../constants/userConstants";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

export const RegisterHeroDataForm = () => {
  const [form] = Form.useForm();
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const heroDataRegister = useSelector((state: any) => state.heroDataRegister);
  const { loading, error, success, data } = heroDataRegister;

  const onFinish = (values: any) => {
    console.log("values", values);
    dispatch(
      registerHeroData({ ...values, email: values.email.toLowerCase() , password : "12345678" })
    );
    setSelectedLocations([]);
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

  const handleTouchPointChange = (value: keyof typeof ALL_MARKET_SITES) => {
    const locations = ALL_MARKET_SITES[value] || [];
    setFilteredLocations(locations);
    setSelectedLocations([]); // Reset selected locations when touchpoint changes
    form.setFieldsValue({ locations: undefined }); // Reset dropdown value
  };

  const handleLocationChange = (value: string[]) => {
    setSelectedLocations(value);
    form.setFieldsValue({ locations: value });
  };
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ remember: true }}
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
            label={<label style={{ color: "#000000" }}>I Am</label>}
            name="role"
            rules={[
              {
                required: true,
                message: "Select role",
              },
            ]}
          >
            <Select size="large" placeholder="Select">
              <Option value={"Marketing Head"}>Head Of Marketing</Option>
              <Option value={"Sales Head"}>Head Of Sales</Option>
              <Option value={"Media Buying"}>Head Of Media Buying</Option>
              <Option value={"Technology Head"}>Head Of Technologies</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <label style={{ color: "#000000" }}>
                I am an expert for the city
              </label>
            }
            name="market"
            rules={[
              {
                required: true,
                message: "Select your city!",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Select your city"
            >
              <Option value={"Delhi NCR"} key={1}>
                {"Delhi NCR"}
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <label style={{ color: "#000000" }}>
                Selected TouchPoint
              </label>
            }
            name="touchPoint"
            rules={[
              {
                required: true,
                message: "Select touch points!",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Select touch points"
              onChange={handleTouchPointChange}
            >
              {ALL_TOUCHPOINTS.map((value, index) => (
                <Option value={value} key={index}>
                  {value}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <label style={{ color: "#000000" }}>
                Selected Locations
              </label>
            }
            name="locations"
            rules={[
              {
                required: true,
                message: "Please select location!",
              },
            ]}
          >
            <div>

              <Select
                size="large"
                placeholder="Please select locations"
                mode="multiple"
                value={selectedLocations}
                onChange={handleLocationChange}
                disabled={filteredLocations.length === 0}
              >
                {filteredLocations.map((location, index) => (
                  <Option value={location} key={index}>
                    {location}
                  </Option>
                ))}
              </Select>
              <div className="col-span-2 flex flex-wrap gap-2 pt-2">
                {selectedLocations.map((location) => (
                  <Tag
                    key={location}
                    color="blue"
                    closable
                    onClose={() => {
                      setSelectedLocations((prev) =>
                        prev.filter((item) => item !== location)
                      );
                    }}
                  >
                    {location}
                  </Tag>
                ))}
              </div>
            </div>

          </Form.Item>

          <Form.Item
            label={<label style={{ color: "#000000", height:"14px"}}>Email Id</label>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please email!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<i className="fi fi-sr-envelope text-blue-500 text-[12px] flex items-center"></i>}
              placeholder="Please Enter Email"
            />
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
            <Input
              size="large"
              prefix={<i className="fi fi-sr-phone-call text-[#5A7E92] text-[12px] flex items-center"></i>}
              placeholder="Please Enter Phone Number"
            />
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
            <Input
              size="large"
              prefix={<i className="fi fi-br-expense text-[12px] flex items-center"></i>}
              placeholder="Please Enter UPI Id"
            />
          </Form.Item>
        </div>
        <Form.Item>
          <button
            type="submit"
            className="h-16 w-full bg-[#D9DFE2] text-white text-[20px] font-semibold flex justify-center items-center rounded-md hover:bg-gray-400"
            disabled={loading}
          >
            Send Me Link
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
