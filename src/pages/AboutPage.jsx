import { Link } from "react-router-dom";

export const AboutPage = () => {
 return (
  <>
   <div className="">
    <div className="lg:max-w-7xl mx-20 2xl:mx-auto">
     <div className="h-screen flex items-center">
      <div className="flex">
       <img
        src="/static/images/aboutus-image(nobg).png"
        alt=""
        className="w-[600px]"
       />
       <div className="ml-10">
        <h1 className="text-4xl font-extrabold text-primaryColor ">About us</h1>
        <p className="text-primaryColor text-sm font-light pt-5">
         We are students who wants to aim for high grades and at the same time,
         help students struggling with their studies. We don’t want students to
         get left behind in their studies.
        </p>
        <div className="pt-8">
         <Link to='/signup'>
         <button className="bg-primaryColor text-white px-3 rounded text-xs h-10">
          Register now
         </button></Link>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
