// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZuYAe-zysE4781e83RYPkXLyS_P4nfG8",
  authDomain: "react44-final.firebaseapp.com",
  projectId: "react44-final",
  storageBucket: "react44-final.appspot.com",
  messagingSenderId: "979900049849",
  appId: "1:979900049849:web:f92d04f069b9ce5be36e68",
  measurementId: "G-2RT0XELR0S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
