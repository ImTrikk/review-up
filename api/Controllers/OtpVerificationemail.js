import nodemailer from "nodemailer";

export const OtpVerificationemail = async ({ user_id, email }) => {
 try {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  const emailTransporter = nodemailer.createTransport({
   service: "GMAIL",
   auth: {
    user: "reviewup@gmail.com",
    pass: "reviewup2002hoops91",
   },
  });

  function sendVerificationCode(email, otp) {
   const mailOptions = {
    from: "reviewup@gmail.com",
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is: ${otp}`,
   };

   return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
     if (error) {
      reject(error);
     } else {
      resolve(info);
     }
    });
   });
  }
 } catch (err) {
  console.log(err);
 }
};
