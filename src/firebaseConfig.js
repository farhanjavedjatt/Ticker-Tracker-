// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACh4dv23cqDLxhtuWkFyA7OHWcNW5E-ws",
  authDomain: "tickertrackerproject.firebaseapp.com",
  projectId: "tickertrackerproject",
  storageBucket: "tickertrackerproject.appspot.com",
  messagingSenderId: "377317368252",
  appId: "1:377317368252:web:d2e92a19aeb6eed3228bb9",
  measurementId: "G-WSFYNVXTTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);