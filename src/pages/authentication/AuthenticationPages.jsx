import { useState } from "react";

export const Login = () => {
 return (
  <>
   <div className="flex  w-full h-screen">
    <div className="bg-primaryColor w-[50%] p-16">
     <div className="flex items-center gap-2">
      <img
       src="/static/images/whitePNGReviewUp.png"
       alt=""
       className="w-[20px]"
      />
      <h1 className="text-white text-xl font-black">ReviewUp</h1>
     </div>
     <div className="pt-10">
      <h1 className="text-white text-4xl font-black">
       Engage with different students{" "}
      </h1>
      <div className="w-44 pt-2">
       <hr className="text-white border-4" />
      </div>
      <div className="pt-5">
       <p className="text-lg text-white">
        Learn from peers and share your ideas, reviewers, and other study
        resources.
       </p>
      </div>
      <div className="pt-5">
       <p className="text-lg text-white">
        Don't have an account yet? Create now and collaborate with students!
       </p>
       <div className="pt-4">
        <button className="bg-white rounded px-4 h-8 text-sm text-primaryColor">
         Register here
        </button>
       </div>
      </div>
     </div>
    </div>
    <div className="w-[50%]">
     <div className="p-16">
      <h1 className="text-primaryColor font-black text-3xl">Login</h1>
      <p className="text-sm text-gray-500 pt-2">
       Login to keep track of ongoing progress and engage in meaningful
       discussions with students
      </p>
      <div className="pt-10">
       <form action="">
        <div className="flex flex-col pt-4">
         <label htmlFor="" className="text-sm font-medium text-primaryColor">
          Email
         </label>
         <input
          type="text"
          placeholder="Enter email"
          className="text-xs font-light border border-gray-200 px-4 h-10 py-2 rounded outline-none"
         />
        </div>
        <div className="flex flex-col pt-4">
         <label htmlFor="" className="text-sm font-medium text-primaryColor">
          Password
         </label>
         <input
          type="password"
          placeholder="Enter the correct password"
          className="text-xs font-light border border-gray-200 px-4 h-10 py-2 rounded outline-none"
         />
        </div>
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-2 pt-2">
          <input
           type="checkbox"
           placeholder="password"
           className="text-sm font-light border border-gray-200 px-4 py-2 rounded outline-none"
          />
          <label htmlFor="" className="text-xs text-gray-400">
           Remember me
          </label>
         </div>
         <div className="pt-2">
          <a href="">
           <p className="text-xs text-gray-400">Forgot password?</p>
          </a>
         </div>
        </div>
        <div className="mt-10 space-y-2">
         <button
          
          className="bg-primaryColor text-white px-2 h-8 rounded w-full text-sm font-bold"
         >
          Login
         </button>
         <button className="border border-primaryColor text-primaryColor px-2 h-8 rounded w-full text-sm font-bold">
          Register
         </button>
        </div>
       </form>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export const Signup = () => {
 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [email, setEmail] = useState("");
 const [phone, setPhone] = useState("");
 
 return (
  <>
   <h1>Hello this is the signup page</h1>
  </>
 );
};
