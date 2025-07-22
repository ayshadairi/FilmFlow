// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "ecolens-r8ovc",
  appId: "1:641858981811:web:938348738a8a7ba0ed05c6",
  storageBucket: "ecolens-r8ovc.firebasestorage.app",
  apiKey: "AIzaSyD3CbAhjT5jUObBd9Yc6Ga-0CPX_LUs8hU",
  authDomain: "ecolens-r8ovc.firebaseapp.com",
  messagingSenderId: "641858981811",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
