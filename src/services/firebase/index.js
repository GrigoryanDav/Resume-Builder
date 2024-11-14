import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBHy2WnTq6mxsDIP6Oo88cImAVBes8OOeY",
  authDomain: "resume-builder-884a9.firebaseapp.com",
  projectId: "resume-builder-884a9",
  storageBucket: "resume-builder-884a9.firebasestorage.app",
  messagingSenderId: "1011129446363",
  appId: "1:1011129446363:web:6d469e5aeb3eff331e81fe"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {
    auth,
    db,
}