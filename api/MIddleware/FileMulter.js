import multer from "multer";
import path from "path";
import { v4 as uuidID in MULTER: ", batchID);
		// Use the batchID in the filename
		const newFilename = `${batv4 } from "uuid";

// Initialize the multer storage and upload instance
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads");
	},
	filename: (req, file, cb) => {
		// Generate a new batch ID
		const batchID = req.batchID;
		
		console.log("Batch chID}_${Date.now()}${path.extname(
			file.originalname,
		)}`;
		console.log("File: ", newFilename);
		cb(null, newFilename);
	},
});

export const upload = multer({ storage: storage });
