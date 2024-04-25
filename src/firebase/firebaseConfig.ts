// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDolsKA2jN7oFWeIwA6GbGOHO1EOZTZzSE",
  authDomain: "birthday-party-for-kids-243a5.firebaseapp.com",
  databaseURL:
    "https://birthday-party-for-kids-243a5-default-rtdb.firebaseio.com",
  projectId: "birthday-party-for-kids-243a5",
  storageBucket: "birthday-party-for-kids-243a5.appspot.com",
  messagingSenderId: "562636933392",
  appId: "1:562636933392:web:560276ccea449f23767d95",
  measurementId: "G-6YNGG0YC0K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
