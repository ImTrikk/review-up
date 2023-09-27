import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BsFillBookFill } from "react-icons/bs";
import { BiSolidArchiveIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";


export const SideBar = () => {
 return (
  <>
   <div className="fixed bg-white h-screen w-[220px] shadow-lg">
    <div className="">
     <div className="flex items-center gap-2 p-10">
      <img src="/static/images/mainlogo.png" alt="" className="w-[20px]" />
      <div className="font-black text-primaryColor text-lg">ReviewUP</div>
     </div>
     <div className="mt-2">
      <div className="px-10 pb-2">
       <p className="text-xs text-gray-400">Menu</p>
      </div>
      <div>
       <Link>
        <div className="border border-gray-100 h-10">
         <div className="px-10 flex items-center h-full gap-2 text-primaryColor">
          <AiFillHome size={15} />
          <p className="text-sm">Dashboard</p>
         </div>
        </div>
       </Link>
       <Link>
        <div className="border border-gray-100 h-10">
         <div className="px-10 flex items-center h-full gap-2 text-primaryColor">
          <BsJournalBookmarkFill size={15} />
          <p className="text-sm">Reviewers</p>
         </div>
        </div>
       </Link>
       <Link>
        <div className="border border-gray-100 h-10">
         <div className="px-10 flex items-center h-full gap-2 text-primaryColor">
          <BsFillBookFill size={15} />
          <p className="text-sm">My reviewers</p>
         </div>
        </div>
       </Link>
       <Link>
        <div className="border border-gray-100 h-10">
         <div className="px-10 flex items-center h-full gap-2 text-primaryColor">
          <BiSolidArchiveIn size={15} />
          <p className="text-sm">Archived</p>
         </div>
        </div>
       </Link>
       <Link>
        <div className="border border-gray-100 h-10">
         <div className="px-10 flex items-center h-full gap-2 text-primaryColor">
          <CgProfile size={15} />
          <p className="text-sm">Profile</p>
         </div>
        </div>
       </Link>
       <Link>
        <div className="border border-gray-100 h-10">
         <div className="px-10 flex items-center h-full gap-2 text-primaryColor">
          <IoMdSettings size={15} />
          <p className="text-sm">Settings</p>
         </div>
        </div>
       </Link>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
