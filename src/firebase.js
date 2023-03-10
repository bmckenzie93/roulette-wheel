// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "rr-pillar-spinner.firebaseapp.com",
  projectId: "rr-pillar-spinner",
  storageBucket: "rr-pillar-spinner.appspot.com",
  messagingSenderId: "194710396159",
  appId: "1:194710396159:web:936443581cd3bf2d5500ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);