// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDY6k2rO3mewByTbOTpon_C_xySZFtWxtM",
    authDomain: "my-rawplug.firebaseapp.com",
    databaseURL: "https://my-rawplug-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "my-rawplug",
    storageBucket: "my-rawplug.appspot.com",
    messagingSenderId: "904572297591",
    appId: "1:904572297591:web:ea9dd4eac7312b4f2ac172",
    measurementId: "G-X94JVJBH1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();
const analytics = getAnalytics(app);