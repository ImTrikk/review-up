import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BiBookmarkAltPlus } from "react-icons/bi";
import { BiArchiveIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";

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
       <NavLink to="/courses">
        {({ isActive }) => (
         <div
          className={`border border-gray-100 h-10 text-primaryColor ${
           isActive ? "bg-primaryColor text-white" : ""
          }`}
         >
          <div className="px-10 flex items-center h-full gap-2">
           <BsJournalBookmarkFill size={15} />
           <p className="text-xs">Courses</p>
          </div>
         </div>
        )}
       </NavLink>
       <NavLink to="/my-courses">
        {({ isActive }) => (
         <div
          className={`border border-gray-100 h-10 text-primaryColor ${
           isActive ? "bg-primaryColor text-white" : ""
          }`}
         >
          <div className="px-10 flex items-center h-full gap-2">
           <BiBookmarkAltPlus size={15} />
           <p className="text-xs">My courses</p>
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
           <BiArchiveIn size={15} />
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
           <IoSettingsOutline size={15} />
           <p className="text-xs">Settings</p>
          </div>
         </div>
        )}
       </NavLink>
      </div>
      <div className="flex items-center justify-between px-4 mt-60">
       <p className="text-xs text-gray-400">Need help?</p>
       <button className="text-xs text-white h-8 px-4 bg-primaryColor rounded">
        Logout
       </button>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
