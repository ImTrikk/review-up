// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyA7S1JNnI80XlcS6AGUPbQWlcM85xWiTqg",
	authDomain: "reviewup-4b1e5.firebaseapp.com",
	projectId: "reviewup-4b1e5",
	storageBucket: "reviewup-4b1e5.appspot.com",
	messagingSenderId: "753761382492",
	appId: "1:753761382492:web:111a20215e1a6bcd57b699",
	measurementId: "G-YD3L3MVZET",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
