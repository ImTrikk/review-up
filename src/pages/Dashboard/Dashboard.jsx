import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { BsSearch } from "react-icons/bs";
import { ReviewModuleCard } from "../../components/ReviewModuleCard";
import { CreateButton } from "../../components/CreateButton";

const Dashboard = () => {
 let first_name = localStorage.getItem("first_name");
 let last_name = localStorage.getItem("last_name");

 return (
  <>
   <div className="">
    <SideBar />
    <div className="bg-primaryColor w-full h-[140px]">
     <div className="ml-[220px] h-full grid items-end">
      <div className="pb-10">
       <h1 className="text-white text-3xl font-bold">Dashboard</h1>
       <p className="text-white text-sm">
        Keep track on the save reviewers to keep learning and improving
       </p>
      </div>
     </div>
    </div>
    <div className="ml-[200px]">
     <div className="p-8">
      <div className="flex items-start justify-between">
       <h1 className="font-semibold text-lg text-primaryColor">
        Welcome back, <span className="font-bold">{first_name + "!"}</span>
       </h1>
       <div>
        <form action="">
         <div className="flex items-center gap-2 text-primaryColor">
          <input
           type="text"
           placeholder="search courses"
           className="border border-primaryColor text-xs text-primaryColor outline-none px-4 h-8 rounded"
          />
          <BsSearch type="submit" size={16} className="cursor-pointer" />
         </div>
        </form>
       </div>
      </div>
      <div className="pt-2">
       <hr className="border-1 border-primaryColor" />
      </div>
      <div className="pt-5">
       <ReviewModuleCard />
      </div>
     </div>
    </div>
    <CreateButton />
   </div>
  </>
 );
};
export default Dashboard;
