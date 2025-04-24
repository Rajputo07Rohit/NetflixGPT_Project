// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsAjzd46HpRDpo0FMFwmeZN4GadZoSrFA",
  authDomain: "netflixgpt-7563a.firebaseapp.com",
  projectId: "netflixgpt-7563a",
  storageBucket: "netflixgpt-7563a.firebasestorage.app",
  messagingSenderId: "312959747469",
  appId: "1:312959747469:web:48615306e9332ff8c129c4",
  measurementId: "G-Q45ZZQRHRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();