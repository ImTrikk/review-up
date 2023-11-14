import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function GenerateToken(user_id) {
	const payload = {
		user: {
			id: user_id,
		},
	};

	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}
export default GenerateToken;
