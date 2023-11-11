import multer from "multer";
import path from "path";
import { firebaseStorage } from "../Database/firebase.js";
import { getStorage, ref, uploadBytes } from "firebase/storage";


const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const firebaseUpload = async (req, res, next) => {
	try {
		const batchID = req.batchID;
		const files = req.files;

		console.log("files: ", files);

		// Get a reference to the Firebase Storage bucket
		const storage = getStorage(); // Pass the Firebase app
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			console.log("File: ", file);
			const filename = batchID;
			if (!file.buffer || file.size === 0) {
				// Skip this file and log an error
				console.error(`Skipping file ${filename} due to missing or empty buffer`);
				continue;
			}

			const contentType = file.mimetype;

			console.log("Content Type: ", contentType);
			const ext = path.extname(contentType).toLowerCase();

			// Create a reference to the file in Firebase Storage
			const storageRef = ref(
				storage,
				`uploads/${batchID}_${file.originalname}${ext}`,
			);

			// Upload the file to Firebase Storage with metadata
			const metadata = {
				contentType: contentType,
			};
			await uploadBytes(storageRef, file.buffer, metadata);
		}

		// Handle the next middleware or response
		next();
	} catch (err) {
		console.error("Error uploading to Firebase:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};
