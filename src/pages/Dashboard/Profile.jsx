import { Link } from "react-router-dom";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { BsArrowRight } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import { stringAvatar } from "../../utils/StringAvatar";
import Header from "../../components/header/Header";
// BsArrowRight

export const Profile = () => {
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
  };

  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const email = localStorage.getItem("email");

  const StringAvatar = stringAvatar(first_name);

  return (
    <>
      <div className="bg-[#f2f2f2]">
        <SideBar />
        <Header title={"Profile"} description={"Update your account profile"} />
        <div className="ml-[240px]">
          <div
            className="max-w-[900px] h-[525px] bg-white rounded-[10px] shadow border
                         border-black border-opacity-10 mt-10 ml-2 pt-6 "
          >
            <div className="flex gap-3 border-b-2 items-center px-6 shadow-sm pb-8">
              <div>{StringAvatar}</div>
              <div className="h-fit">
                <h3 className="text-[20px] font-semibold text-[#0C046B]">
                  {first_name} {last_name}
                </h3>
                <p className="text-xs font-normal">{email}</p>
              </div>
            </div>
            <div>
              <div className="w-full h-[380px] px-6 py-9 flex flex-col gap-6">
                <div className=" flex">
                  <h3 className="w-[92%] text-[17px] font-semibold text-[#0C046B]">
                    Personal Information
                  </h3>
                  <button
                    className="flex items-center gap-1"
                    onClick={handleClick}
                  >
                    <p className="text-gray-500 text-sm">Edit</p>
                    <BiEdit size={16} style={{ color: "gray" }} />
                  </button>
                </div>
                <div className="flex gap-[80px] ">
                  <div className="">
                    <h3 className="text-[15px] font-semibold text-[#0C046B]">
                      First name
                    </h3>
                    <p className="text-[13px] font-[500] text-[#0C046B]">
                      {first_name}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#0C046B]">
                      Last name
                    </h3>
                    <p className="text-[13px] font-[500] text-[#0C046B]">
                      {last_name}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#0C046B]">
                    Email
                  </h3>
                  <p className="text-[13px] font-[500] text-[#0C046B]">
                    {email}
                  </p>
                </div>
                <div>
                  <h1 className="font-[500] text-[#0C046B]">Reviewers Made</h1>
                  <hr className="w-[22%] border border-gray-300 mt-2" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-[68px] h-[57px] bg-indigo-500 rounded-[5px] flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <Link to="/my-courses">
                    <div className="flex gap-2 items-center text-gray-400 text-sm">
                      <span>See reviewers</span>
                      <BsArrowRight size={16} style={{ color: "light" }} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// COMMENT:
// Ako na tana paganahon ang edit parent, kaso dili man mo gana
// ang conditional rendering Direction. why mani? cge rag sytax
// error pati si gpt wla kasabot
