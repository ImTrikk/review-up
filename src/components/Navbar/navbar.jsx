import { Link } from "react-router-dom";

export const Navbar = () => {
 return (
  <>
   <div className="fixed w-full">
    <div className="bg-secondaryColor py-2">
     <div className="flex items-center justify-between lg:max-w-7xl mx-20 2xl:mx-auto">
      <div className="w-[20px]">
       <Link to="/">
        <img src="/static/images/mainlogo.png" alt="" className="w-[200px]" />
       </Link>
      </div>
      <div className="flex items-center gap-10">
       <ul className="flex gap-5 text-primaryColor">
        <a href="#home">
         <li>Home</li>
        </a>
        <a href="">
         <li>About</li>
        </a>
        <li>Services</li>
       </ul>
       <Link to="/login">
        <button className="bg-primaryColor font-bold text-white h-8 px-4 rounded">
         Login
        </button>
       </Link>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
