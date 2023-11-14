import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const AuthToken = async (req, res, next) => {
	try {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if (token === null)
			return res.status(401).json({ message: "Unauthorized token" });

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET),
			(err) => {
				if (err) res.status(403).json({ message: "Token no longer valid" });
				next();
			};
	} catch (err) {
		console.log(err);
	}
};
