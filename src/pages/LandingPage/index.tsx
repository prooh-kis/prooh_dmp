import React from "react";
import image1 from "../../assets/images/Layer_2.png";
import image2 from "../../assets/images/aaa.png";
import image3 from "../../assets/images/bbb.png";
import image4 from "../../assets/images/cccc.png";
import image5 from "../../assets/images/dddd.png";
import { Form, Input, Select } from "antd";
import { IconInputField } from "../../components/atoms/IconInputField";
import { Footer } from "../../components/footer";
const { Option } = Select;

export const LandingPage: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <div className="p-20 gap-8 flex flex-col">
        <div className="flex w-full justify-between">
          <div className="w-[40%]">
            <h1 className="text-[#129BFF] text-[64px] font-bold	 p-0 m-0">
              Be A Data Hero
            </h1>
            <h1 className="text-[#254354] text-[48px] font-semibold p-0 m-0">
              Join Our Research Team Today
            </h1>
            <ul className="text-[#254354] space-y-1 list-disc list-inside pt-4">
              <li>
                Participate in a 20 mins Online Research and earn
                <span className="text-[#129BFF]"> INR 5K </span>
                instantly.
              </li>
              <li>
                64 Respondents have already participated in our research.
                <span className="text-[#129BFF] underline underline-offset-1 decoration-1 decoration-blue-400">
                  Know more
                </span>
              </li>
              <li>Find below, the scope of work & Eligibility Criteria.</li>
              <li>
                Approval shall be granted in{" "}
                <span className="text-[#129BFF]"> 24</span> hours post
                application and the research paper shall be completed in 48
                hours window thereafter.
              </li>
            </ul>
          </div>
          <div>
            <img src={image1} alt="" />
          </div>
        </div>
        <div className="flex justify-between ">
          <div>
            <img src={image2} alt="" />
          </div>
          <div className="w-[40%]">
            <h1 className="text-[32px] text-[#254354] font-semibold">
              1. Scope Of Work
            </h1>
            <div className="pt-4">
              <div className="flex gap-4">
                <i className="fi fi-sr-circle-user text-[#129BFF] text-[24px]"></i>
                <h1>
                  The respondents Have To Edit The
                  <span className="text-[#129BFF]"> %</span>
                </h1>
              </div>
              <div className="flex gap-4">
                <i className="fi fi-sr-circle-user text-[#129BFF] text-[24px]"></i>
                <h1>
                  There Are <span className="text-[#129BFF]"> 50 cells </span>
                  Which Needs Action.
                </h1>
              </div>
              <div className="flex gap-4">
                <i className="fi fi-sr-circle-user text-[#129BFF] text-[24px]"></i>
                <h1>
                  This Takes About
                  <span className="text-[#129BFF]"> 30 mins. </span>
                </h1>
              </div>
              <div className="flex gap-4">
                <i className="fi fi-sr-circle-user text-[#129BFF] text-[24px]"></i>
                <h1>
                  Our Data Expert Is Available To Short Your Understanding If
                  Any Can Be Reached At
                  <span className="text-[#129BFF]"> +9810666666</span>
                </h1>
              </div>
              <div className="flex gap-4">
                <i className="fi fi-sr-circle-user text-[#129BFF] text-[24px]"></i>
                <h1>
                  Upon Completion Of The Form, The Respondent Gets{" "}
                  <span className="text-[#129BFF]"> INR 5K </span>Credited To
                  His Bank account.
                </h1>
              </div>
              <div className="flex gap-4">
                <i className="fi fi-sr-circle-user text-[#129BFF] text-[24px]"></i>
                <h1>
                  Respondent Also Gets Published In All Data Sets Shared With
                  Clients/Agencies And Is Highlighted In Our List Of
                  Respondents.
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between ">
          <div className="w-[40%]">
            <h1 className="text-[32px] text-[#254354] font-semibold">
              2.Eligibility Criteria
            </h1>
            <h1 className="font-semibold text-[20px]  pt-4">
              We are currently looking to engage with the following:
            </h1>
            <div className="pt-4">
              <div className="flex gap-4">
                <i className="fi fi-sr-circle-user text-[#129BFF] text-[24px]"></i>
                <h1>{`Regional Sales Heads of Premium QSR's in Delhi NCR`}</h1>
              </div>
              <div className="flex gap-4">
                <i className="fi fi-sr-circle-user text-[#129BFF] text-[24px]"></i>
                <h1>F&B Real estate Brokerage firms.</h1>
              </div>
              <div className="flex gap-4">
                <i className="fi fi-sr-circle-user text-[#129BFF] text-[24px]"></i>
                <h1>
                  OOH media buying experts in buying OOH media in delhi NCR.
                </h1>
              </div>
              <div className="flex gap-4">
                <i className="fi fi-sr-circle-user text-[#129BFF] text-[24px]"></i>
                <h1>
                  media owner in Delhi NCR with avg turnover of running
                  <span className="text-[#129BFF]"> 100+ </span>post covid.
                </h1>
              </div>
            </div>
          </div>
          <div>
            <img src={image3} alt="" />
          </div>
        </div>
        <div className="flex justify-between ">
          <div>
            <img src={image4} alt="" />
          </div>
          <div className="w-[50%]">
            <h1 className="text-[32px] text-[#254354] font-semibold">
              3.Region Focussed!!
            </h1>
            <h1 className="text-[16px]  pt-4">
              1. We Are Currently Looking To Seek Data In The Following Cities
            </h1>
            <div className="flex gap-8 items-center text-[#254354] pt-4">
              <div className="flex gap-2 items-center">
                <div className="rounded-full h-2 w-2  bg-black"></div>
                <h1>Delhi</h1>
              </div>
              <div className="flex gap-2 items-center">
                <div className="rounded-full h-2 w-2  bg-black"></div>
                <h1>Mumbai</h1>
              </div>
              <div className="flex gap-2 items-center">
                <div className="rounded-full h-2 w-2  bg-black"></div>
                <h1>Bengalor</h1>
              </div>
            </div>
            <h1 className="text-[16px]  pt-4">
              2. We Are Currently Looking To Seek Data In The Following
              Touchpoints
            </h1>
            <div className="flex gap-8 items-center text-[#254354] pt-4">
              <div className="flex gap-2 items-center">
                <div className="rounded-full h-2 w-2  bg-black"></div>
                <h1>Road Network</h1>
              </div>
              <div className="flex gap-2 items-center">
                <div className="rounded-full h-2 w-2  bg-black"></div>
                <h1>F&B Cluster</h1>
              </div>
              <div className="flex gap-2 items-center">
                <div className="rounded-full h-2 w-2  bg-black"></div>
                <h1>Premium Offices</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[40px] font-bold text-[#254354] pt-4">
            Apply Now To Become Data Hero
          </h1>
          <h1 className="text-[16px]  text-[#254354] pt-4">
            Data-Driven, Automated Ad Buying Is Now Easier Than Ever, Prooh Is
            Designed To Do Away With
          </h1>
          <Form
            layout="vertical"
            form={form}
            autoComplete="off"
            onFinish={() => {}}
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 w-[736px] pt-4">
              <Form.Item
                label={<label style={{ color: "#000000" }}>Full Name</label>}
                name="bankName"
                rules={[
                  {
                    required: true,
                    message: "Select bank name!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Full Name" />
              </Form.Item>
              <Form.Item
                label={<label style={{ color: "#000000" }}>I Am An</label>}
                name="bankName"
                rules={[
                  {
                    required: true,
                    message: "Select bank name!",
                  },
                ]}
              >
                <Select size="large" placeholder="Select bank name">
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
                name="ifscCode"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Select size="large" placeholder="Select bank name">
                  <Option value={"Delhi"}>
                    <div className="flex gap-2 items-center text-[#5A7E92]">
                      <i className="fi fi-rs-marker"></i>
                      <h1>Delhi</h1>
                    </div>
                  </Option>
                  <Option value={"Mumbai"}>
                    <div className="flex gap-2 items-center text-[#5A7E92]">
                      <i className="fi fi-rs-marker"></i>
                      <h1>Mumbai</h1>
                    </div>
                  </Option>{" "}
                  <Option value={"Bengalor"}>
                    <div className="flex gap-2 items-center text-[#5A7E92]">
                      <i className="fi fi-rs-marker"></i>
                      <h1>Bengalor</h1>
                    </div>
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={<label style={{ color: "#000000" }}>Phone Number</label>}
                name="accountHolderName"
                rules={[
                  {
                    required: true,
                    message: "Please input your fullName!",
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
                  <label style={{ color: "#000000" }}>
                    Selected TouchPoint
                  </label>
                }
                name="currentBalance"
                rules={[
                  {
                    required: true,
                    message: "Please input current balance!",
                  },
                ]}
              >
                <Select size="large" placeholder="Select bank name">
                  <Option value={"Delhi"}>
                    <div className="flex gap-2 items-center text-[#5A7E92]">
                      <i className="fi fi-rs-marker"></i>
                      <h1>Delhi</h1>
                    </div>
                  </Option>
                  <Option value={"Mumbai"}>
                    <div className="flex gap-2 items-center text-[#5A7E92]">
                      <i className="fi fi-rs-marker"></i>
                      <h1>Mumbai</h1>
                    </div>
                  </Option>{" "}
                  <Option value={"Bengalor"}>
                    <div className="flex gap-2 items-center text-[#5A7E92]">
                      <i className="fi fi-rs-marker"></i>
                      <h1>Bengalor</h1>
                    </div>
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={<label style={{ color: "#000000" }}>UPI Id</label>}
                name="accountType"
                rules={[
                  {
                    required: true,
                    message: "Please account type!",
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
      </div>
      <Footer />
    </div>
  );
};
