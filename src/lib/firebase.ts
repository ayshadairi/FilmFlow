// IMPORTANT: This file is updated to a robust, singleton pattern for Firebase initialization in Next.js.
// It centralizes the configuration and prevents re-initialization errors.
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD3CbAhjT5jUObBd9Yc6Ga-0CPX_LUs8hU",
    authDomain: "ecolens-r8ovc.firebaseapp.com",
    projectId: "ecolens-r8ovc",
    storageBucket: "ecolens-r8ovc.appspot.com",
    messagingSenderId: "641858981811",
    appId: "1:641858981811:web:938348738a8a7ba0ed05c6",
};

// Initialize Firebase for SSR
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
