// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWPSvcMMPo-cEHbGqSbUUNkrAy7POMnAo",
  authDomain: "fir-project-46148.firebaseapp.com",
  projectId: "fir-project-46148",
  storageBucket: "fir-project-46148.appspot.com",
  messagingSenderId: "788872915911",
  appId: "1:788872915911:web:e9b5063a276c5117b087e2",
  measurementId: "G-W8SJTMV9P1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);