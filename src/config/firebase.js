// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBu6rJWFOyeSUflFm3X_9q1IZP42oJvCWQ",
    authDomain: "online-store-f4d80.firebaseapp.com",
    projectId: "online-store-f4d80",
    storageBucket: "online-store-f4d80.appspot.com",
    messagingSenderId: "172635805147",
    appId: "1:172635805147:web:9021cd146fb9b0530943fe"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
}

const db = getFirestore(app);

const storage = getStorage(app);

export {auth, db, signInWithGoogle, storage}