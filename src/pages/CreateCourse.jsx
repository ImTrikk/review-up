import { SideBar } from "../components/Navbar/DashboardComponents/SideBar";
import { BsSearch } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";

export const CreateCourse = () => {
 let first_name = localStorage.getItem("first_name");
 let last_name = localStorage.getItem("last_name");

 return (
  <>
   <div className="">
    <SideBar />
    <div className="bg-primaryColor w-full h-[140px]">
     <div className="ml-[220px] h-full grid items-end">
      <div className="pb-10">
       <h1 className="text-white text-3xl font-bold">Create Course</h1>
       <p className="text-white text-sm">
        Create reviewers, drop down notes, and even
       </p>
      </div>
     </div>
    </div>
    <div className="ml-[200px]">
     <div className="p-8">
      <div className="flex items-start justify-between">
       <h1 className="font-bold text-xl text-primaryColor">Create</h1>
      </div>
      <div className="pt-2">
       <hr className="border-1 border-primaryColor" />
      </div>
      <div className="mt-10">
       <div className="border border-primaryColor h-screen rounded relative">
        <div className="p-5">
         <form action="">
          <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
            <div className="flex items-center justify-between gap-2">
             <label
              htmlFor=""
              className="text-sm font-medium text-primaryColor"
             >
              Course Title:
             </label>
             <input
              type="text"
              placeholder=""
              className="border border-primaryColor text-xs px-4 h-8 rounded outline-none"
             />
            </div>
            <div className="flex items-center justify-between gap-2">
             <label
              htmlFor=""
              className="text-sm font-medium text-primaryColor"
             >
              Category:
             </label>
             <input
              type="text"
              placeholder=""
              className="border border-primaryColor text-xs px-4 h-8 rounded outline-none"
             />
            </div>
           </div>
           <div className="flex items-center gap-1">
            <div className="bg-primaryColor px-4 rounded text-white text-sm h-8 flex items-center gap-2">
             <AiFillPlusCircle size={16} className="text-white" />
             <button>Notes</button>
            </div>
            <div className="bg-primaryColor px-4 rounded text-white text-sm h-8 flex items-center gap-2">
             <AiFillPlusCircle size={16} className="text-white" />
             <button>Links</button>
            </div>
            <div className="bg-primaryColor px-4 rounded text-white text-sm h-8 flex items-center gap-2">
             <AiFillPlusCircle size={16} className="text-white" />
             <button>Quiz</button>
            </div>
           </div>
          </div>
          <div className="pt-5 flex flex-col">
           <label htmlFor="" className="text-sm text-primaryColor">
            Description:
           </label>
           <div className="pt-2 w-full">
            <textarea
             placeholder="Description"
             className="border border-primaryColor text-xs h-[80px] rounded p-5 outline-none w-full "
            />
           </div>
          </div>
         </form>
         <div className="p-5 absolute bottom-0 right-0">
          <div className="bg-primaryColor px-4 rounded h-8 flex items-center">
           <button className="text-white text-xs">Create</button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
