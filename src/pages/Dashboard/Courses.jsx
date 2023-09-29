import { NavLink } from "react-router-dom";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { CreateButton } from "../../components/CreateButton";

export const Courses = () => {
 return (
  <>
   <div className="">
    <SideBar />
    <div className="bg-primaryColor w-full h-[140px]">
     <div className="ml-[220px] h-full grid items-end">
      <div className="pb-10">
       <h1 className="text-white text-3xl font-bold">Courses</h1>
       <p className="text-white text-sm">
        Keep track on the save reviewers to keep learning and improving
       </p>
      </div>
     </div>
    </div>
    <div className="ml-[220px]">
     <h1>Courses</h1>
    </div>
   <CreateButton/>
   </div>
  </>
 );
}