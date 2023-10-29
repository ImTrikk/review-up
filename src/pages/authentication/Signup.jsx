import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildUrl } from "../../utils/buildUrl.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
 const [first_name, setFirstName] = useState("");
 const [last_name, setLastName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [phone, setPhone] = useState("");
 const navLogin = useNavigate();

 // these states are for the errorHandling of password

 const handleSignupRequest = async (event) => {
  event.preventDefault();

  console.log("Handling signup request"); // Add this line to check if the function is called
  console.log(password);

  if (password.length <= 12) {
   toast.error("Password is too short", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
   });
  } else if (
   !/[A-Z]/.test(password) ||
   !/[a-z]/.test(password) ||
   // /\d/.test(password) ||
   /[!@#$%^&*]/.test(password)
  ) {
   toast.error("Password must contain symbols", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
   });
  } else {
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
     console.log(response.message);
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
  }
 };

 return (
  <>
   <div className="bg-primaryColor h-screen">
    <ToastContainer autoClose={2000} />
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
        <div className="text-white">
         <p className="text-lg font-bold">Tips for creating password</p>
         <ul className="text-sm font-light pt-2">
          <ol>1. Password must have 8 minimum characters</ol>
          <ol>2. Must have at least 1 uppercase letter</ol>
          <ol>3. Must have at least 1 lowercase letter</ol>
          <ol>4. Must have at least 1 number from numbers 0-9 </ol>
         </ul>
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
