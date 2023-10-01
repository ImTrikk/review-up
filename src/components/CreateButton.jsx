import { Link } from "react-router-dom";
import {BsFillPlusCircleFill} from "react-icons/bs"

export const CreateButton = () => {
 return (
  <>
   <div className="absolute bottom-5 right-5">
    <Link to="/create-course">
     <div className="bg-primaryColor text-white shadow-lg text-sm h-8 rounded-lg px-4 flex items-center gap-2">
      <BsFillPlusCircleFill size={16}/>
      create
     </div>
    </Link>
   </div>
  </>
 );
}