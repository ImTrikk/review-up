export const CodeVerification = () => {
 return (
  <>
   <div className="bg-primaryColor h-screen">
    <div className="flex lg:max-w-7xl mx-20 2xl:mx-auto">
     <div className="flex items-center justify-center w-full h-screen">
      <div className="flex gap-10 justify-between">
       <div className="w-[400px]">
        <h1 className="font-black text-4xl text-white">Almost there</h1>
        <p className="text-white font-light pt-5">
         Email is sent to your email account, Please look through your Gmail
         account and enter the provided code
        </p>
       </div>
       <div className="w-[500px] bg-white h-[270px] rounded p-5">
        <div>
         <p className="text-sm font-semibold text-primaryColor">
          Email verification code
         </p>
         <p className="text-xs pt-2">
          Input the code received from your email account
         </p>
        </div>
        <div className="flex items-center justify-center pt-10">
         <div className="flex gap-2">
          <input
           type="text"
           className="h-14 w-14 rounded bg-white text-lg text-center outline-primaryColor border border-primaryColor"
          />
          <input
           type="text"
           className="h-14 w-14 rounded bg-white text-lg text-center outline-primaryColor border border-primaryColor"
          />
          <input
           type="text"
           className="h-14 w-14 rounded bg-white text-lg text-center outline-primaryColor border border-primaryColor"
          />
          <input
           type="text"
           className="h-14 w-14 rounded bg-white text-lg text-center outline-primaryColor border border-primaryColor"
          />
          <input
           type="text"
           className="h-14 w-14 rounded bg-white text-lg text-center outline-primaryColor border border-primaryColor"
          />
          <input
           type="text"
           className="h-14 w-14 rounded bg-white text-lg text-center outline-primaryColor border border-primaryColor"
          />
         </div>
        </div>
        <div className="flex justify-between items-center pt-16">
         <button className="text-xs text-primaryColor">
          Didn't received email?
         </button>
         <button className="bg-primaryColor text-white px-2 h-8 rounded text-xs">
          send
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
