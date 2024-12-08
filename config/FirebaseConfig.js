// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";"firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
  // apiKey: "AIzaSyDOF9Bh26FTk18_Z1FFyjTdre_LyQMkJh0",
  // authDomain: "smart-parking-sih.firebaseapp.com",
  // projectId: "smart-parking-sih",
  // storageBucket: "smart-parking-sih.firebasestorage.app",
  // messagingSenderId: "1081239749251",
  // appId: "1:1081239749251:web:9282b30896dae86a34d1b6",
  // measurementId: "G-CS77C2TEWR"
// };

// // Initialize Firebase
// export  const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
import { initializeApp } from "firebase/app"; // Import the function to initialize the Firebase app
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Import Firebase authentication functions
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage to persist authentication data

/*  
  apiKey  -- >// The API key to authenticate requests to Firebase services
  authDomain  -- >// The domain name for Firebase Authentication
  projectId  -- > // The unique identifier for your Firebase project
  storageBucket  -- > // The URL of your project's default storage bucket
  messagingSenderId  -- > // The sender ID used for cloud messaging
  appId  -- > // The unique identifier for the Firebase app instance
  */
// Initialize Firebase with environment variables , Firebase configuration object containing the project-specific Firebase keys
const firebaseConfig = {
  apiKey: "AIzaSyDOF9Bh26FTk18_Z1FFyjTdre_LyQMkJh0",
  authDomain: "smart-parking-sih.firebaseapp.com",
  projectId: "smart-parking-sih",
  storageBucket: "smart-parking-sih.firebasestorage.app",
  messagingSenderId: "1081239749251",
  appId: "1:1081239749251:web:9282b30896dae86a34d1b6",
  measurementId: "G-CS77C2TEWR"
};
// Initialize the Firebase app with the provided config
const app = initializeApp(firebaseConfig);
// This function initializes your Firebase app using the `firebaseConfig` object, allowing you to access Firebase services (e.g., Authentication, Firestore).

// Initialize Firebase Authentication with persistence using AsyncStorage
const auth = initializeAuth(app);

// Export the `auth` object so it can be used throughout the app for authentication functions (e.g., sign-in, sign-out)
export { auth };