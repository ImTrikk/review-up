import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BsFillBookFill } from "react-icons/bs";
import { BiSolidArchiveIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";

export const SideBar = () => {
 return (
  <>
   <div className="fixed bg-white h-screen w-[200px] shadow-lg">
    <div className="">
     <Link to="/">
      <div className="flex items-center gap-2 p-10">
       <img src="/static/images/mainlogo.png" alt="" className="w-[20px]" />
       <div className="font-black text-primaryColor text-lg">ReviewUP</div>
      </div>
     </Link>
     <div className="mt-2">
      <div className="px-10 pb-2">
       <p className="text-xs text-gray-400">Menu</p>
      </div>
      <div>
       <NavLink to="/dashboard">
        {({ isActive }) => (
         <div
          className={`border border-gray-100 h-10 text-primaryColor ${
           isActive ? "bg-primaryColor text-white" : ""
          }`}
         >
          <div className="px-10 flex items-center h-full gap-2">
           <AiFillHome size={15} />
           <p className="text-xs">Dashboard</p>
          </div>
         </div>
        )}
       </NavLink>
       <NavLink to="/reviewers">
        {({ isActive }) => (
         <div
          className={`border border-gray-100 h-10 text-primaryColor ${
           isActive ? "bg-primaryColor text-white" : ""
          }`}
         >
          <div className="px-10 flex items-center h-full gap-2">
           <BsJournalBookmarkFill size={15} />
           <p className="text-xs">Reviewers</p>
          </div>
         </div>
        )}
       </NavLink>
       <NavLink to="/my-reviewer">
        {({ isActive }) => (
         <div
          className={`border border-gray-100 h-10 text-primaryColor ${
           isActive ? "bg-primaryColor text-white" : ""
          }`}
         >
          <div className="px-10 flex items-center h-full gap-2">
           <BsFillBookFill size={15} />
           <p className="text-xs">My reviewers</p>
          </div>
         </div>
        )}
       </NavLink>
       <NavLink to="/archived">
        {({ isActive }) => (
         <div
          className={`border border-gray-100 h-10 text-primaryColor ${
           isActive ? "bg-primaryColor text-white" : ""
          }`}
         >
          <div className="px-10 flex items-center h-full gap-2">
           <BiSolidArchiveIn size={15} />
           <p className="text-xs">Archived</p>
          </div>
         </div>
        )}
       </NavLink>
       <NavLink to="/profile">
        {({ isActive }) => (
         <div
          className={`border border-gray-100 h-10 text-primaryColor ${
           isActive ? "bg-primaryColor text-white" : ""
          }`}
         >
          <div className="px-10 flex items-center h-full gap-2">
           <CgProfile size={15} />
           <p className="text-xs">Profile</p>
          </div>
         </div>
        )}
       </NavLink>
       <NavLink to="/settings">
        {({ isActive }) => (
         <div
          className={`border border-gray-100 h-10 text-primaryColor ${
           isActive ? "bg-primaryColor text-white" : ""
          }`}
         >
          <div className="px-10 flex items-center h-full gap-2">
           <IoMdSettings size={15} />
           <p className="text-xs">Settings</p>
          </div>
         </div>
        )}
       </NavLink>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
