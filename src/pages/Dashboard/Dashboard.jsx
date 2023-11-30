import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { BsSearch } from "react-icons/bs";
import { ReviewModuleCard } from "../../components/ReviewModuleCard";
import { CreateButton } from "../../components/CreateButton";
import { useState } from "react";
import Header from "../../components/header/Header";

const Dashboard = () => {
  let first_name = localStorage.getItem("first_name");
  let last_name = localStorage.getItem("last_name");

  const [isEmpty, setIsEmpty] = useState("");

  const handleIsEmptyChange = (value) => {
    setIsEmpty(value.length == 0);
  };

  return (
    <>
      <div className="bg-[#f2f2f2] h-fit">
        <SideBar />
        <Header
          user={first_name}
          title={"Dashboard"}
          description="Keep track on the save reviewers to keep learning and improving"
        />

        <div className="ml-[100px] lg:ml-[210px]">
          <div className="p-8">
            <div className="pt-5">
              {isEmpty ? (
                <div className="flex items-center justify-center">
                  <img
                    src="/static/images/empty.jpg"
                    alt=""
                    className="w-[700px]"
                  />
                </div>
              ) : (
                <ReviewModuleCard onIsEmptyChange={handleIsEmptyChange} />
              )}
            </div>
          </div>
        </div>
        <CreateButton />
      </div>
    </>
  );
};
export default Dashboard;
