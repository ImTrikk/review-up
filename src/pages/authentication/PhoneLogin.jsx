import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildUrl } from "../../utils/buildUrl.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PhoneLogin = () => {
 const [phone, setPhone] = useState("");
 const [password, setPassword] = useState("");

 const navDashboard = useNavigate();

 const handleLoginRequest = async (event) => {
  event.preventDefault();
  try {
   let response = await fetch(buildUrl("/auth/login"), {
    method: "POST",
    headers: {
     "Content-type": "application/json",
    },
    body: JSON.stringify({
     phone,
     password,
    }),
   });
   if (response.ok) {
    // localStorage.setItem("first_name", user.first_name)
    // localStorage.setItem("last_name", user.last_name)
    toast.success("Login successful!", {
     position: "top-right",
     autoClose: 2000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "light",
    });
    setTimeout(() => {
     navDashboard("/dashboard");
    }, 2000);
   } else {
    toast.error("There was an error loggin in", {
     position: "top-right",
     autoClose: 2000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "light",
    });
   }
  } catch (err) {
   console.log(err);
  }
 };

 return (
  <>
   <div className="flex  w-full h-screen">
    <ToastContainer />
    <div className="bg-primaryColor w-[50%] p-16">
     <Link to="/">
      <div className="flex items-center gap-2">
       <img
        src="/static/images/whitePNGReviewUp.png"
        alt=""
        className="w-[20px]"
       />
       <h1 className="text-white text-xl font-black">ReviewUp</h1>
      </div>
     </Link>
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
       <form>
        <div className="flex flex-col pt-4">
         <label htmlFor="" className="text-sm font-medium text-primaryColor">
          Email
         </label>
         <input
          type="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <div className="mt-10">
         <p className="text-xs text-gray-500">
          <i>Try another way to login</i>
         </p>
        </div>
        <div className="mt-2 space-y-2">
         <button
          type="submit"
          onClick={handleLoginRequest}
          className="bg-primaryColor text-white px-2 h-10 rounded w-full text-sm font-bold"
         >
          Login
         </button>
         <div className="">
          <Link to="/signup">
           <button className="border border-primaryColor text-primaryColor px-2 h-10 rounded w-full text-sm font-bold">
            Register
           </button>
          </Link>
         </div>
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
 const [first_name, setFirstName] = useState("");
 const [last_name, setLastName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [phone, setPhone] = useState("");

 const navLogin = useNavigate();

 const handleSignupRequest = async (event) => {
  event.preventDefault();
  try {
   let response = await fetch(buildUrl("/auth/signup"), {
    method: "POST",
    headers: {
     "Content-type": "application/json",
    },
    body: JSON.stringify({
     first_name,
     last_name,
     email,
     password,
     phone,
    }),
   });
   if (response.ok) {
    console.log(response);
    toast.success("Success creating account!", {
     position: "top-right",
     autoClose: 2000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "light",
    });
    setTimeout(() => {
     navLogin("/login");
    }, 2000);
   } else {
    toast.error("Error creating account", {
     position: "top-right",
     autoClose: 2000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "light",
    });
   }
  } catch (err) {
   console.log(err);
  }
 };
 return (
  <>
   <div className="bg-primaryColor h-screen">
    <ToastContainer />
    <div className="flex lg:max-w-7xl mx-20 2xl:mx-auto">
     <div className="w-[50%] p-10">
      <Link to="/">
       <div className="flex items-center gap-2">
        <img
         src="/static/images/whitePNGReviewUp.png"
         alt=""
         className="w-[20px]"
        />
        <h1 className="text-white text-xl font-black">ReviewUp</h1>
       </div>
      </Link>
      <div className="pt-10">
       <h1 className="text-white text-4xl font-black">
        Create account to unlock features
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
      <div className="p-10">
       <div className="bg-white rounded h-full p-5 shadow-lg">
        <form>
         <div className="space-y-4">
          <div className="grid grid-cols">
           <label htmlFor="" className="text-sm text-primaryColor font-medium">
            First name
           </label>
           <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="firstname"
            className="border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
           />
          </div>
          <div className="grid grid-cols">
           <label htmlFor="" className="text-sm text-primaryColor font-medium">
            Lastname
           </label>
           <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="lastname"
            className="border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
           />
          </div>
          <div className="grid grid-cols">
           <label htmlFor="" className="text-sm text-primaryColor font-medium">
            Email
           </label>
           <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
           />
          </div>
          <div className="grid grid-cols">
           <label htmlFor="" className="text-sm text-primaryColor font-medium">
            Phone
           </label>
           <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="phone number"
            className="border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
           />
          </div>
          <div className="grid grid-cols">
           <label htmlFor="" className="text-sm text-primaryColor font-medium">
            Password
           </label>
           <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
           />
          </div>
          {/* <div className="grid grid-cols">
           <label htmlFor="" className="text-sm text-primaryColor font-medium">
            Confirm password
           </label>
           <input
            type="text"
            placeholder="type your password again"
            className="border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
           />
          </div> */}
         </div>
         <div className="pt-10">
          <button
           type="submit"
           onClick={handleSignupRequest}
           className="bg-primaryColor text-white font-bold h-10 w-full rounded"
          >
           Register
          </button>
         </div>
        </form>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};
