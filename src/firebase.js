import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrV-KkmPtxz_3vyuUKK7WAJbNEC7FgStc",
  authDomain: "rit-b-949fc.firebaseapp.com",
  projectId: "rit-b-949fc",
  storageBucket: "rit-b-949fc.firebasestorage.app",
  messagingSenderId: "877767429104",
  appId: "1:877767429104:web:cf0b1028a3c516251a2b35",
  measurementId: "G-3H21JE5S7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
