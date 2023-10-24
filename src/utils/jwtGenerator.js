import jwt from "jsonwebtoken";

function jwtGenerator(user_id) {
 const payload = {
  user: {
   id: user_id,
  },
 };

 return jwt.sign(payload, "secret");
}
export default jwtGenerator;
