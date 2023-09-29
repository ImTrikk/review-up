import { SideBar } from "../components/Navbar/DashboardComponents/SideBar";
import { BsSearch } from "react-icons/bs";

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
       <div className="border border-primaryColor h-screen rounded">
        <div className="p-5">
         <form action="">
          <div className="w-[350px] space-y-2">
           <div className="flex items-center justify-between">
            <label htmlFor="" className="text-sm font-medium text-primaryColor">
             Course ID:
            </label>
            <input
             type="text"
             placeholder=""
             className="border border-primaryColor px-4 h-8 rounded outline-none"
            />
           </div>
           <div className="flex items-center justify-between">
            <label htmlFor="" className="text-sm font-medium text-primaryColor">
             Course Details:
            </label>
            <input
             type="text"
             placeholder=""
             className="border border-primaryColor px-4 h-8 rounded outline-none"
            />
           </div>
          </div>
         </form>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
