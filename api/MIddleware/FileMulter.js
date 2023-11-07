import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";	

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// const uploadDir = path.join(__dirname, "uploads");
		cb(null, "./public/uploads");
	},
	filename: (req, file, cb) => {
		console.log(file);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

export const upload = multer({ storage: storage });
