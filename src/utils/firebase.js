// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMvhN_xdaj9QdOo0KPn-48LL-726QpHqc",
    authDomain: "netflixgpt-7dd06.firebaseapp.com",
    projectId: "netflixgpt-7dd06",
    storageBucket: "netflixgpt-7dd06.appspot.com",
    messagingSenderId: "141044590012",
    appId: "1:141044590012:web:6d14e0c2041e23667577b9",
    measurementId: "G-7ZTSNFTHVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();