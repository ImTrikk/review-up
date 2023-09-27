import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";

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
      <h1 className="font-bold text-primaryColor">Welcome back, Patrick James Dionen!</h1>
      <div className="pt-2">
       <hr className="border-1 border-primaryColor"/>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
export default Dashboard;
