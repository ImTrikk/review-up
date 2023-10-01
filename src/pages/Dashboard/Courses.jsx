import { NavLink } from "react-router-dom";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { CreateButton } from "../../components/CreateButton";
import { ReviewModuleCard } from "../../components/ReviewModuleCard";

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
    <div className="ml-[200px]">
     <div className="p-8">
      <h1 className="font-bold text-xl text-primaryColor">
       Courses with reviewers
      </h1>
      <div className="pt-2">
       <hr className="border-1 border-primaryColor" />
      </div>
      <div className="pt-10">
       <div className="flex flex-wrap gap-2">
        <ReviewModuleCard />
        <ReviewModuleCard />
        <ReviewModuleCard />
        <ReviewModuleCard />
       </div>
      </div>
     </div>
    </div>
    <CreateButton />
   </div>
  </>
 );
};