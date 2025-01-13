import React, { useRef } from "react";
import image1 from "../../assets/images/Layer_2.png";
import image2 from "../../assets/images/aaa.png";
import image3 from "../../assets/images/bbb.png";
import image4 from "../../assets/images/cccc.png";
import { Footer } from "../../components/footer";
import { MyButton, RegisterHeroDataForm } from "../../components/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AUTH } from "../../routes/routes";

export const LandingPage: React.FC = () => {
  const scrollToRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const userSignin = useSelector((state: any) => state.userSignin);
  const {
    error: errorSignIn,
    success: successSignin,
    userInfo: userInfo,
  } = userSignin;
  // console.log("userInfo : ", userInfo);
  const handleGoReach = () => {
    if (userInfo) {
      navigate(`/dashboard?userId=${userInfo?._id}`);
    } else {
      navigate(AUTH);
    }
  };
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
            <div className="flex gap-4 py-4">
              <MyButton
                title="Apply Now"
                width="72px"
                height="24px"
                onClick={handleClick}
              />
              <MyButton
                title="See our Historical Data"
                width="72px"
                height="24px"
                outLine="2"
                color="#000000"
                bgColor="#FFFFFF"
                onClick={handleGoReach}
              />
            </div>
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
              Touch points
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
        <div
          className="flex flex-col justify-center items-center"
          ref={scrollToRef}
        >
          <h1 className="text-[40px] font-bold text-[#254354] pt-4">
            Apply Now To Become Data Hero
          </h1>
          <h1 className="text-[16px]  text-[#254354] pt-4">
            Data-Driven, Automated Ad Buying Is Now Easier Than Ever, Prooh Is
            Designed To Do Away With
          </h1>
          <RegisterHeroDataForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};
