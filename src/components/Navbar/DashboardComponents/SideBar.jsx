import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

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
          <AiFillHome size={15} />
          <p className="text-sm">Dashboard</p>
         </div>
        </div>
       </Link>
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
          <AiFillHome size={15} />
          <p className="text-sm">Dashboard</p>
         </div>
        </div>
       </Link>
       <Link>
        <div className="border border-gray-100 h-10">
         <div className="px-10 flex items-center h-full gap-2 text-primaryColor">
          <AiFillHome size={15} />
          <p className="text-sm">Dashboard</p>
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
