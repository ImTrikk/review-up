import nodemailer from "nodemailer";

export const OtpVerificationemail = async ({ user_id, email }) => {
 try {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  const mailTransporter = {
   from: "reviewup.@gmail.com",
   to: email,
  };
 } catch (err) {
  console.log(err);
 }
};
