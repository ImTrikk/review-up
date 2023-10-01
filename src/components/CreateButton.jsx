import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";

export const CreateButton = () => {
 const buttonStyle = {
  position: "fixed",
  bottom: "10px", // Adjust this value to set the distance from the bottom
  right: "10px", // Adjust this value to set the distance from the right
 };

 return (
  <div style={buttonStyle}>
   <Link to="/create-course">
    <div className="bg-primaryColor text-white shadow-lg text-xs h-8 rounded-lg px-4 flex items-center gap-2">
     <BsFillPlusCircleFill size={16} />
     create
    </div>
   </Link>
  </div>
 );
};
