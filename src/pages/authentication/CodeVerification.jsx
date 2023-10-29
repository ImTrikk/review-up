import { useState } from "react";
import { buildUrl } from "../../utils/buildUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CodeVerification = () => {
 // const email = use.email.location;
 const navigate = useNavigate();

 const [verificationCode, setVerificationCode] = useState([
  "",
  "",
  "",
  "",
  "",
  "",
 ]);

 const handleInputChange = (index, value) => {
  const newVerificationCode = [...verificationCode];
  newVerificationCode[index] = value;
  setVerificationCode(newVerificationCode);
 };

 const handleVerifyCode = async () => {
  const concatenatedCode = verificationCode.join("");
  try {
   await fetch(buildUrl("/auth/auth-user"), {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     concatenatedCode,
    }),
   }).then((res) => {
    if (res.ok) {
     return res.json().then((data) => {
      localStorage.setItem("user_id", data.compressedData.foundUser.user_id);
      localStorage.setItem("token", data.compressedData.jwtToken);
      localStorage.setItem(
       "first_name",
       data.compressedData.foundUser.first_name,
      );
      localStorage.setItem(
       "last_name",
       data.compressedData.foundUser.last_name,
      );
      localStorage.setItem("email", data.compressedData.foundUser.email);
      localStorage.setItem("phone", data.compressedData.foundUser.phone);
      toast.success("Verified email, login successful!", {
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
       navigate("/dashboard");
      }, 2000);
     });
    } else {
     toast.error("Incorrect code, input again", {
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
   });
  } catch (err) {
   console.log(err);
  }
 };

 const handleResendOtp = async () => {
  try {
   await fetch(buildUrl("/auth/resend-verify"), {
    method: "POST",
    headers: {
     "Content-Type": "applicaiton/json",
    },
    body: {
     email,
    },
   });
  } catch (err) {
   console.log(err);
  }
 };

 return (
  <>
   <div className="bg-primaryColor h-screen">
    <ToastContainer />
    <div className="flex lg:max-w-7xl mx-20 2xl:mx-auto">
     <div className="flex items-center justify-center w-full h-screen">
      <div className="flex gap-10 justify-between">
       <div className="w-[400px]">
        <h1 className="font-black text-4xl text-white">Almost there</h1>
        <p className="text-white font-light pt-5">
         One time password is sent to your email account, Please look through
         your Gmail account and enter the provided code
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
          {verificationCode.map((value, index) => (
           <input
            key={index}
            type="text"
            className="h-14 w-14 rounded bg-white text-lg text-center outline-primaryColor border border-primaryColor"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
           />
          ))}
         </div>
        </div>
        <div className="flex justify-between items-center pt-16">
         <button
          onClick={handleResendOtp}
          className="text-xs text-primaryColor"
         >
          Didn't received email?
         </button>
         <button
          onClick={handleVerifyCode}
          className="bg-primaryColor text-white px-2 h-8 rounded text-xs"
         >
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
