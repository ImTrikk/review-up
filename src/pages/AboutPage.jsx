export const AboutPage = () => {
 return (
  <>
   <div className="bg-secondaryColor">
    <div className="lg:max-w-7xl mx-20 2xl:mx-auto flex items-center">
     <div className="h-screen">
      <div className="flex">
       <img
        src="/static/images/aboutus-image(nobg).png"
        alt=""
        className="w-[600px]"
       />
       <div className="ml-10">
        <h1 className="text-4xl font-black text-primaryColor ">About us</h1>
        <p className="text-primaryColor text-xl pt-5">
         We are students who wants to aim for high grades and at the same time,
         help students struggling with their studies. We don’t want students to
         get left behind in their studies.
        </p>
        <div className="pt-8">
         <button className="bg-primaryColor text-white px-3 rounded h-10">
          Register now
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
