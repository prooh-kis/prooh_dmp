import { useEffect } from "react";

export const DataHeroProfilePopup = (props: any) => {
  const { loading, onClose, heroDetails } = props;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div
        className="bg-[#FFFFFF] mt-8 px-2 rounded-lg shadow-lg w-full max-w-full overflow-auto max-h-auto "
        style={{ height: "80vh", width: "70vw" }}

      >
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          <h1 className="text-[20px] font-bold">Respondent Profile</h1>
          <i className="fi fi-rr-circle-xmark text-[20px] cursor-pointer" onClick={onClose} />
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-3 border-r border-gray-300 p-2">
            <div className="flex gap-2 p-4 h-[100px]">
              <div className="w-[100px] h-[100px] rounded-[8px] border border-[#D7D7D730]">
                <img className="rounded-[8px]" src={heroDetails?.avatar} alt={heroDetails?.name} />
              </div>
              <div className="flex flex-start flex-col">
                <h1 className="text-[20px] font-semibold">{heroDetails?.name}</h1>
                <p className="text-[14px] text-gray-500 font-medium">{heroDetails?.designation}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-[14px]">
                {heroDetails?.aboutYourself}
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <div className="border rounded-[4px] p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fi fi-sr-envelope flex items-center text-[#129BFF]" />
                  <a href={`mailto:${heroDetails?.email}`} target="_blank" rel="noopener noreferrer">
                    <p className="text-[14px] font-medium text-[#0E212E]">Email</p>
                  </a>
                </div>
                <div>
                  <i className="fi fi-br-angle-small-right text-[#0E212E] flex items-center justify-center" />
                </div>
              </div>
              <div className="border rounded-[4px] p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fi fi-brands-linkedin flex items-center text-[#0c69c7]" />
                  <a href={`${heroDetails?.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <p className="text-[14px] font-medium text-[#0E212E]">LinkedIn</p>
                  </a>
                </div>
                <div>
                  <i className="fi fi-br-angle-small-right text-[#0E212E] flex items-center justify-center" />
                </div>
              </div>
              <div className="border rounded-[4px] p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fi fi-sr-resume flex items-center text-[#FF0000]" />
                  <a href={`${heroDetails?.resumeUrl}`} target="_blank" rel="noopener noreferrer">
                    <p className="text-[14px] font-medium text-[#0E212E]">Resume</p>
                  </a>
                </div>
                <div>
                  <i className="fi fi-br-angle-small-right text-[#0E212E] flex items-center justify-center" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 p-2">
            <div className="w-full py-2">
              <h1 className="m-2 text-[16px] font-semibold">Professional Details</h1>
              <div className="grid grid-cols-6 flex items-center border-b border-gray-300 p-2">
                <div className="col-span-3 flex items-center gap-2">
                  <div className="rounded-full bg-[#3A9868] p-2">
                    <i className="fi fi-sr-customize-computer text-[14px] text-white flex items-center justify-center"></i>
                  </div>
                  <h1 className="text-[14px] font-semibold">Designation</h1>
                </div>
                <div className="col-span-3">
                  <p className="text-[14px]">{heroDetails?.designation}</p>
                </div>
              </div>
              <div className="grid grid-cols-6 flex items-center border-b border-gray-300 p-2">
                <div className="col-span-3 flex items-center gap-2">
                  <div className="rounded-full bg-[#3A9868] p-2">
                    <i className="fi fi-sr-industry-windows text-[14px] text-white flex items-center justify-center"></i>
                  </div>
                  <h1 className="text-[14px] font-semibold">Industry</h1>
                </div>
                <div className="col-span-3">
                  <p className="text-[14px]">{heroDetails?.industry}</p>
                </div>
              </div>
              <div className="grid grid-cols-6 flex items-center border-b border-gray-300 p-2">
                <div className="col-span-3 flex items-center gap-2">
                  <div className="rounded-full bg-[#3A9868] p-2">
                    <i className="fi fi-sr-employee-man text-[14px] text-white flex items-center justify-center"></i>
                  </div>
                  <h1 className="text-[14px] font-semibold">Experience</h1>
                </div>
                <div className="col-span-3">
                  <p className="text-[14px]">{heroDetails?.experience}</p>
                </div>
              </div>
            </div>
            <div className="w-full py-2">
              <h1 className="m-2 text-[16px] font-semibold">Worked On</h1>
              <div className="grid grid-cols-6 flex items-center border-b border-gray-300 p-2">
                <div className="col-span-3 flex items-center gap-2">
                  <div className="rounded-full bg-[#3A9868] p-2">
                    <i className="fi fi-ss-building text-[14px] text-white flex items-center justify-center"></i>
                  </div>
                  <h1 className="text-[14px] font-semibold">City</h1>
                </div>
                <div className="col-span-3">
                  <p className="text-[14px]">{heroDetails?.market}</p>
                </div>
              </div>
              <div className="grid grid-cols-6 flex items-center border-b border-gray-300 p-2">
                <div className="col-span-3 flex items-center gap-2">
                  <div className="rounded-full bg-[#3A9868] p-2">
                    <i className="fi fi-sr-marker text-[14px] text-white flex items-center justify-center"></i>
                  </div>
                  <h1 className="text-[14px] font-semibold">Location</h1>
                </div>
                <div className="col-span-3">
                  <p className="text-[14px]">{heroDetails?.touchPoints?.[0]?.marketSites[0]}</p>
                </div>
              </div>
              <div className="grid grid-cols-6 flex items-center border-b border-gray-300 p-2">
                <div className="col-span-3 flex items-center gap-2">
                  <div className="rounded-full bg-[#3A9868] p-2">
                    <i className="fi fi-sr-file-edit text-[14px] text-white flex items-center justify-center"></i>
                  </div>
                  <h1 className="text-[14px] font-semibold">Last Data Update</h1>
                </div>
                <div className="col-span-3">
                  <p className="text-[14px]">{heroDetails?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
