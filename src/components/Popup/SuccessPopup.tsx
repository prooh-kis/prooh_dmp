import { useEffect } from "react";
import { checkedGif } from "../../assets";
import ButtonInput from "../../components/atoms/ButtonInput";
import { useNavigate } from "react-router-dom";

export const SuccessMessagePopup = (props: any) => {
  const { onClose, userInfo } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (props?.open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props?.open]);

  if (!props?.open) {
    return null;
  }
  return (
    <div className="font-custom fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full overflow-auto grid grid-rows-12"
        style={{ height: "60vh", width: "30vw" }}
      >
        <div className="row-span-1 flex justify-between items-center px-2">
          <h1 className="text-[16px] font-bold"></h1>

          <div className="flex gap-4 items-center">
            <i
              className="fi fi-br-cross text-[14px] cursor-pointer"
              onClick={onClose}
            />
          </div>
        </div>
        <div className="row-span-11 h-full flex flex-col justify-center items-center">
          <div className="flex items-center justify-center">
            <div className="h-32 w-32 rounded-full bg-[#3A9868] p-2 animate-pulse">
              <img src={checkedGif} alt="checked giffy" />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <h1 className="font-bold text-[48px] text-[#3A9868]">Success</h1>
          </div>

          <div className="flex items-center justify-center px-8 py-4">
            <p className="text-[14px] text-center">
              Thank you for submitting your information.
              <br />Our team will review it and get in touch
              <br />with you shortly
            </p>
          </div>

          <div className="py-4">
            <ButtonInput
              className="bg-[#3A9868] w-[10vw]"
              rounded="full"
              fullWidth={true}
              onClick={() => {
                navigate(`/dashboard/${userInfo?._id}`)
              }}
            >Done</ButtonInput>
          </div>
        </div>
      </div>
    </div>
  );
};
