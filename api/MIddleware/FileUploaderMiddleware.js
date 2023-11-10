// filename: (req, file, cb) => {
// 	// Generate a new batch ID
// 	const batchID = req.batchID;

// 	console.log("Batch ID in MULTER: ", batchID);
// 	// Use the batchID in the filename
// 	const newFilename = `${batchID}_${Date.now()}${path.extname(
// 		file.originalname,
// 	)}`;
// 	console.log("File : ", newFilename); // Uncomment this line
// 	// Initialize an array to store filenames on req
// 	req.filenames = req.filenames || [];
// 	// Push the new filename to the array
// 	req.filenames.push(newFilename);

// 	console.log(filenames);

// 	// Pass the newFilename to the callback
// 	cb(null, newFilename);
// },

import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

import { getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../Database/firebase.js";

export const firebaseUpload = async (req, res, next) => {
	try {
		const batchID = req.batchID;
		const files = req.files;

		console.log("files: ", files);

		// Get a reference to the Firebase Storage bucket
		const storage = getStorage(); // Pass the Firebase app

		console.log("BatchID: ", batchID);

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const filename = batchID;
			if (!file.buffer || file.size === 0) {
				// Skip this file and log an error
				console.error(`Skipping file ${filename} due to missing or empty buffer`);
				continue;
			}
			// Create a reference to the file in Firebase Storage
			const storageRef = ref(
				storage,
				`uploads/${batchID}_${Date.now()}${path.extname(file.originalname)}`,
			);

			// Upload the file to Firebase Storage
			await uploadBytes(storageRef, file.buffer);
		}

		// Handle the next middleware or response
		next();
	} catch (err) {
		console.error("Error uploading to Firebase:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};
