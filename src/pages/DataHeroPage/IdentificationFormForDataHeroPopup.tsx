import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  InputNumber,
  message,
  Select,
  AutoComplete,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { ALL_INDUSTRY, ALL_WHO_AM_I } from "../../constants/helperConstant";

const { TextArea } = Input;

interface UserProfileFormValues {
  profilePicture: UploadFile[];
  resume: UploadFile[];
  firstName: string;
  lastName: string;
  role: string;
  experience: number;
  aboutYourself: string;
  linkedin: string;
  email: string;
  phone: string;
  upiId: string;
  industry: string;
}

interface IdentificationFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSave: (formData: any) => void;
}

export const IdentificationFormForDataHeroPopup: React.FC<
  IdentificationFormProps
> = ({ open, setOpen, handleSave }) => {
  const [form] = Form.useForm<UserProfileFormValues>();
  const [profilePicList, setProfilePicList] = useState<UploadFile[]>([]);
  const [resumeList, setResumeList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    setProfilePicList([]);
    setResumeList([]);
    setOpen(false);
  };

  const uploadFileToAWS = async (file: File): Promise<string> => {
    try {
      // Get pre-signed URL from your backend
      const awsResponse = await getAWSUrlToUploadFile(
        file.type,
        file.name?.split(".")[0]
      );

      if (!awsResponse.url) {
        throw new Error("Failed to get AWS upload URL");
      }

      await saveFileOnAWS(awsResponse.url, file);
      return awsResponse.awsURL;
    } catch (error) {
      message.error("File upload failed. Please try again.");
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      const values = await form.validateFields();

      // Upload files in parallel
      const [profilePicUrl, resumeUrl] = await Promise.all([
        profilePicList[0]?.originFileObj
          ? uploadFileToAWS(profilePicList[0].originFileObj)
          : Promise.resolve(""),
        resumeList[0]?.originFileObj
          ? uploadFileToAWS(resumeList[0].originFileObj)
          : Promise.resolve(""),
      ]);

      const formData = {
        ...values,
        name: `${values.firstName} ${values.lastName}`,
        avatar: profilePicUrl,
        resumeUrl: resumeUrl,
      };

      handleSave(formData);
      message.success("Profile submitted successfully!");
      handleCancel();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setUploading(false);
    }
  };

  const normFile = (e: any): UploadFile[] => {
    if (Array.isArray(e)) return e;
    return e?.fileList || [];
  };

  return (
    <Modal
      title=""
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      width={700}
      footer={[
        <Button key="back" onClick={handleCancel} className="mr-2">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          className="bg-[#3A9868]"
          loading={uploading}
        >
          Next
        </Button>,
      ]}
    >
      <div className="h-[70vh] overflow-y-scroll scrollbar-minimal pr-2">
        <h1 className="text-[#12334B] text-[36px] font-semibold leading-2 tracking-normal font-inter">
          Identify Yourself
        </h1>
        <h1 className="text-[#4F718A] text-[16px] font-normal leading-7 tracking-normal font-inter">
          Post application and the research paper shall be completed in 48 hours
        </h1>
        <div className="border w-full mt-4" />

        <Form form={form} layout="vertical" className="mt-6">
          <div className="flex gap-4">
            <Form.Item
              name="profilePicture"
              label="Profile Picture"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              className="custom-error-text"
              rules={[
                {
                  required: true,
                  message: "Please upload your profile picture",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                onChange={({ fileList }) => setProfilePicList(fileList)}
                fileList={profilePicList}
                accept="image/*"
                maxCount={1}
                className="avatar-uploader"
              >
                {profilePicList.length === 0 && (
                  <div className="flex flex-col items-center justify-center">
                    <UploadOutlined className="text-2xl text-gray-500" />
                    <span className="mt-2 text-sm text-gray-500">
                      Upload Profile
                    </span>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              name="resume"
              label="Upload Resume"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              className="custom-error-text"
              rules={[{ required: true, message: <span style={{ fontSize: "8px" }}>Please upload your resume</span> }]}
            >
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                onChange={({ fileList }) => setResumeList(fileList)}
                fileList={resumeList}
                accept=".pdf,.doc,.docx"
                maxCount={1}
              >
                {resumeList.length === 0 && (
                  <div className="flex flex-col items-center justify-center">
                    <UploadOutlined className="text-2xl text-gray-500" />
                    <span className="mt-2 text-sm text-gray-500">
                      Upload Resume
                    </span>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Other form items remain the same */}
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name" },
              ]}
            >
              <Input placeholder="John" className="w-full" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name" },
              ]}
            >
              <Input placeholder="Doe" className="w-full" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Who I Am?"
              rules={[
                { required: true, message: "Please describe who you are" },
              ]}
            >
              <AutoComplete
                options={ALL_WHO_AM_I?.map((v: any) => {return {value: v.toUpperCase()}})}
                placeholder="e.g., Software Developer"
                filterOption={(inputValue, option) =>
                  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={(value) => {
                  form.setFieldsValue({ role: value.toUpperCase() });
                }}
                onChange={(value) => {
                  form.setFieldsValue({ role: value.toUpperCase() });
                }}
              
              />
              {/* <Input
                placeholder="e.g., Software Developer"
                className="w-full"
              /> */}
            </Form.Item>

            <Form.Item
              name="experience"
              label="Experience (in years)"
              rules={[
                { required: true, message: "Please input your experience" },
              ]}
            >
              <InputNumber min={0} max={50} className="w-full" />
            </Form.Item>
            <Form.Item
              name="industry"
              label="Industry"
              rules={[
                { required: true, message: "Please input your industry" },
              ]}
            >
              <AutoComplete
                options={ALL_INDUSTRY?.map((v: any) => {return {value: v.toUpperCase()}})}
                placeholder="e.g., Industry"
                filterOption={(inputValue, option) =>
                  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={(value) => {
                  form.setFieldsValue({ industry: value.toUpperCase() });
                }}
                onChange={(value) => {
                  form.setFieldsValue({ industry: value.toUpperCase() });
                }}
                className="w-full"
              />
              {/* <Input placeholder="e.g., Software" className="w-full"
                onChange={(e) => {
                  const upperValue = e.target.value.toUpperCase();
                  form.setFieldsValue({ industry: upperValue });
                }}
              /> */}
            </Form.Item>

            <Form.Item
              name="email"
              label="Email ID"
              rules={[
                { required: true, message: "Please input your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="john.doe@example.com" className="w-full" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              ]}
            >
              <Input placeholder="9876543210" className="w-full" />
            </Form.Item>

            <Form.Item
              name="upiId"
              label="UPI ID"
              rules={[{ required: false, message: "Please input your UPI ID" }]}
            >
              <Input placeholder="john.doe@upi" className="w-full" />
            </Form.Item>
          </div>

          <Form.Item
            name="aboutYourself"
            label="About Yourself"
            rules={[
              { required: true, message: "Please tell us about yourself" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Describe yourself in a few words..."
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="linkedin"
            label="LinkedIn Profile"
            rules={[
              {
                required: true,
                message: "Please input your LinkedIn profile URL",
              },
            ]}
          >
            <Input
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full"
            />
          </Form.Item>
          <p className="text-[#4F718A] text-[14px] font-normal leading-0 tracking-normal font-inter w-[90%] ">
            Approval shall be granted in <span className="font-bold">24 </span>
            hours post application and the research paper shall be completed in
            48 hours window thereafter.
          </p>
        </Form>
      </div>
    </Modal>
  );
};
