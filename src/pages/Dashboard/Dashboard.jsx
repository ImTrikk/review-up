import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import {BsFillArrowUpRightCircleFill} from "react-icons/bs"
import { ReviewModuleCard } from "../../components/ReviewModuleCard";

const Dashboard = () => {
 return (
  <>
   <div className="">
    <SideBar />
    <div className="bg-primaryColor w-full h-[140px]">
     <div className="ml-[250px] h-full grid items-end">
      <div className="pb-10">
       <h1 className="text-white text-3xl font-bold">Dashboard</h1>
       <p className="text-white text-sm">
        Keep track on the save reviewers to keep learning and improving
       </p>
      </div>
     </div>
    </div>
    <div className="ml-[220px]">
     <div className="p-8">
      <div className="flex items-start justify-between">
       <h1 className="font-bold text-xl text-primaryColor">
        Welcome back, Patrick James Dionen!
       </h1>
       <div>
        <button className="bg-primaryColor text-sm text-white font-medium h-8 rounded px-4 flex items-center gap-2">
         Reviewers
         <BsFillArrowUpRightCircleFill />
        </button>
       </div>
      </div>
      <div className="pt-2">
       <hr className="border-1 border-primaryColor" />
      </div>
      <div className="pt-5">
       <ReviewModuleCard/>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
export default Dashboard;
